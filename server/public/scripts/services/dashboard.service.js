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


    self.getClientResponses = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientData.list = response.data;
            console.log('client dashboard response:', self.clientData.list);
        });
    };



    var ageDistribution = document.getElementById("ageDistribution");
    self.ageDistribution = new Chart(ageDistribution, {
        type: 'bar',
        data: {
            labels: ['under 25', '26-35', '36-45', '46-55', '56+'],
            datasets: [{
                label: 'Employee Age Groups',
                data: [23, 45, 54, 32, 20],
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var departmentDistribution = document.getElementById("departmentDistribution");
    self.departmentDistribution = new Chart(departmentDistribution, {
        type: 'radar',
        data: {
            labels: [
                "Customer Services",
                "Finance",
                "Sales",
                "Administrative",
                "Research",
                "Management",
                "Legal",
                "Executive",
                "Marketing",
                "Creative",
                "Other"

            ],
            datasets: [{
                label: 'apples',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [53,60,89,51,31,69,40,17,24,48,77]
            }]
        }
    });

    var descriptionDistribution = document.getElementById("descriptionDistribution");
    self.descriptionDistribution = new Chart(descriptionDistribution, {
        type: 'polarArea',
        data: {
            labels: ["Creative","Corporate","Healthcare","General Office","Technology","Other"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: [53, 14, 29, 19, 72, 34]
            }]
        }
    });

    var experienceDistribution = document.getElementById("experienceDistribution");
    self.experienceDistribution = new Chart(experienceDistribution, {
        type: 'pie',
        data: {
            labels: ['0-3','3-5','5-10','10+'],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: [79,49,11,70]
            }]
        }
    });

}); //end service    