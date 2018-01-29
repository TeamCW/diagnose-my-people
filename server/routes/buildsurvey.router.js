var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// CREATE TABLE "client" (
// 	"id" serial NOT NULL,
// 	"point_of_contact" varchar NOT NULL,
// 	"contact_email" varchar NOT NULL,
// 	"organization" varchar,
// 	"survey_hash" varchar UNIQUE,
// 	"contact_number" varchar,
// 	"position" varchar,
// 	"status" varchar NOT NULL DEFAULT 'New Client',
// 	CONSTRAINT client_pk PRIMARY KEY ("id")
// ) WITH (
//   OIDS=FALSE
// );


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
                position,
                survey_hash ,
            )
            VALUES ($1, $2, $3, $4, $5, $6),`, [
                req.body.point_of_contact,
                req.body.contact_email,
                req.body.organization,
                req.body.contact_number,
                req.body.position,
                req.body.survey_hash
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
            client.query('SELECT id FROM client WHERE survey_has=$1;',[req.query.survey_hash], function (errorMakingQuery, result) {
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
            VALUES ($1, $2),`, [
                req.query.kpi_id,
                req.query.client_id
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