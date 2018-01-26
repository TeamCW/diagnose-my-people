var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');




router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {

            client.query(`SELECT * FROM client;`,
                function (errorMakingDatabaseQuery, result) {
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


router.delete('/:id', function (req, res) {
    var clientIdToRemove = req.params.id;
    console.log("clientToDelete:", clientIdToRemove);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM client WHERE id=$1;`, [clientIdToRemove], function (errorMakingQuery, result) {
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
});

router.put('/:id', function (req, res) {
    var clientIdToEdit = req.params.id;
    var clientToEdit = req.body;
    console.log('client coming to server:', clientToEdit);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE client
            SET status = $1
            WHERE "id"=$2;`, [clientToEdit.status, clientIdToEdit], function (errorMakingQuery, result) {
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
});

router.put('/edit/:id', function (req, res) {
    console.log('client data coming to server:', req.body);
    var clientIdToEdit = req.params.id;
    var clientNameToEdit = req.body.point_of_contact;
    var clientOrgToEdit = req.body.organization;
    var clientPositionToEdit = req.body.position;
    var clientEmailToEdit = req.body.contact_email;
    var clientNumberToEdit = req.body.contact_number
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE client
            SET point_of_contact = $1, organization = $2, contact_email = $3, position = $5, contact_number = $6
            WHERE "id" = $4;`, [clientNameToEdit, clientOrgToEdit, clientEmailToEdit, clientIdToEdit, clientPositionToEdit,clientNumberToEdit], function (errorMakingQuery, result) {
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
});



module.exports = router;