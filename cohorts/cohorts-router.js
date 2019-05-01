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

// GET cohorts

router.get('/', (req, res) => {
    db('cohorts')
        .then(cohort => {
            res.status(201).json(cohort)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Could not retrieve cohort data.' })
        })
})

// GET cohort by id

router.get('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(cohort => {
            if (cohort) {
                res.status(201).json(cohort)
            } else {
                res.status(404).json({ errorMessage: 'A cohort with the specified ID could not be found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve cohort data.' })
        })
})

module.exports = router;