myApp.controller('DashboardController', ['DashboardService', 'AdminService', '$http', '$routeParams',function (DashboardService, AdminService, $http, $routeParams) {
    console.log('DashboardController created');
    var vm = this;
    vm.dashboardService = DashboardService;
    vm.clientDemoData = DashboardService.clientDemoData;
    // vm.clientLocalData = DashboardService.clientLocalData;
    // vm.clientBrandData = DashboardService.clientBrandData;
    // vm.clientAmenData = DashboardService.clientAmenData;
    // vm.clientRetRecData = DashboardService.clientRetRecData;
    // vm.clientConclusionData = DashboardService.clientConclusionData;

    self.getClientResponsesDemo = DashboardService.getClientResponsesDemo 
    self.getClientResponsesLocation = DashboardService.getClientResponsesLocation
    self.getClientResponsesAmenities = DashboardService.getClientResponsesAmenities

    self.getClientResponsesDemo($routeParams.clientId );
    self.getClientResponsesLocation($routeParams.clientId);
    self.getClientResponsesAmenities($routeParams.clientId)
    // DashboardService.getClientResponsesBrand($routeParams.clientId);
    // DashboardService.getClientResponsesAmen($routeParams.clientId);
    // DashboardService.getClientResponsesRetention($routeParams.clientId);
    // DashboardService.getClientResponsesConclusion($routeParams.clientId);



            // Get KPI that client selected for the survey 
            vm.getSelectedKpi = DashboardService.getSelectedKpi;
            vm.getSelectedKpi ($routeParams.clientId );
            vm.demo = DashboardService.demo;
            vm.locat = DashboardService.locat;
            vm.brand = DashboardService.brand;
            vm.retRec = DashboardService.retRec;
            vm.amen = DashboardService.amen;
            vm.conc = DashboardService.conc;
            console.log('controller booleans:',vm.demo, vm.brand, vm.retRec, vm.locat, vm.amen, vm.conc)



    self.ageDistributionInput = DashboardService.ageDistributionInput



    
    var barChart = document.getElementById("barChart");
    vm.barChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: [1, 2, 3, 4],
            datasets: [{
                label: 'Employee Age Groups',
                data: [1, 2, 3, 4],
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


    var lineChart = document.getElementById("lineChart");
    vm.lineChart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [{
                label: 'line chart',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],

            },
            {
                label: 'line chart',
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [34, 33, 20, 4, 32, 44, 39],

            }],//end datasets
        },//end data
        options: {
            scales: {
                yAxes: [{
                    stacked: true
                }]
            }
        }//emd options
    });

    var pieChart = document.getElementById("pieChart");
    vm.pieChart = new Chart(pieChart, {
        type: 'pie',
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
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
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });

    var doughnutChart = document.getElementById("doughnutChart");
    vm.doughnutChart = new Chart(doughnutChart, {
        type: 'doughnut',
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
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
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });

    var radarChart = document.getElementById("radarChart");
    vm.radarChart = new Chart(radarChart, {
        type: 'radar',
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [{
                label: 'apples',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [12, 19, 3, 17, 28, 24, 7]
            }, {
                label: 'oranges',
                backgroundColor: "rgba(255,153,0,0.4)",
                borderColor: "rgba(255,153,0,1)",
                data: [30, 29, 5, 5, 20, 3, 10]
            }]
        }
    });

    var polarChart = document.getElementById("polarChart");
    vm.polarChart = new Chart(polarChart, {
        type: 'polarArea',
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
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
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });

    vm.mixedChart = new Chart(document.getElementById("mixedChart"), {
        type: 'bar',
        data: {
            labels: ["1900", "1950", "1999", "2050"],
            datasets: [{
                label: "Europe",
                type: "line",
                borderColor: "#8e5ea2",
                data: [408, 547, 675, 734],
                fill: false
            }, {
                label: "Africa",
                type: "line",
                borderColor: "#3e95cd",
                data: [133, 221, 783, 2478],
                fill: false
            }, {
                label: "Europe",
                type: "bar",
                backgroundColor: "rgba(0,0,0,0.2)",
                data: [408, 547, 675, 734],
            }, {
                label: "Africa",
                type: "bar",
                backgroundColor: "rgba(0,0,0,0.2)",
                backgroundColorHover: "#3e95cd",
                data: [133, 221, 783, 2478]
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Population growth (millions): Europe & Africa'
            },
            legend: { display: false }
        }
    });

    vm.bubbleChart = new Chart(document.getElementById("bubbleChart"), {
        type: 'bubble',
        data: {
            labels: "Africa",
            datasets: [
                {
                    label: ["China"],
                    backgroundColor: "rgba(255,221,50,0.2)",
                    borderColor: "rgba(255,221,50,1)",
                    data: [{
                        x: 21269017,
                        y: 5.245,
                        r: 15
                    }]
                }, {
                    label: ["Denmark"],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 258702,
                        y: 7.526,
                        r: 10
                    }]
                }, {
                    label: ["Germany"],
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderColor: "#000",
                    data: [{
                        x: 3979083,
                        y: 6.994,
                        r: 15
                    }]
                }, {
                    label: ["Japan"],
                    backgroundColor: "rgba(193,46,12,0.2)",
                    borderColor: "rgba(193,46,12,1)",
                    data: [{
                        x: 4931877,
                        y: 5.921,
                        r: 15
                    }]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
            }, scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Happiness"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "GDP (PPP)"
                    }
                }]
            }
        }
    });

    // vm.getAgeGroups = function () {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard',
    //     }).then(function (response) {
    //         responseData = response.data;
    //         console.log('response info:', responseData)
    //         vm.updateChart(responseData);
    //     });
    // }//end getAgeGroups



    vm.updateChart = function (responseData) {
        for (var i = 0; i < responseData.length; i++) {
            vm.barChart.config.data.labels.push(responseData[i].response_text);
            vm.barChart.data.datasets[0].data.push(responseData[i].count);
        }
        console.log('labels:', vm.barChart.config.data.labels);
        console.log('data:', vm.barChart.data.datasets[0].data);
        vm.barChart.update();
    };


    // vm.getAgeGroups();



}]);//end controller