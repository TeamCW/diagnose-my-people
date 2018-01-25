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
            self.questions.list = response.data;//this fills up the questions array with the table from the database.          
        });
    }

});