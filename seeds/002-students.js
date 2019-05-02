
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Mario', cohort_id: 1},
        {name: 'Will', cohort_id: 2},
        {name: 'Josh', cohort_id: 2}
      ]);
    });
};
