myApp.controller('DashboardController', function(AdminService) {
    console.log('DashboardController created');
    var vm = this;
    vm.adminService = AdminService;
  });