myApp.controller('UserController', ['UserService', 'AdminService', function(UserService, AdminService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.clientData = AdminService.clientData;
    vm.getClientInfo = AdminService.getClientInfo;
    vm.deleteClient = AdminService.deleteClient;
    vm.clientContacted = AdminService.clientContacted;
    vm.editClient = AdminService.editClient;
    vm.clientStatus = AdminService.clientStatus;
    



    vm.getClientInfo();


    


  }]);