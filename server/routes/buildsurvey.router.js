var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.post('/clientinfo', function (req, res) {
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`
            INSERT INTO client (
                point_of_contact,
                contact_email, 
                organization, 
                contact_number, 
                survey_hash,
                comments,
                logo_url
            )
            VALUES ($1, $2, $3, $4, $5, $6,$7);`, [
                req.body.point_of_contact,
                req.body.contact_email,
                req.body.organization,
                req.body.contact_number,
                req.body.survey_hash,
                req.body.comments,
                req.body.logoURL

            ], 
            function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/clientid', function (req, res) {
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query('SELECT id FROM client WHERE survey_hash=$1;',[req.query.survey_hash], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/kpi', function (req, res) {
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`
            INSERT INTO selected_kpi (
                kpi_id,
                client_id
            )
            VALUES ($1, $2);`, [
                req.body.kpi_id,
                req.body.client_id
            ], 
            function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});


module.exports = router;