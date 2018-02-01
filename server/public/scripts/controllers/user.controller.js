myApp.controller('UserController', ['UserService', 'AdminService', function(UserService, AdminService) {
    console.log('UserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.clientData = AdminService.clientData;
    self.getClientInfo = AdminService.getClientInfo;
    self.deleteClient = AdminService.deleteClient;
    self.clientContacted = AdminService.clientContacted;
    self.editClient = AdminService.editClient;
    self.clientStatus = AdminService.clientStatus;




    self.getClientInfo();


    


  }]);