myApp.service('AdminService', function ($http, $location) {
    console.log('AdminService Loaded');
    var vm = this;
    vm.clientData = { list: [] };




    vm.clientStatus = ["New Client", "In Progress", "Finished"];


    vm.getClientInfo = function () {
        $http({
            method: 'GET',
            url: '/admin',
        }).then(function (response) {
            vm.clientData.list = response.data;
            console.log('client info:', vm.clientData.list)
        });
    }//end getClientInfo

    vm.deleteClient = function (clientToDelete) {
        $http({
            method: 'DELETE',
            url: '/admin/' + clientToDelete.id,
        }).then(function (response) {
            vm.getClientInfo();
        })
    }//end deleteClient

    vm.clientContacted = function(clientToEdit){
        console.log('clientToEdit:', clientToEdit)
        $http({
            method: 'PUT',
            url: '/admin/' + clientToEdit.id,
            data: clientToEdit
        }).then(function(response){
            vm.getClientInfo();
        })
    }; //end clientContacted

    vm.editClient = function(clientToEdit){
        console.log('clientToEdit:', clientToEdit)
        $http({
            method: 'PUT',
            url: '/admin/edit/' + clientToEdit.id,
            data: clientToEdit
        }).then(function(response){
            vm.getClientInfo();
        })
    }; //end editClient


}); //end service    