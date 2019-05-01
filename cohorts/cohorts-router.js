const express = require('express');

const router = express.Router();

// Import Knex

const knex = require('knex');

// Configure Knex

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('cohorts')
        .then(cohort => {
            res.status(201).json(cohort)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Could not retrieve cohort data.' })
        })
})

module.exports = router;