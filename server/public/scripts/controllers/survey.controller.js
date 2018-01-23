myApp.controller('SurveyController', function(SurveyService) {
    console.log('SurveyController created');
    var vm = this;
    vm.surveyService = SurveyService;
  });