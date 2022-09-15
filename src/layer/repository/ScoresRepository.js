const db = require('../db/db')


async function getScoresByUser(id) {
    const getScoreFromUser = await db('score').leftJoin('users',function(){
        this.on('users.id','score.user_id')
    })
    .where('score.user_id', id).select(
        "score.subject",
        "score.point"
    )
   return getScoreFromUser;
}

module.exports ={getScoresByUser}