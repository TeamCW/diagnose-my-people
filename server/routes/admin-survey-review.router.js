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
            catagory.kpi AS kpi_name, * FROM selected_kpi
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

// Edit or add a blurb to client survey KPIs
router.put('/', function (req, res) {
    var blurbToEdit = req.body;
    console.log('blurbToEdit:', blurbToEdit);
    
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

module.exports = router;