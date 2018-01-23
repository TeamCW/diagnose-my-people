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

module.exports = router;