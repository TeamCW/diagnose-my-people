var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

//GET specific client survey KPIs
router.get('/', function (req, res) {
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT client.point_of_contact AS client_name, client.organization AS client_organization, client.survey_hash AS survey_url,
            category.kpi AS kpi_name, kpi_id, client_id, selected_kpi.id, notes_added FROM selected_kpi
            JOIN "client" ON client.id = selected_kpi.client_id
            JOIN "category" ON category.id = selected_kpi.kpi_id
            WHERE client_id= $1
            ORDER BY kpi_name;`, [clientId], function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            console.log('error', errorMakingDatabaseQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
});

router.get('/not-selected', function (req, res) {
    var clientId = req.query.clientId;
    console.log('clientId:', clientId);
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT c.id, kpi 
            FROM   category c 
            WHERE  NOT EXISTS (SELECT 1 FROM selected_kpi s
            WHERE  s.client_id = $1 AND c.id = s.kpi_id);`, [clientId], function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            console.log('error', errorMakingDatabaseQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
});

//GET list of all KPIs
router.get('/all', function (req, res) {
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM category;`, function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
});

// Edit or add a blurb to client survey KPIs
router.put('/', function (req, res) {
    var blurbToEdit = req.body;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE selected_kpi SET notes_added=$1
            WHERE "id" = $2;`, [blurbToEdit.notes_added, blurbToEdit.id], function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
})

// Add a KPI category to client survey
router.post('/', function (req, res) {
    var category = req.body;
    var categoryId = req.body.newCategory.id;
    var clientId = req.body.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO selected_kpi (client_id, kpi_id)
            VALUES ($1, $2);`, [clientId, categoryId],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(201);
                        }
                    });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
})

// Remove a survey category from selected client's survey
router.delete('/:id', function (req, res) {
    var categoryToRemove = req.params.id;
    console.log(categoryToRemove);
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`DELETE FROM selected_kpi WHERE id=$1;`, [categoryToRemove], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
})

module.exports = router;