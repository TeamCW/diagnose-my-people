myApp.service('SurveyService', function($http, $location){
    console.log('SurveyService Loaded');
    var self = this;

    self.demographics = { list: [] };

//request to populate questions and possible answers.
    self.getDemographics = function () {
        $http({
            method: 'GET',
            url: '/survey'
        }).then(function (response) {
            console.log('response', response);
            for (let i = 0; i < response.data.length; i++) {
            self.demographics.list.push(response.data[i]);//this fills up the questions array with the table from the database.
            }          
        });
    }

});