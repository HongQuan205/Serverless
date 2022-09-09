/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('student', table =>{
        table.increments('id');
        table.string('dia_chi').notNullable().unique();
        table.string('gioi_tinh').notNullable();
        table.string('lop').notNullable();
        table.string('ten').notNullable();

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('student');
};
