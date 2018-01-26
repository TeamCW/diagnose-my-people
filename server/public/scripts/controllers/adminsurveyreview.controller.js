myApp.controller('AdminSurveyReviewController', ['AdminSurveyReviewService', '$routeparams', function(AdminSurveyReviewService, $routeparams) {
    console.log('AdminSurveyReviewController created');
    var self = this;

  self.client = AdminSurveyReviewService.client;
  AdminSurveyReviewService.getClientSurvey($routeParams.clientId);

    
  }]);