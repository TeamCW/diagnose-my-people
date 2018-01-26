myApp.controller('BuildSurveyController', function(BuildSurveyService) {
    console.log('BuildSurveyController created');
    var self = this;

    //Booleans that track whether sections were added to survey.  They control whether a add or remove button appears on DOM
    //they also feed into the self.reviewBuildSurvey and act as indicators when constructing the $routeparams.
    self.amenitiesAdded = BuildSurveyService.amenitiesAdded ;
    self.brandAdded = BuildSurveyService.brandAdded ;
    self.locationAdded = BuildSurveyService.locationAdded;
    self.retainmentAdded = BuildSurveyService.retainmentAdded;
    self.spaceLayoutAdded = BuildSurveyService.spaceLayoutAdded;
    
    //function used to concatenate the url with parameters for the survey cart review
    self.reviewBuildSurveyURL = BuildSurveyService.reviewBuildSurveyURL


  });