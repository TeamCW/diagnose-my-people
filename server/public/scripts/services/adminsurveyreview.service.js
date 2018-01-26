myApp.service('AdminSurveyReviewService', ['$http', '$location', function ($http, $location, AdminSurveyReviewService) {

    var self = this;
    self.client = { survey: {} };

    //GET details for each gig and display them in their own view using $routeparams
    self.getClientSurvey = function (clientId) {
        console.log(clientId);
        
        $http({
            method: 'GET',
            url: '/admin-survey-review/',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.client.survey = response.data;
        });
    };
}]);