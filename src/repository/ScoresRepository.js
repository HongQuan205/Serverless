const db = require('../db/db')


async function getScoresByUser(id) {
    const getScoreFromUser = await db('score').join('users','score.user_id', 'users.id')
    .where('score.user_id', id).select(
        'users.id',
        'users.name',
        'users.age',
        'users.phone_number',
        'users.address',
        'users.username',
        "score.subject",
        "score.point"
    )
   return getScoreFromUser;
}

module.exports ={getScoresByUser}