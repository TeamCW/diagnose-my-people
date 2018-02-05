myApp.controller('BuildSurveyThankYouController',[ '$routeParams', 'BuildSurveyContactInfoService',  function ($routeParams, BuildSurveyContactInfoService) {
    console.log('BuildSurveyThankYouController created');
    console.log($routeParams)
    var self = this;

    self.name = $routeParams.name;
    self.surveyHash = $routeParams.surveyHash

}]);