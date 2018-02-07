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
        console.log('cleveland rocks', clientId);
        $http({
            method: 'GET',
            url: '/dashboard/demo',
            params: { clientId: clientId }
        }).then(function (response) {
            self.clientDemoData.list = response.data;
            console.log('client dashboard demo response:', self.clientDemoData.list);
            //loop through Demographic Data
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                //if statement checking if question is one
                if (condition) {
                    //then statement for if question is one that adds 1 to each option in an array
                }
                //if statement checkin if question is two
                if (condition) {
                    //then statement for if question is two that adds 1 array index in an array
                }
                //if statement checkin if question is three
                if (condition) {
                   //then statement for if question is three that adds 1 array index in an array 
                }
                //if statement checkin if question is four
                if (condition) {
                    //then statement for if question is four that adds 1 array index in an array
                }

                

                

                

                

                
            }

        });
    };


    // self.getClientResponsesLocal = function (clientId) {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard/location',
    //         params: {
    //             clientId: clientId
    //         }
    //     }).then(function (response) {
    //         self.clientLocalData.list = response.data;
    //         console.log('client dashboard location response:', self.clientLocalData.list);
    //     });
    // };


    // self.getClientResponsesBrand = function (clientId) {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard/brand',
    //         params: {
    //             clientId: clientId
    //         }
    //     }).then(function (response) {
    //         self.clientBrandData.list = response.data;
    //         console.log('client dashboard brand response:', self.clientBrandData.list);
    //     });
    // };

    // self.getClientResponsesAmen = function (clientId) {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard/amenities',
    //         params: {
    //             clientId: clientId
    //         }
    //     }).then(function (response) {
    //         self.clientAmenData.list = response.data;
    //         console.log('client dashboard amenities response:', self.clientAmenData.list);
    //     });
    // };

    // self.getClientResponsesRetention = function (clientId) {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard/retention',
    //         params: {
    //             clientId: clientId
    //         }
    //     }).then(function (response) {
    //         self.clientRetRecData.list = response.data;
    //         console.log('client dashboard retention response:', self.clientRetRecData.list);
    //     });
    // };

    // self.getClientResponsesConclusion = function (clientId) {
    //     $http({
    //         method: 'GET',
    //         url: '/dashboard/conclusion',
    //         params: {
    //             clientId: clientId
    //         }
    //     }).then(function (response) {
    //         self.clientConclusionData.list = response.data;
    //         console.log('client dashboard conclusion response:', self.clientConclusionData.list);
    //     });
    // };





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
                data: [53, 60, 89, 51, 31, 69, 40, 17, 24, 48, 77]
            }]
        }
    });

    var descriptionDistribution = document.getElementById("descriptionDistribution");
    self.descriptionDistribution = new Chart(descriptionDistribution, {
        type: 'polarArea',
        data: {
            labels: ["Creative", "Corporate", "Healthcare", "General Office", "Technology", "Other"],
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
            labels: ['0-3', '3-5', '5-10', '10+'],
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
                data: [79, 49, 11, 70]
            }]
        }
    });

    var commuteTimes = document.getElementById("commuteTimes");
    self.commuteTimes = new Chart(commuteTimes, {
        type: 'bar',
        data: {
            labels: ['5-10 minutes', '10-20 minutes', '20-30 minutes', '30-40 minutes', '40+ minutes'],
            datasets: [{
                label: 'Commute times',
                data: [5, 10, 30, 20, 15],
                backgroundColor: []
            }
            ]


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

    var parkingSatisfaction = document.getElementById("parkingSatisfaction");
    self.parkingSatisfaction = new Chart(parkingSatisfaction, {
        type: 'bar',
        data: {
            labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
            datasets: [{
                label: 'Public Transit',
                data: [5, 10, 30, 20, 15],
                backgroundColor: []
            }
            ]


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

    var modeOfCommute = document.getElementById("modeOfCommute");
    self.modeOfCommute = new Chart(modeOfCommute, {
        type: 'bar',
        data: {
            labels: [
                "Public Transit",
                "Driving",
                "Walking/Biking",
                "Rideshare"

            ],
            datasets: [{
                label: 'Current Mode',
                data: [5, 10, 30, 20],
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                ]
            }, {
                label: 'Desired Mode',
                data: [5, 50, 2, 9],
                backgroundColor: [
                    'rgb(0, 0, 255)',
                    'rgb(0, 0, 255)',
                    'rgb(0, 0, 255)',
                    'rgb(0, 0, 255)',
                ]
            }
            ]
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

    var homeworkFrequency = document.getElementById("homeworkFrequency");
    self.homeworkFrequency = new Chart(homeworkFrequency, {
        type: 'pie',
        data: {
            labels: ["Never", "Rarely", "Half the Time", "Often", "Most of the Time"],
            datasets: [{
                backgroundColor: [
                    '#ff0000',
                    '#ff9900',
                    '#ffff00',
                    '#00cc00',
                    '#0066cc'
                ],
                data: [12, 19, 3, 17, 28]
            }]
        }
    });





}); //end service    