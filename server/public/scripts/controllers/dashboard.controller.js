myApp.controller('DashboardController', ['DashboardService', 'AdminService', function(DashboardService, AdminService) {
    console.log('DashboardController created');
    var vm = this;
    vm.dashboardService = DashboardService;




  }]);//end controller