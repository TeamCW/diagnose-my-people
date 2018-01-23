myApp.service('AdminService', function ($http, $location) {
    console.log('AdminService Loaded');
    var vm = this;
    vm.clientData = { list: [] };


    vm.getClientInfo = function () {
        $http({
            method: 'GET',
            url: '/admin',
        }).then(function (response) {
            vm.clientData.list = response.data;
            console.log('client info:', vm.clientData.list)
        });
    }//end getClientInfo





}); //end service    