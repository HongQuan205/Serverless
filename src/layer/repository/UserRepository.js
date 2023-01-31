'use strict'

/* constant */
const { accountStatus, siteId, flag, message, format, loginBase,lang } = require('constant')

/* DB */
const {db}= require('db')

/* library */
const moment = require('moment')
const now = moment().utc().format(format.DATE_TIME)

/* helper */
const {template: tplMail, mailer} = require('../helper')

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

    if (!findUser.length) {
      const isUser = await trx('users').insert(userForm)
      console.log(isUser)
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
      await trx.commit()
      return true
    }
    else {
      let user_id = findUser[0].id
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
    .where('id', findUser[0].id)
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
    const text= ''
    const url = `${process.env.URL_FE}/verify-path/?lang=${typeLang}&activationKey=${result[0].activationKey}`
    const urlImage = process.env.URL_IMAGE_BASE_MAIL
    const userName = result[0].user_name
    const bodyList = [lang[typeLang].su_bodylist.l1, lang[typeLang].su_note.l2]
    const title_info = lang[typeLang].su_bodylist.su_title_info
    const annotationList = [lang[typeLang].su_note.l1, lang[typeLang].su_note.l2]
    const html = tplMail.templateA(urlImage, lang[typeLang], typeLang, subject, userName,bodyList,title_info,url, annotationList)
    const responseSendMail = await mailer.sendMail(to,subject,text,html)

    if(!responseSendMail)
    {
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

module.exports = {
  checkFieldExist,
  createUser
}