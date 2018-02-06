myApp.controller('BuildSurveyReviewController',[ '$routeParams', function ($routeParams) {
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
        amenitiesRemove () {
            this.amenitiesAdded = false;
            self.refreshContactInformationURL();
        },
        brandRemove () {
            this.brandAdded = false;
            self.refreshContactInformationURL();
        },
        locationRemove () {
            this.locationAdded = false;
            self.refreshContactInformationURL();
        },
        retainmentRemove () {
            this.retainmentAdded = false;
            self.refreshContactInformationURL();
        },
    };

    self.kpisAdded.amenitiesAdded = JSON.parse($routeParams.amenitiesAdded);
    self.kpisAdded.brandAdded = JSON.parse($routeParams.brandAdded);
    self.kpisAdded.locationAdded = JSON.parse($routeParams.locationAdded);
    self.kpisAdded.retainmentAdded = JSON.parse($routeParams.retainmentAdded);

    self.contactInformationURL = {urlString: '#/build-survey-contact-info/false/false/false/false/false'}

    self.refreshContactInformationURL = function () {
        let urlString = '#/build-survey-contact-info'
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
        self.contactInformationURL.urlString = urlString
    }

    self.refreshContactInformationURL()
    console.log(self.kpisAdded)
}]);