myApp.controller('AdminSurveyReviewController', ['AdminSurveyReviewService', '$routeParams', function (AdminSurveyReviewService, $routeParams) {
    console.log('AdminSurveyReviewController created');
    var vm = this;

  vm.client = AdminSurveyReviewService.client;
  AdminSurveyReviewService.getClientSurvey($routeParams.clientId);
  vm.editBlurb = AdminSurveyReviewService.editBlurb;
  vm.removeCategory = AdminSurveyReviewService.removeCategory;
    
  }]);