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
            password: user.password
        }
    );
    if (createUser == null) {
        await trx.rollback();
        return {
            status: "Fail",
            messageCode: 500,
        }
    } return createUser;
}
async function deleteUser(id) {
    try {
        const deleteUser = await db('users').where('id', id).del();
        if (deleteUser === null) {
            return null;
        }
        else {
            return {
                data: deleteUser
            }
        }
    } catch (error) {
        console.log(error)
        return error;
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
            password:updateUser.password
        });
        return update;
    } catch (error) {
        console.log(error)
    }
}
async function getUserByUsername(username)
{
    try{
        const getUserByUserName = await db('users').where('username',username).select(
            'id',
            'name',
            'age',
            'phone_number',
            'address',
            'username',
            'password'
        ).first();
        return getUserByUserName;
    }catch(error)
    {
        console.log(error)
        return null;
    }
}
async function checkDB()
{
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
    getUserById, createUser, deleteUser, updateUser,getUserByUsername,checkDB
}