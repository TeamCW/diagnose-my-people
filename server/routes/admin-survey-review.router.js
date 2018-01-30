var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

//GET specific client survey KPIs
router.get('/', function (req, res) {
    var clientId = req.query.clientId;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT client.point_of_contact AS client_name, client.organization AS client_organization, client.survey_hash AS survey_url,
            catagory.kpi AS kpi_name, kpi_id, client_id, selected_kpi.id, notes_added FROM selected_kpi
            JOIN "client" ON client.id = selected_kpi.client_id
            JOIN "catagory" ON catagory.id = selected_kpi.kpi_id
            WHERE client_id=$1;`, [clientId], function (errorMakingDatabaseQuery, result) {
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
});

//GET list of all KPIs
router.get('/all', function (req, res) {
    var clientId = req.query.clientId;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM catagory;`, function (errorMakingDatabaseQuery, result) {
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
});

// Edit or add a blurb to client survey KPIs
router.put('/', function (req, res) {
    var blurbToEdit = req.body;    
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
})

// Add a KPI category to client survey
router.post('/', function (req, res) {    
    var category = req.body;
    var categoryId = req.body.newCategory.id;
    var clientId = req.body.clientId;
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO selected_kpi (client_id, kpi_id)
            VALUES ($1, $2);`, [clientId, categoryId], 
            function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201); 
                }
            });
        }
    });
})

// Remove a survey category from selected client's survey
router.delete('/:id', function (req, res) {
    var categoryToRemove = req.params.id;
    console.log(categoryToRemove);
    
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
})

module.exports = router;