myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var self = this;
    self.responseData = { list: [] };
    self.clientData = { list: [] };
    self.clientDemoData = { list: [] };
    self.clientLocalData = { list: [] };
    self.clientBrandData = { list: [] };
    self.clientAmenData = { list: [] };
    self.clientRetRecData = { list: [] };
    self.clientConclusionData = { list: [] };




    self.getClientResponsesDemo = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/demo',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientDemoData.list = response.data;
            console.log('client dashboard demo response:', self.clientDemoData.list);
        });
    };


    self.getClientResponsesLocal = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/location',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientLocalData.list = response.data;
            console.log('client dashboard location response:', self.clientLocalData.list);
        });
    };


    self.getClientResponsesBrand = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/brand',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientBrandData.list = response.data;
            console.log('client dashboard brand response:', self.clientBrandData.list);
        });
    };
     
    self.getClientResponsesAmen = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/amenities',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientAmenData.list = response.data;
            console.log('client dashboard amenities response:', self.clientAmenData.list);
        });
    };

    self.getClientResponsesRetention = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/retention',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientRetRecData.list = response.data;
            console.log('client dashboard retention response:', self.clientRetRecData.list);
        });
    };

    self.getClientResponsesConclusion = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/conclusion',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientConclusionData.list = response.data;
            console.log('client dashboard conclusion response:', self.clientConclusionData.list);
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