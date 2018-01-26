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
            client.query(`SELECT * FROM selected_kpi WHERE id=$1;`, [clientId], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows[0]);
                }
            });
        }
    });
});


module.exports = router;