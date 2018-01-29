myApp.controller('DashboardController', ['DashboardService', 'AdminService', '$http', function(DashboardService, AdminService, $http) {
    console.log('DashboardController created');
    var vm = this;
    vm.dashboardService = DashboardService;
    vm.responseData = { list: [] };


    var popCanvas = document.getElementById("popChart");
    vm.barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Employee Age Groups',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            
          }]
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
        
      });


    
  
      vm.getAgeGroups = function () {
        $http({
            method: 'GET',
            url: '/dashboard',
        }).then(function (response) {
            responseData = response.data;
            console.log('response info:', responseData)
            vm.updateChart(responseData);
        });
    }//end getAgeGroups



      vm.updateChart = function(responseData) {
        for(var i = 0; i < responseData.length; i++){
          vm.barChart.config.data.labels.push(responseData[i].response_text);
          vm.barChart.data.datasets[0].data.push(responseData[i].count);
        }
        console.log('labels:', vm.barChart.config.data.labels);
        console.log('data:', vm.barChart.data.datasets[0].data);
        vm.barChart.update();
      };

      
      vm.getAgeGroups();
      

  }]);//end controller