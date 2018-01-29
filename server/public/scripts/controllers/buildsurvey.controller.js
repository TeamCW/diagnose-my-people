myApp.controller('BuildSurveyController', function (BuildSurveyService) {
    console.log('BuildSurveyController created');
    var self = this; 

    //Object containing Property Booleans that track whether sections were added to survey.  They control whether a add or remove button appears on DOM
    //they also feed into the self.reviewBuildSurvey and act as indicators when constructing the $routeparams.
    self.kpisAdded = BuildSurveyService.kpisAdded;
    
    //functions to toggle boolean of self.____Added booleansand calls re
    self.toggleAmenities = BuildSurveyService.toggleAmenities;
    self.toggleBrand = BuildSurveyService.toggleBrand;
    self.toggleLocation = BuildSurveyService.toggleLocation;
    self.toggleRetainment = BuildSurveyService.toggleRetainment;
    self.toggleSpaceLayout = BuildSurveyService.toggleSpaceLayout;


    //function used to concatenate the url with parameters for the survey cart review
    self.refresBuildSurveyURL = BuildSurveyService.refreshBuildSurveyURL

    //concaatenated url
    self.reviewBuildSurveyURL = BuildSurveyService.reviewBuildSurveyURL

  

});