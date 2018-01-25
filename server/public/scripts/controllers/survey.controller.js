myApp.controller('SurveyController', function(SurveyService) {
    console.log('SurveyController created');
    var vm = this;

    //SurveyService.js 
    vm.surveyService = SurveyService;
    SurveyService.getQuestions();      

  });