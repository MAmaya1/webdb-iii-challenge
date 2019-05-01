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

// POST (add new cohort)

router.post('/', (req, res) => {
    if(!req.body.name) {
        res.status(400).json({ errorMessage: 'New cohorts require a valid name.' })
    } else {
        db('cohorts')
            .insert(req.body, 'id')
            .then(ids => {
                db('cohorts')
                .where({ id: ids[0] })
                .first()
                .then(cohort => {
                    res.status(201).json(cohort)
                })
                .catch(err => {
                    res.status(500).json({ error: err, message: 'New cohort could not be added to the database.' })
                })
            })
            .catch(err => {
                res.status(400).json({ error: err, message: 'A cohort with this name already exists.' })
            })
    }
})

// PUT (update cohort)

router.put('/:id', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ errorMessage: 'Cohorts require a valid name.' })
    } else {
        db('cohorts')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if (count > 0) {
                    res.status(201).json({ message: `${count} ${count > 1 ? 'cohorts' : 'cohort' } updated.` })
                } else {
                    res.status(404).json({ errorMessage: 'A cohort with the specified ID does not exist.' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Cohort data could not be updated.' })
            })
    }
})

module.exports = router;