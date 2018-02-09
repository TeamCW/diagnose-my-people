myApp.service('AdminService', function ($http, $location) {
    console.log('AdminService Loaded');
    var self = this;
    self.clientData = { list: [] };




    self.clientStatus = ["New Client", "In Progress", "Finished"];


    self.getClientInfo = function () {
        $http({
            method: 'GET',
            url: '/admin',
        }).then(function (response) {
            self.clientData.list = response.data;
            console.log('client info:', self.clientData.list)
        });
    }//end getClientInfo

    self.deleteClient = function (clientToDelete) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this client!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Client deleted!", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/admin/' + clientToDelete.id,
                    }).then(function (response) {
                        self.getClientInfo();
                    });
                } else {
                    swal("Client not deleted");
                }
            });
    }//end deleteClient

    self.editClient = function(clientToEdit){
        console.log('clientToEdit:', clientToEdit)
        $http({
            method: 'PUT',
            url: '/admin/edit/' + clientToEdit.id,
            data: clientToEdit
        }).then(function(response){
            self.getClientInfo();
        })
    }; //end editClient

  


}); //end service    