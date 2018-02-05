myApp.service('SurveyService', function ($http, $location) {
    console.log('SurveyService Loaded');
    var self = this;

    self.demographics = { list: [] };
    self.location = { list: [] };
    self.amenities = { list: [] };
    self.brand = { list: [] };
    self.retention = { list: [] };
    self.conclusion = { list: [] };


    self.selectedResponse = {};


    //request to populate demographic questions and possible answers.
    self.getDemographics = function () {
        $http({
            method: 'GET',
            url: '/survey'
        }).then(function (response) {
            console.log('response', response);
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.demographics.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('demographics info:', self.demographics.list);
        });
    }

    //request to populate location questions and possible answers.
    self.getLocation = function () {
        $http({
            method: 'GET',
            url: 'survey/location'
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.location.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('location info:', self.location.list);
        });
    }

    //request to populate amenities questions and possible answers.
    self.getAmenities = function () {
        $http({
            method: 'GET',
            url: 'survey/amenities'
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.amenities.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('amenities info:', self.amenities.list);
        });
    }

    //request to populate brand questions and possible answers.
    self.getBrand = function () {
        $http({
            method: 'GET',
            url: 'survey/brand'
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.brand.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('brand info:', self.brand.list);
        });
    }

    //request to populate retention questions and possible answers.
    self.getRetention = function () {
        $http({
            method: 'GET',
            url: 'survey/retention'
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.retention.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('retention info:', self.retention.list);
        });
    }

    //request to populate conclusion questions and possible answers.
    self.getConclusion = function () {
        $http({
            method: 'GET',
            url: 'survey/conclusion'
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newData = {
                    kpi: response.data[i].kpi,
                    kpi_id: response.data[i].kpi_id,
                    question: response.data[i].question,
                    question_id: response.data[i].question_id,
                    style_id: response.data[i].style_id,
                    responses: []
                };
                for (let k = 0; k < response.data[i].responses.length; k++) {
                    for (let j = 0; j < response.data[i].response_ids.length; j++) {
                        var newResponse = {
                            id: response.data[i].response_ids[k],
                            response_text: response.data[i].responses[k]

                        }//end constructor
                    }//end id for loop
                    newData.responses.push(newResponse);
                } //end response text for loop

                self.conclusion.list.push(newData);//this fills up the questions array with the table from the database.
            }
            console.log('conclusion info:', self.conclusion.list);
        });
    }

    //adding question responses to the database
    self.saveResponses = function (question) {
        console.log('in saveResponse', question);
        $http({
            method: 'POST',
            url: '/survey',
            data: question
        }).then(function (response) {
            console.log('saveResponse = response', response);

        })
    };

});