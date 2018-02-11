myApp.controller('SurveyController', function (SurveyService, $routeParams) {
  console.log('SurveyController created');
  var vm = this;


 // Get KPI that client selected for the survey 
 vm.getSelectedKpi = SurveyService.getSelectedKpi;
 vm.getSelectedKpi($routeParams.surveyHash);
 

 console.log('controller booleans:',vm.demo, vm.branding, vm.retRec, vm.locat, vm.amen, vm.conc)


  //setting the limit for displayed objects on the corresponding survey views
  vm.demographicLimit = 4;
  vm.locationLimit = 5;
  vm.amenitiesLimit = 10;
  vm.brandLimit = 7;
  vm.retentionLimit = 10;
  vm.conclusionLimit = 7;


  //SurveyService.js 
  vm.surveyService = SurveyService;
  vm.demographics = SurveyService.demographics;
  vm.location = SurveyService.location;
  vm.amenities = SurveyService.amenities;
  vm.brand = SurveyService.brand;
  vm.retention = SurveyService.retention;
  vm.conclusion = SurveyService.conclusion;
  vm.saveResponses = SurveyService.saveResponses;
  vm.saveResponsesUserInput = SurveyService.saveResponsesUserInput;
  vm.lastQuestion = SurveyService.lastQuestion;
  vm.client = SurveyService.client;
  vm.addCount = SurveyService.addCount;
  vm.saveEmployeeLocationComments = SurveyService.saveEmployeeLocationComments;
  vm.saveEmployeeAmenitiesComments = SurveyService.saveEmployeeAmenitiesComments;
  vm.saveEmployeeBrandComments = SurveyService.saveEmployeeBrandComments;
  vm.saveEmployeeRetentionComments = SurveyService.saveEmployeeRetentionComments;
  vm.additionalComment = SurveyService.additionalComment;



  //GET request functions for the survey views
  SurveyService.getDemographics($routeParams.surveyHash);
  SurveyService.getLocation($routeParams.surveyHash);
  SurveyService.getAmenities($routeParams.surveyHash);
  SurveyService.getBrand($routeParams.surveyHash);
  SurveyService.getRetention($routeParams.surveyHash);
  SurveyService.getConclusion($routeParams.surveyHash);
  SurveyService.getClient($routeParams.surveyHash);

 
  




});