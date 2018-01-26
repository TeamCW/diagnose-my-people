myApp.service('BuildSurveyService', function ($http, $location) {
    console.log('BuildSurveyService Loaded');
    var self = this;

    self.amenitiesAdded = false;
    self.brandAdded = false;
    self.locationAdded = false;
    self.retainmentAdded = false;
    self.spaceLayoutAdded = false;

    self.reviewBuildSurveyURL = function () {
        let urlString = '#/build-survey-review'
        if (self.amenitiesAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.brandAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.locationAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.retainmentAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.spaceLayoutAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        return urlString
    }
});