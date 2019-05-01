// Implement changes to the schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', tbl => {
        tbl.increments();
        tbl
            .string('name', 128)
            .notNullable()
        tbl.timestamps(true, true)
    })
};

// Undo the changes
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts')
};
