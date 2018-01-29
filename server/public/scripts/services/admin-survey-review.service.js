myApp.service('AdminSurveyReviewService', ['$http', '$location', function ($http, $location, AdminSurveyReviewService) {

    var self = this;
    self.client = { survey: {} };

    //GET selected KPI for each client and display them in their own view using $routeparams
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
            console.log(response.data);

        });
    };

    //edit or add a blurb to selected KPI on client's survey
    self.editBlurb = function (blurbToEdit, clientId) {
        console.log(blurbToEdit);

        $http({
            method: 'PUT',
            url: '/admin-survey-review/',
            data: blurbToEdit,
        }).then(function (response) {
            console.log('response', response);
            self.getClientSurvey(clientId);
        });
    }
}]);