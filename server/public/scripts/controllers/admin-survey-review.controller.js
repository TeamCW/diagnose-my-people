myApp.controller('AdminSurveyReviewController', ['AdminSurveyReviewService', '$routeParams', function (AdminSurveyReviewService, $routeParams) {
    console.log('AdminSurveyReviewController created');
    var vm = this;

  vm.client = AdminSurveyReviewService.client;
  vm.categories = AdminSurveyReviewService.categories;
  AdminSurveyReviewService.getClientSurvey($routeParams.clientId);
  // AdminSurveyReviewService.getCategories();
  vm.editBlurb = AdminSurveyReviewService.editBlurb;
  vm.removeCategory = AdminSurveyReviewService.removeCategory;
  vm.addClientCategory = AdminSurveyReviewService.addClientCategory;
  vm.getNotSelected = function() {
    AdminSurveyReviewService.getNotSelected($routeParams.clientId);
  };
  vm.notSelectedArray = AdminSurveyReviewService.notSelectedArray;
    


  
  }]);