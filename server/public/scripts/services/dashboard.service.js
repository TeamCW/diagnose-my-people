myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var vm = this;
    vm.responseData = { list: [] };
    

    vm.getAgeGroups = function () {
        $http({
            method: 'GET',
            url: '/dashboard',
        }).then(function (response) {
            vm.responseData.list = response.data;
            console.log('response info:', vm.responseData.list)
            vm.updateChart();
        });
    }//end getAgeGroups




     


}); //end service    