myApp.controller('SurveyController', function(SurveyService) {
    console.log('SurveyController created');
    var vm = this;

    //SurveyService.js 
    vm.surveyService = SurveyService;
    vm.questions = SurveyService.questions;  
    SurveyService.getQuestions();      

  });