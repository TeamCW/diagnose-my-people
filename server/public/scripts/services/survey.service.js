myApp.service('SurveyService', function($http, $location){
    console.log('SurveyService Loaded');
    var self = this;

    self.questions = { list: [] };

//request to populate questions and possible answers.
    self.getQuestions = function () {
        $http({
            method: 'GET',
            url: '/survey'
        }).then(function (response) {
            console.log('response', response);
            for (let i = 0; i < response.data.length; i++) {
            self.questions.list.push(response.data[i]);//this fills up the questions array with the table from the database.
            }          
        });
    }

});