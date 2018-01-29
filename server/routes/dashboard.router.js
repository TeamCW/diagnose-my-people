var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');




router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {

            client.query(`SELECT COUNT(response_text), response_text FROM employee_results
            INNER JOIN possible_responses ON possible_responses.id = employee_results.response_id
            GROUP BY response_text;`,
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





module.exports = router;