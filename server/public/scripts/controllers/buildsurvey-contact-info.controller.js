myApp.controller('BuildSurveyContactInfoController',[ '$routeParams', 'BuildSurveyContactInfoService',  function ($routeParams, BuildSurveyContactInfoService) {
    console.log('BuildSurveyController created');
    console.log($routeParams)
    var self = this;

    //Booleans that track whether sections were added to survey.  They control whether a add or remove button appears on DOM
    //they also feed into the self.reviewBuildSurvey and act as indicators when constructing the $routeparams.
    self.kpisAdded = {
        amenitiesAdded: false,
        brandAdded: false,
        locationAdded: false,
        retainmentAdded: false,
        spaceLayoutAdded: false,
    };

    self.kpisAdded.amenitiesAdded = JSON.parse($routeParams.amenitiesAdded);
    self.kpisAdded.brandAdded = JSON.parse($routeParams.brandAdded);
    self.kpisAdded.locationAdded = JSON.parse($routeParams.locationAdded);
    self.kpisAdded.retainmentAdded = JSON.parse($routeParams.retainmentAdded);
    self.kpisAdded.spaceLayoutAdded = JSON.parse($routeParams.spaceLayoutAdded);

    self.contactInformation = BuildSurveyContactInfoService.contactInformation;
    
    self.postNewSurveyAndClient = BuildSurveyContactInfoService.postNewSurveyAndClient;

    console.log(self.kpisAdded)

}]);