myApp.controller('SurveyController', function(SurveyService) {
    console.log('SurveyController created');
    var vm = this;

    //SurveyService.js 
    vm.surveyService = SurveyService;
    vm.demographics = SurveyService.demographics;
    vm.location = SurveyService.location;
    vm.amenities = SurveyService.amenities;   
    
    //GET request functions for the survey views
    SurveyService.getDemographics();
    SurveyService.getLocation();
    SurveyService.getAmenities();      
      
  });