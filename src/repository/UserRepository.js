const db = require('../db/db');


async function getUserById(id) {
    try {
        const getUser = await db("users").where('id', id)
            .select(
                'id',
                'name',
                'age',
                'phone_number',
                'address'
            )
        return getUser;
    } catch (error) {
        console.log("Da xay loi", error)
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
            username:user.username,
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
        if (deleteUser == null) {
            return deleteUser;
        }
        else {
            return {
                data: deleteUser
            }
        }
    } catch (error) {
        console.log(error)
    }
}
async function updateUser(updateUser) {
    try {
        const update = await db('users').where('id', updateUser.id).update({
            name: updateUser.name,
            age: updateUser.age,
            phone_number: updateUser.phone_number,
            address: updateUser.address
        });
        return update;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUserById, createUser, deleteUser,updateUser
}