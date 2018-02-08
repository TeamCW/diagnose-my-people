var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');






router.get('/kpi', function (req, res) {
    console.log(req.query.clientId)
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT kpi_id from selected_kpi
                WHERE client_id = $1; `, [clientId],
                    function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            console.log('error', errorMakingDatabaseQuery);
                            res.sendStatus(500);
                        } else {
                            console.log('result:', result)
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


router.get('/demo', function (req, res) {
    console.log(req.query.clientId)
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT employee_results.client_id, employee_results.question_id,possible_responses.response_text FROM employee_results 
                JOIN possible_responses ON employee_results.response_id = possible_responses.id
                WHERE employee_results.client_id = $1 AND employee_results.question_id IN (1, 2, 3, 4); `, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});

router.get('/location', function (req, res) {
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT employee_results.client_id, employee_results.question_id,possible_responses.response_text FROM employee_results 
                JOIN possible_responses ON employee_results.response_id = possible_responses.id
                WHERE employee_results.client_id = $1 AND employee_results.question_id IN (5, 6, 7, 8, 9); `, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});




router.get('/amenities', function (req, res) {
    var clientId = req.query.clientId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT employee_results.client_id, employee_results.question_id,possible_responses.response_text FROM employee_results 
                JOIN possible_responses ON employee_results.response_id = possible_responses.id
                WHERE employee_results.client_id = $1 AND employee_results.question_id IN (10, 11, 12, 13, 14, 15, 16, 17, 18, 19);`, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});



router.get('/brand', function (req, res) {
    var clientId = req.params.id;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM employee_results 
                WHERE client_id = $1 AND question_id IN (20, 21, 22, 23, 24, 25, 26); `, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});


router.get('/retention', function (req, res) {
    var clientId = req.params.id;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM employee_results 
                WHERE client_id = $1 AND question_id IN (27, 28, 29, 30, 31, 32, 33, 34, 35, 36); `, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});


router.get('/conclusion', function (req, res) {
    var clientId = req.params.id;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM employee_results 
                WHERE client_id = $1 AND question_id IN (37, 38, 39, 40, 41, 42, 43); `, [clientId],
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
    }
    else {
        res.sendStatus(403);
    }
});


module.exports = router;