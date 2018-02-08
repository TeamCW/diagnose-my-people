myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var self = this;
    self.responseData = { list: [] };
    self.clientData = { list: [] };
    self.clientDemoData = { list: [] };
    self.clientLocationData = { list: [] };
    self.clientBrandData = { list: [] };
    self.clientAmenData = { list: [] };
    self.clientRetRecData = { list: [] };
    self.clientConclusionData = { list: [] };
    self.ageDistributionInput = { labels: ['under 25', '26-35', '36-45', '46-55', '56+'], dataSets: [0, 0, 0, 0, 0] }

    //data arrays for graphs



    self.updateCharts = function () {
        self.ageDistribution.update();
    }

    self.getClientResponsesDemo = function (clientId) {
        console.log('getClientResponsesDemo(' + clientId + ')');
        console.log(self.ageDistribution)
        //reset ageDistributionInputs for chart
        $http({
            method: 'GET',
            url: '/dashboard/demo',
            params: { clientId: clientId }
        }).then(function (response) {
            self.clientDemoData.list = response.data;
            console.log('client dashboard demo response:', self.clientDemoData.list);
            //loop through Demographic Data
            for (let i = 0; i < self.clientDemoData.list.length; i++) {

                //if statement checking if question is one
                if (self.clientDemoData.list[i].question_id == 1) {
                    //then statement for if question is one that adds 1 to each option in an array
                    if (self.clientDemoData.list[i].response_text == '1991 or Later') {

                        self.ageDistribution.config.data.datasets[0].data[0]++

                    }
                    if (self.clientDemoData.list[i].response_text == '1981 - 1990') {
                        self.ageDistribution.config.data.datasets[0].data[1]++

                    }
                    if (self.clientDemoData.list[i].response_text == '1971 - 1980') {
                        self.ageDistribution.config.data.datasets[0].data[2]++

                    }
                    if (self.clientDemoData.list[i].response_text == '1961 - 1970') {
                        self.ageDistribution.config.data.datasets[0].data[3]++

                    }
                    if (self.clientDemoData.list[i].response_text == '1960 or Earlier') {
                        self.ageDistribution.config.data.datasets[0].data[4]++

                    }

                }

                //if statement checking if question is two
                if (self.clientDemoData.list[i].question_id == 2) {
                    //then statement for if question is two that adds 1 array index in an 
                    for (let index = 0; index < self.departmentDistribution.config.data.labels.length - 1; index++) {
                        if (self.clientDemoData.list[i].response_text == self.departmentDistribution.config.data.labels[index]) {
                            self.departmentDistribution.config.data.datasets[0].data[index]++

                        }

                    }

                }
                //if statement checking if question is three
                if (self.clientDemoData.list[i].question_id == 3) {
                    //then statement for if question is three that adds 1 array index in an array
                    for (let index = 0; index < self.descriptionDistribution.config.data.labels.length; index++) {
                        if (self.clientDemoData.list[i].response_text == self.descriptionDistribution.config.data.labels[index]) {
                            self.descriptionDistribution.config.data.datasets[0].data[index]++

                        }

                    }
                }
                //if statement checking if question is four
                if (self.clientDemoData.list[i].question_id == 4) {
                    //then statement for if question is four that adds 1 array index in an array
                    for (let index = 0; index < self.experienceDistribution.config.data.labels.length; index++) {
                        if (self.clientDemoData.list[i].response_text == self.experienceDistribution.config.data.labels[index]) {
                            self.experienceDistribution.config.data.datasets[0].data[index]++
                        }
                    }
                }


            }
            console.log(self.experienceDistribution)
            self.ageDistribution.update()
            self.departmentDistribution.update()
            self.descriptionDistribution.update()
            self.experienceDistribution.update()

        });
    };


    self.getClientResponsesLocation = function (clientId) {
        $http({
            method: 'GET',
            url: '/dashboard/location',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.clientLocationData.list = response.data;
            console.log('client dashboard location response:', self.clientLocationData.list);

            //for statement of request
            for (let i = 0; i < self.clientLocationData.list.length; i++) {
                //commuteTimes data compiler
                if (self.clientLocationData.list[i].question_id == 5) {
                    for (let index = 0; index < self.commuteTimes.config.data.labels.length; index++) {
                        if (self.clientLocationData.list[i].response_text == self.commuteTimes.config.data.labels[index]) {
                            self.commuteTimes.config.data.datasets[0].data[index]++

                        }
                    }
                }
                //currentmode of commute for modeOfCommute data compiler
                if (self.clientLocationData.list[i].question_id == 6) {
                    for (let index = 0; index < self.modeOfCommute.config.data.labels.length; index++) {
                        if (self.clientLocationData.list[i].response_text == self.modeOfCommute.config.data.labels[index]) {
                            self.modeOfCommute.config.data.datasets[0].data[index]++

                        }
                    }
                }
                //desiredmode of commute for modeOfCommute data compiler
                if (self.clientLocationData.list[i].question_id == 7) {
                    for (let index = 0; index < self.modeOfCommute.config.data.labels.length; index++) {
                        if (self.clientLocationData.list[i].response_text == self.modeOfCommute.config.data.labels[index]) {
                            self.modeOfCommute.config.data.datasets[1].data[index]++

                        }
                    }
                }
                //parkingSatisfaction data compiler
                if (self.clientLocationData.list[i].question_id == 8) {
                    for (let index = 0; index < self.parkingSatisfaction.config.data.labels.length; index++) {
                        if (self.clientLocationData.list[i].response_text == self.parkingSatisfaction.config.data.labels[index]) {
                            self.parkingSatisfaction.config.data.datasets[0].data[index]++

                        }
                    }
                }
                //
                if (self.clientLocationData.list[i].question_id == 9) {
                    for (let index = 0; index < self.homeworkFrequency.config.data.labels.length; index++) {
                        if (self.clientLocationData.list[i].response_text == self.homeworkFrequency.config.data.labels[index]) {
                            self.homeworkFrequency.config.data.datasets[0].data[index]++
                        }
                    }
                }
            }
            self.commuteTimes.update()
            self.modeOfCommute.update()
            self.parkingSatisfaction.update()
            self.homeworkFrequency.update()
        });
    };

    
    self.getClientResponsesAmenities = function (clientId) {
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
                label: 'Age Groups',
                data: [0, 0, 0, 0, 0],
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                data: [0, 0, 0, 0, 0, 0]
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
                data: [0, 0, 0, 0]
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
                data: [0, 0, 0, 0, 0],
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
            labels: ['Very Dissatisfied', 'Dissatisfied', 'No Opinion', 'Satisfied', 'Very Satisfied'],
            datasets: [{
                label: 'Public Transit',
                data: [0, 0, 0, 0, 0],
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
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                    'rgb(255, 0, 0)',
                ]
            }, {
                label: 'Desired Mode',
                data: [0, 0, 0, 0],
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
            labels: ["Never", "Rarely", "About Half", "Often", "Very Often"],
            datasets: [{
                backgroundColor: [
                    '#ff0000',
                    '#ff9900',
                    '#ffff00',
                    '#00cc00',
                    '#0066cc'
                ],
                data: [0,0,0,0,0]
            }]
        }
    });

    var currentAmenityFrequency = document.getElementById("currentAmenityFrequency");
    self.currentAmenityFrequency = new Chart(currentAmenityFrequency, {
        type: 'bar',
        data: {
            labels: ['Never','Once','Twice','Often','Daily'],
            datasets: [{
                label: 'Frequency of Amenity Usage',
                data: [0,0,0,0,0],
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

    var thirdSpaceFrequency = document.getElementById("thirdSpaceFrequency");
    self.thirdSpaceFrequency = new Chart(thirdSpaceFrequency, {
        type: 'bar',
        data: {
            labels: ['Never','Rarely','A few times','Often','Daily'],
            datasets: [{
                label: 'Frequency of 3rd workpace Usage',
                data: [0,0,0,0,0],
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

    var amenitiesValued = document.getElementById("amenitiesValued");
    self.amenitiesValued = new Chart(amenitiesValued, {
        type: 'radar',
        data: {
            labels: ["Food and Entertainment", "Conference Room", "Green Space", "Shower/Locker Room", "Fitness Center", "Parking", "Public Transit"],
            datasets: [{
                label: 'Average ranking on scale of 5 for amenity importance',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [0,0,0,0,0,0,0]
            }]
        }
    });





}); //end service    