myApp.controller('SurveyController', function (SurveyService) {
  console.log('SurveyController created');
  var vm = this;

  //setting the limit for displayed objects on the corresponding survey views
  vm.demographicLimit = 4;
  vm.locationLimit = 4;
  vm.amenitiesLimit = 4;
  vm.brandLimit = 5;
  vm.retentionLimit = 4;



  //SurveyService.js 
  vm.surveyService = SurveyService;
  vm.demographics = SurveyService.demographics;
  vm.location = SurveyService.location;
  vm.amenities = SurveyService.amenities;
  vm.brand = SurveyService.brand;
  vm.retention = SurveyService.retention;



  //GET request functions for the survey views
  SurveyService.getDemographics();
  SurveyService.getLocation();
  SurveyService.getAmenities();
  SurveyService.getBrand();
  SurveyService.getRetention();


});