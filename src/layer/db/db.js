const knex = require('knex')

const knexfile =  require('./knexfile').knexfile
const db = knex(knexfile.development);
const { attachPaginate } = require('knex-paginate')
attachPaginate()
module.exports=db;