const knex = require('knex')

const knexfile =  require("db").knexfile

const db = knex(knexfile.development);

module.exports=db;