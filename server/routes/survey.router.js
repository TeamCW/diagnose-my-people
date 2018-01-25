var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');



router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {

            client.query(`SELECT question, array_agg(response_text) as responses, kpi FROM questions
            INNER JOIN possible_responses on questions.id = possible_responses.question_id
            INNER JOIN catagory on questions.kpi_id = catagory.id
            GROUP BY question, kpi;`,
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