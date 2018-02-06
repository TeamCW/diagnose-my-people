myApp.service('BuildSurveyService', function ($http, $location) {
    console.log('BuildSurveyService Loaded');
    var self = this;

    self.kpisAdded = {
        amenitiesAdded:  false,
        brandAdded: false,
        locationAdded: false,
        retainmentAdded: false,

    }



    self.reviewBuildSurveyURL = {urlString: '#/build-survey-review/false/false/false/false/false'};

    self.toggleAmenities = function (){
        self.kpisAdded.amenitiesAdded = !self.kpisAdded.amenitiesAdded;
        self.refreshBuildSurveyURL();
        
        
    }
    self.toggleBrand = function (){
        self.kpisAdded.brandAdded = !self.kpisAdded.brandAdded;  
        self.refreshBuildSurveyURL();
    }
    self.toggleLocation = function (){
        self.kpisAdded.locationAdded = !self.kpisAdded.locationAdded;
        self.refreshBuildSurveyURL();
    }
    self.toggleRetainment = function (){
        self.kpisAdded.retainmentAdded = !self.kpisAdded.retainmentAdded;                
        self.refreshBuildSurveyURL();
    }
    self.toggleSpaceLayout = function (){
        self.kpisAdded.spaceLayoutAdded= !self.kpisAdded.spaceLayoutAdded;
        self.refreshBuildSurveyURL();
    }

    self.refreshBuildSurveyURL = function () {
        let urlString = '#/build-survey-review'
        if (self.kpisAdded.amenitiesAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.kpisAdded.brandAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.kpisAdded.locationAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        if (self.kpisAdded.retainmentAdded) {
            urlString += '/true'
        }
        else {
            urlString += '/false'
        };
        console.log(urlString);
        self.reviewBuildSurveyURL.urlString = urlString
    }
});