myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var self = this;
    self.responseData = { list: [] };
    self.clientData = { list: [] };
    self.clientDemoData = { list: [] };
    self.clientLocalData = { list: [] };
    self.clientBrandData = { list: [] };
    self.clientAmenData = { list: [] };
    self.clientRetRecData = { list: [] };
    self.clientConclusionData = { list: [] };




    self.getClientResponsesDemo = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/demo',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientDemoData.list = response.data;
            console.log('client dashboard demo response:', self.clientDemoData.list);
        });
    };


    self.getClientResponsesLocal = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/location',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientLocalData.list = response.data;
            console.log('client dashboard location response:', self.clientLocalData.list);
        });
    };

    self.getClientResponsesBrand = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/brand',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientBrandData.list = response.data;
            console.log('client dashboard brand response:', self.clientBrandData.list);
        });
    };
     
    self.getClientResponsesAmen = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/amenities',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientAmenData.list = response.data;
            console.log('client dashboard amenities response:', self.clientAmenData.list);
        });
    };

    self.getClientResponsesRetention = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/retention',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientRetRecData.list = response.data;
            console.log('client dashboard retention response:', self.clientRetRecData.list);
        });
    };

    self.getClientResponsesConclusion = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/conclusion',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientConclusionData.list = response.data;
            console.log('client dashboard conclusion response:', self.clientConclusionData.list);
        });
    };



    
    

}); //end service    