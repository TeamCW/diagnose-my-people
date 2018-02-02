myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var self = this;
    self.responseData = { list: [] };
    self.clientData = { list: [] };

    self.getAgeGroups = function () {
        $http({
            method: 'GET',
            url: '/dashboard',
        }).then(function (response) {
            vm.responseData.list = response.data;
            console.log('response info:', vm.responseData.list)
            vm.updateChart();
        });
    }//end getAgeGroups


    self.getClientSurvey = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientData.list = response.data;
            console.log('client dashboard response:', self.clientData.list);
        });
    };

     


}); //end service    