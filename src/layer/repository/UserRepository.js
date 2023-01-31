'use strict'

/* constant */
const { accountStatus, siteId, flag, message, format, loginBase, lang } = require('constant')

/* DB */
const { db } = require('db')

/* library */
const moment = require('moment')
const now = moment().utc().format(format.DATE_TIME)
const utility = require('utility')

/* helper */
const { template: tplMail, mailer } = require('helper')

const checkFieldExist = async (data) => {
  let result
  if (data.fieldName === 'user_name') {
    // check existed user name
    result = await db('users')
      .where(data.fieldName, data.fieldValue)
      .where('site_id', siteId)
      .where('delete_flag', flag.FALSE)
      .where((builder) =>
        builder
          .whereIn('account_status', [
            accountStatus.ACTIVATED,
            accountStatus.APPROVED,
          ])
          .orWhere((builder) =>
            builder
              .where('account_status', accountStatus.REGISTERED)
              .where('activation_expire', '>', now)
              .whereNotNull('activation_key')),
      )
  } else {
    // check existed email and phone number
    result = await db('users')
      .where(data.fieldName, data.fieldValue)
      .where('site_id', siteId)
      .where('delete_flag', flag.FALSE)
      .whereIn('account_status', [
        accountStatus.ACTIVATED,
        accountStatus.APPROVED,
      ])
  }

  return result.length ? true : false
}

async function createUser(userForm, userSettingForm, typeLang) {
  const trx = await db.transaction();
  try {
    // check user exist in system
    const findUser = await db('users')
      .where((builder) =>
        builder.where('email', userForm.email)
          .orWhere('phone_number', userForm.phone_number)
      )
      .where({
        site_id: siteId,
        delete_flag: flag.FALSE
      }).select('id')
    let user_id
    if (!findUser.length) {
      const isUser = await trx('users').insert(userForm)
      user_id = isUser[0]
      if (!isUser.length) {
        await trx.rollback()
        return false
      }

      const userSetting = {
        user_id: isUser[0],
        ...userSettingForm
      }

      const isUserSetting = await trx('user_setting').insert(userSetting)
      if (!isUserSetting.length) {
        await trx.rollback()
        return false
      }
    }
    else {
      user_id = findUser[0].id
      const isUserUpdate = await trx('users')
        .update(userForm).where({
          id: user_id
        })
      if (!isUserUpdate) {
        await trx.rollback()
        return false
      }
    }
    const result = await trx('users')
      .where('delete_flag', flag.FALSE)
      .where('id', user_id)
      .where('site_id', siteId)
      .select(
        'id',
        'email',
        'user_name',
        'activation_key'
      ).first()

    //Set template mail
    const to = result.email
    const subject = lang[typeLang].su_title
    const text = ''
    const url = `${process.env.URL_FE}/verify-path/?lang=${typeLang}&activationKey=${result.activation_key}`
    const urlImage = process.env.URL_IMAGE_BASE_MAIL
    const userName = result.user_name
    const bodyList = [lang[typeLang].su_bodylist.l1, lang[typeLang].su_note.l2]
    const title_info = lang[typeLang].su_bodylist.su_title_info
    const annotationList = [lang[typeLang].su_note.l1, lang[typeLang].su_note.l2]
    const html = tplMail.templateA(urlImage, lang[typeLang], typeLang, subject, userName, bodyList, title_info, url, annotationList)
    const responseSendMail = await mailer.sendMail(to, subject, text, html)

    if (!responseSendMail) {
      await trx.rollback()
      return false
    }
    await trx.commit()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function getUserByEmail(email, isActive = false) {
  const query = db('users').join('user_setting', 'users.id', 'user_setting.user_id')
    .where('users.site_id', siteId)
    .where('users.delete_flag', flag.FALSE)
    .where('users.email', email)
    .select(
      'users.id as id',
      'users.country_id as countryId',
      'users.phone_number',
      'users.reg_category as corporationFlag',
      'users.user_name',
      'users.email as email',
      'users.hash_password as hashPassword',
      'users.account_status',
      'users.is_locked',
      'user_setting.twofa as twofa',
      'user_setting.notify_unusual_login',
      'user_setting.language_portal',
      'user_setting.language_email',
    )
    .first()

  if (isActive) {
    query.whereIn('users.account_status', [accountStatus.ACTIVATED, accountStatus.APPROVED])
  }

  return await query.clone()
}

async function getListUser(pagination, queryString) {
  try {
    const arrInput = ['email', 'id', 'member_id', 'site_id', 'account_status', 'kyc_status', 'customer_rank', 'reg_category', 'merchant_flag', 'test_flag', 'kyc_level']
    const query = db('users')
      .leftJoin('m_site', 'users.site_id', 'm_site.id')
      .leftJoin('m_countries', 'users.country_id', 'm_countries.id')
      .leftJoin('staff', 'users.support_by_admin', 'staff.id')
      .leftJoin('corporate_info as ci', function () {
        this.on('users.id', 'ci.user_id')
        this.on('ci.beneficial_owner', flag.FALSE)
      }).select(
        'ci.corporate_name_english',
        'users.id',
        'users.site_id',
        'm_site.site_name',
        'm_site.description as site_description',
        'users.member_id',
        'users.account_status',
        'users.reg_category',
        'users.merchant_flag',
        'users.is_locked',
        'users.country_id',
        'm_countries.japanese_notation as ja_notation',
        'm_countries.english_notation as en_notation',
        'm_countries.korean_notation as kr_notation',
        'm_countries.chinese_notation as cn_notation',
        'm_countries.file_name',
        'users.customer_rank',
        'users.first_name_romaji',
        'users.last_name_romaji',
        'users.email',
        'users.test_flag',
        'users.attention_flag',
        'users.kyc_status',
        'users.kyc_level',
        'staff.staff_name',
        'users.support_by_admin',
        'users.ts_regist',
        'users.last_login_date',
        db.raw(`CASE WHEN ('${queryString.nameType}' = 'corporate' and  users.reg_category = 1) then ci.corporate_name_english 
        else CONCAT(users.first_name_romaji," ", users.last_name_romaji) END AS full_name`)
      ).where('users.delete_flag', flag.FALSE)
    arrInput.forEach((el) => {
      if (['email,id,member_id'].includes(queryString[el])) {
        queryString[el] = utility.escapeSql(queryString[el])
        query.whereILike(`${'users.' + el}`, queryString[el])

      }
      else if (['site_id', 'account_status', 'kyc_status', 'customer_rank'].includes(queryString[el])) {
        query.whereIn(`${'users.' + el}`, queryString[el])
      }
      else if (['reg_category, test_flag, merchant_flag,kyc_level'].includes(queryString[el])) {
        query.where(`${'users.' + el}`, queryString[el])
      }
    })
    if (queryString.nameType === 'corporate' && queryString.fullName) {
      queryString.fullName = utility.escapeSql(queryString.fullName)
      query.where(
        function () {
          this.where(db.raw(`CONCAT(users.first_name_romaji," ",users.last_name_romaji) like '%${queryString.fullName}%'`))
            .orWhereILike('ci.corporate_name_english', `%${queryString.fullName}%`)
        },
      )
    } else if (queryString.nameType === 'personal' && queryString.fullName) {
      queryString.fullName = utility.escapeSql(queryString.fullName)
      query.where(db.raw(`CONCAT(users.first_name_romaji," ",users.last_name_romaji) like '%${queryString.fullName}%'`))
    }

    const utc = (queryString.utc || '0').replace('(', '').replace('UTC', '').replace(')', '')
    const tsFrom = moment(queryString.tsFrom).startOf('day').subtract(utc, 'hours').format(format.DATE_TIME_ZONE).toString()
    const tsTo = moment(queryString.tsTo).endOf('day').subtract(utc, 'hours').format(format.DATE_TIME_ZONE).toString()
    if (queryString.timeType === 'lastLogin') {
      if (queryString.tsFrom && queryString.tsTo) {
        const tsFrom = moment(queryString.tsFrom).startOf('day').subtract(utc, 'hours').format(format.DATE_TIME_ZONE).toString()
        const tsTo = moment(queryString.tsTo).endOf('day').subtract(utc, 'hours').format(format.DATE_TIME_ZONE).toString()
        query.whereBetween('users.last_login_date', [tsFrom, tsTo])
      }
      else if (queryString.tsFrom) {
        query.where('users.last_login_date', '>=', tsFrom)
      }
      else if (queryString.tsTo) {
        query.where('users.last_login_date', '<=', tsTo)
      }
    }
    else if (queryString.timeType = 'created') {
      if (queryString.tsFrom && queryString.tsTo) {
        query.whereBetween('users.ts_regist', [tsFrom, tsTo])
      }
      else if (queryString.tsFrom) {
        query.where('users.ts_regist', '>=', tsFrom)
      }
      else if (queryString.tsTo) {
        query.where('users.ts_regist', '<=', tsTo)
      }
    }
    const orderArr = [...pagination.sort, { column: 'id', order: 'DESC' }]
    return await query.clone().orderBy(orderArr).paginate(pagination)
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  checkFieldExist,
  createUser,
  getUserByEmail,
  getListUser
}