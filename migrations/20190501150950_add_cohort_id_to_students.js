exports.up = function(knex, Promise) {
    return knex.schema.table('students', tbl => {
        tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('students', tbl => {
        tbl.dropColumn('cohort_id')
    })
};
