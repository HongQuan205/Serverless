const db = require('../db/db');



async function getUserById(id) {
    try {
        const getUser = await db("users").where('id', id)
            .select(
                'id',
                'name',
                'age',
                'phone_number',
                'address',
                'username',
            ).first();
        return getUser;
    } catch (error) {
        console.log("Da xay loi", error)
        return null;
    }
}


async function createUser(user) {
    const trx = await db.transaction();
    const createUser = await db('users').insert(
        {
            name: user.name,
            age: user.age,
            phone_number: user.phone_number,
            address: user.address,
            username: user.username,
            password: user.password,
            token: user.token
        }
    );
    if (!createUser) {
        await trx.rollback();
        return false;
    }
    await trx.commit();
    return createUser
}
async function deleteUser(id) {
    try {
        await db.transaction(async trx => {
            const deleteUser = await trx('users').where('id', id).del();
            if (deleteUser) {
                await trx.commit();
                return true;
            }
            else {
                await trx.rollback();
                return false;
            }
        })
    } catch (error) {
        console.log(error)
        return false;
    }
}
async function updateUser(updateUser) {
    try {
        const update = await db('users').where('id', updateUser.id).update({
            name: updateUser.name,
            age: updateUser.age,
            phone_number: updateUser.phone_number,
            address: updateUser.address,
            username: updateUser.username,
            password: updateUser.password
        });
        return update;
    } catch (error) {
        console.log(error)
    }
}
async function getTokenByUserId(userId)
{
    try {
        let  getToken= await db('users').where('id',userId).select('token')
        return getToken ? getToken : null
    } catch (error) {
        console.log(error)
        return null;
    }
}
async function getUserByUsername(username) {
    try {
        const getUserByUserName = await db('users').where('username', username).select(
            'id',
            'name',
            'age',
            'phone_number',
            'address',
            'username',
            'password'
        ).first();
        return getUserByUserName;
    } catch (error) {
        console.log(error)
        return null;
    }
}
async function checkDB() {
    try {
        const getUserByUserName = await db("users").where('id', 7)
            .select(
                'id',
                'name',
                'age',
                'phone_number',
                'address',
                'username',
                'password'
            ).first()
        return getUserByUserName;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getUserById, createUser, deleteUser, updateUser, getUserByUsername, checkDB,getTokenByUserId
}