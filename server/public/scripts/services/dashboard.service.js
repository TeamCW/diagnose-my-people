myApp.service('DashboardService', function ($http, $location) {
    console.log('DashboardService Loaded');
    var self = this;
    self.responseData = { list: [] };
    self.clientData = { list: [] };
    self.clientDemoData = { list: [] };
    self.clientLocationData = { list: [] };
    self.clientBrandData = { list: [] };
    self.clientAmenitiesData = { list: [] };
    self.clientRetRecData = { list: [] };
    self.clientConclusionData = { list: [] };
    self.ageDistributionInput = { labels: ['under 25', '26-35', '36-45', '46-55', '56+'], dataSets: [0, 0, 0, 0, 0] }

    //data arrays for graphs

    //get selected kpi section



    self.getSelectedKpi = function (clientId) {
        self.demo = true
        self.locat = {locat: false}
        self.brand = {brand: false}
        self.retRec = {retrec: false}
        self.amen = {amen: false}
        self.conc = true;
        $http({
            method: 'GET',
            url: '/dashboard/kpi/',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.responseData.list = response.data;
            console.log('Selected KPI for client:', self.responseData.list);
            for (var i = 0; i < self.responseData.list.length; i++) {
                if (self.responseData.list[i].kpi_id == 2){
                    self.locat.locat = !self.locat.locat;
                }
                if (self.responseData.list[i].kpi_id == 3) {
                    self.amen.amen = !self.amen.amen;
                }
                if (self.responseData.list[i].kpi_id == 4) {
                    self.brand.brand = !self.brand.brand;
                }
                if (self.responseData.list[i].kpi_id == 5) {
                    self.retRec.retRec = !self.retRec.retRec;
                }
            }
            console.log('locat:', self.locat.locat);
            console.log('brand:', self.brand.brand);
            console.log('retRec:', self.retRec.retRec);
            console.log('amen:', self.amen.amen);
        });
    };



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
            self.clientAmenitiesData.list = response.data;
            console.log('client dashboard amenities response:', self.clientAmenitiesData.list);
            // 10, 11, 13, 14, 15, 16, 17, 18, 19

            //declaring counts of inputs for questions 13-19 going into amenitiesValued graph
            let foodAndEntertainmentRatingCount = [0, 0, 0, 0, 0]
            let conferenceRoomRatingCount = [0, 0, 0, 0, 0]
            let greenSpaceRatingCount = [0, 0, 0, 0, 0]
            let showerLockerRatingCount = [0, 0, 0, 0, 0]
            let fitnessCenterRatingCount = [0, 0, 0, 0, 0]
            let parkingRatingCount = [0, 0, 0, 0, 0]
            let publicTransitCount = [0, 0, 0, 0, 0]
            for (let i = 0; i < self.clientAmenitiesData.list.length; i++) {
                //currentAmenityFrequency Compiler
                if (self.clientAmenitiesData.list[i].question_id == 10) {
                    for (let index = 0; index < self.commuteTimes.config.data.labels.length; index++) {
                        if (self.clientAmenitiesData.list[i].response_text == self.currentAmenityFrequency.config.data.labels[index]) {
                            self.currentAmenityFrequency.config.data.datasets[0].data[index]++
                            console.log('++')
                        }
                    }
                }
                //thirdSpaceFrequency Compiler
                if (self.clientAmenitiesData.list[i].question_id == 11) {
                    for (let index = 0; index < self.thirdSpaceFrequency.config.data.labels.length; index++) {
                        if (self.clientAmenitiesData.list[i].response_text == self.thirdSpaceFrequency.config.data.labels[index]) {
                            self.thirdSpaceFrequency.config.data.datasets[0].data[index]++
                            console.log('++')
                        }
                    }
                }
                //amenitiesValued Compiler Food and Entertainment
                if (self.clientAmenitiesData.list[i].question_id == 13) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < foodAndEntertainmentRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            foodAndEntertainmentRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Conference Room
                if (self.clientAmenitiesData.list[i].question_id == 14) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < conferenceRoomRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            conferenceRoomRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Green Space
                if (self.clientAmenitiesData.list[i].question_id == 15) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < greenSpaceRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            greenSpaceRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Shower/Locker Room
                if (self.clientAmenitiesData.list[i].question_id == 16) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < showerLockerRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            showerLockerRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Fitness Center
                if (self.clientAmenitiesData.list[i].question_id == 17) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < fitnessCenterRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            fitnessCenterRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Parking
                if (self.clientAmenitiesData.list[i].question_id == 18) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < parkingRatingCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            parkingRatingCount[index]++
                        }
                    }

                }
                //amenitiesValued Compiler Public Transit
                if (self.clientAmenitiesData.list[i].question_id == 19) {
                    //create an array with index for each value 1-5
                    //check value 1-5 of amenity
                    for (let index = 0; index < publicTransitCount.length; index++) {
                        //add 1 to corresponding index count of the array
                        if (self.clientAmenitiesData.list[i].response_text == index + 1) {
                            publicTransitCount[index]++
                        }
                    }

                }


            }
            //calculate weighted averages value from 1-5 value array
            let foodAndEntertainmentAverage = 0;
            let conferenceRoomAverage = 0;
            let greenSpaceAverage = 0;
            let showerLockerAverage = 0;
            let fitnessCenterAverage = 0;
            let parkingAverage = 0;
            let publicTransitAverage = 0;
            for (let j = 0; j < 5; j++) {
                foodAndEntertainmentAverage += ((j + 1) * foodAndEntertainmentRatingCount[j]);
                conferenceRoomAverage += ((j + 1) * conferenceRoomRatingCount[j]);
                greenSpaceAverage += ((j + 1) * greenSpaceRatingCount[j]);
                showerLockerAverage += ((j + 1) * showerLockerRatingCount[j]);
                fitnessCenterAverage += ((j + 1) * fitnessCenterRatingCount[j]);
                parkingAverage += ((j + 1) * parkingRatingCount[j]);
                publicTransitAverage += ((j + 1) * publicTransitCount[j]);
            }

            //assign averages for values in amenitiesValued
            self.amenitiesValued.config.data.datasets[0].data[0] += foodAndEntertainmentAverage;
            self.amenitiesValued.config.data.datasets[0].data[1] += conferenceRoomAverage;
            self.amenitiesValued.config.data.datasets[0].data[2] += greenSpaceAverage;
            self.amenitiesValued.config.data.datasets[0].data[3] += showerLockerAverage;
            self.amenitiesValued.config.data.datasets[0].data[4] += fitnessCenterAverage;
            self.amenitiesValued.config.data.datasets[0].data[5] += parkingAverage;
            self.amenitiesValued.config.data.datasets[0].data[6] += publicTransitAverage;

            console.log(self.amenitiesValued.config.data.datasets[0].data)

            self.currentAmenityFrequency.update()
            self.thirdSpaceFrequency.update()
            self.amenitiesValued.update()

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
                label: 'departments',
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
                data: [0, 0, 0, 0, 0]
            }]
        }
    });

    var currentAmenityFrequency = document.getElementById("currentAmenityFrequency");
    self.currentAmenityFrequency = new Chart(currentAmenityFrequency, {
        type: 'bar',
        data: {
            labels: ['Never', 'Once', 'Twice', 'Often', 'Daily'],
            datasets: [{
                label: 'Frequency of Amenity Usage',
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

    var thirdSpaceFrequency = document.getElementById("thirdSpaceFrequency");
    self.thirdSpaceFrequency = new Chart(thirdSpaceFrequency, {
        type: 'bar',
        data: {
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'],
            datasets: [{
                label: 'Frequency of 3rd workpace Usage',
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

    var amenitiesValued = document.getElementById("amenitiesValued");
    self.amenitiesValued = new Chart(amenitiesValued, {
        type: 'radar',
        data: {
            labels: ["Food and Entertainment", "Conference Room", "Green Space", "Shower/Locker Room", "Fitness Center", "Parking", "Public Transit"],
            datasets: [{
                label: 'Average ranking on scale of 5 for amenity importance',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [0, 0, 0, 0, 0, 0, 0]
            }]
        }
    });

    var stateOfSustainability = document.getElementById("stateOfSustainability");
    self.stateOfSustainability = new Chart(stateOfSustainability, {
        type: 'bar',
        data: {
            labels: ['Very Poor', 'Poor', 'No Opinion', 'Good', 'Very Good'],
            datasets: [{
                label: 'Employee Age Groups',
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

    var brandReflection = document.getElementById("brandReflection");
    self.brandReflection = new Chart(brandReflection, {
        type: 'pie',
        data: {
            labels: ["Very Poor", "Poor", "No Opinion", "Good", "Very Good"],
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
                data: [0, 0, 0, 0, 0]
            }]
        }
    });

    var currentImpression = document.getElementById("currentImpression");
    self.currentImpression = new Chart(currentImpression, {
        type: 'pie',
        data: {
            labels: ["Very Poor", "Poor", "No Opinion", "Good", "Very Good"],
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
                data: [0, 0, 0, 0, 0]
            }]
        }
    });



    var currentExposure = document.getElementById("currentExposure");
    self.currentExposure = new Chart(currentExposure, {
        type: 'bar',
        data: {
            labels: ["Unfavorable", "Needs Improvement", "No Opinion", "Good", "Excellent"],
            datasets: [{
                label: '',
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

    var publicExposureImportance = document.getElementById("publicExposureImportance");
    self.publicExposureImportance = new Chart(publicExposureImportance, {
        type: 'bar',
        data: {
            labels: ["Not Applicable", "Minimal", "Imortant", "Very Important", "Essential"],
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

    var publicExposureChange = document.getElementById("publicExposureChange");
    self.publicExposureChange = new Chart(publicExposureChange, {
        type: 'bar',
        data: {
            labels: ["Not Applicable", "Minimal", "Impactful", "Very Impactful", "Critical"],
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

    var spaceComparability = document.getElementById("spaceComparability");
    self.spaceComparability = new Chart(spaceComparability, {
        type: 'pie',
        data: {
            labels: ["Very Inferior", "Inferior", "Same", "Superior", "Highly Superior"],
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
                data: [12, 19, 3, 17, 28]
            }]
        }
    });



    var daylightAccess = document.getElementById("daylightAccess");
    self.daylightAccess = new Chart(daylightAccess, {
        type: 'pie',
        data: {
            labels: ["Very Poor", "Poor", "No Opinion", "Good", "Very Good"],
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
                data: [12, 19, 3, 17, 28]
            }]
        }
    });

    var locationImpact = document.getElementById("locationImpact");
    self.locationImpact = new Chart(locationImpact, {
        type: 'bar',
        data: {
            labels: ["Not Applicable", "Minimal", "Impactful", "Very Impactful", "Crucial"],
            datasets: [{
                label: 'Location Satisfaction Impact',
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

    var sufficiency = document.getElementById("sufficiency");
    self.sufficiency = new Chart(sufficiency, {
        type: 'bar',
        data: {
            labels: ["Not Applicable", "Poorly", "Satisfactory", "Very Well", "Exceptional"],
            datasets: [{
                label: 'Sufficiency Rating',
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

    var whereTheyWork = document.getElementById("whereTheyWork");
    self.whereTheyWork = new Chart(whereTheyWork, {
        type: 'radar',
        data: {
            labels: ["Home", "Office Desk", "Elsewhere in Office", "Coffee Shop", "On-site with Client", "Other"],
            datasets: [{
                label: 'Where they Work',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });

    var fruitsOfSpace = document.getElementById("fruitsOfSpace");
    self.fruitsOfSpace = new Chart(fruitsOfSpace, {
        type: 'radar',
        data: {
            labels: ["Postive Culture", "Employee Wellbeing", "Worker Productivity", "Engagment among coworkers"],
            datasets: [{
                label: 'Influence Level',
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });

    var satisfaction = document.getElementById("satisfaction");
    self.satisfaction = new Chart(satisfaction, {
        type: 'bar',
        data: {
            labels: ["Not Applicable", "Poorly", "Satisfactory", "Very Well", "Exceptional"],
            datasets: [{
                label: 'Satisfaction',
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



}); //end service    