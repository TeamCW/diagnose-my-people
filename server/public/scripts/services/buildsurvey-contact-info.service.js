myApp.service('BuildSurveyContactInfoService', function ($http, $location) {
    console.log('BuildSurveyContactInfoService Loaded');
    var self = this;


    // CREATE TABLE "client" (
    // 	"id" serial NOT NULL,
    // 	"point_of_contact" varchar NOT NULL,
    // 	"contact_email" varchar NOT NULL,
    // 	"organization" varchar,
    // 	"survey_hash" varchar UNIQUE,
    // 	"contact_number" varchar,
    // 	"position" varchar,
    // 	"status" varchar NOT NULL DEFAULT 'New Client',
    // 	CONSTRAINT client_pk PRIMARY KEY ("id")
    // ) WITH (
    //   OIDS=FALSE
    // );

    self.contactInformation = {
        point_of_contact: '',
        contact_email: '',
        organization: '',
        contact_number: '',
        postion: '',
        comments: '',
        logoURL: ''
    };

    self.postNewSurveyAndClient = function (kpisAdded, contactInformation) {
        console.log('in postNewSurveyAndClient')
        var clientID;
        var ts = Math.round((new Date()).getTime() / 1000);

        var makeid = function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        console.log(makeid());

        var surveyHash = ts + makeid();

        //post client information
        $http({
            method: 'POST',
            url: '/buildsurvey/clientinfo',
            data: {
                point_of_contact: contactInformation.point_of_contact,
                contact_email: contactInformation.contact_email,
                organization: contactInformation.organization,
                survey_hash: surveyHash,
                contact_number: contactInformation.contact_number,
                position: contactInformation.position
            }
        }).then(function (response) {
            console.log('response', response)
            getClientsID()
        })
        //get the clients id
        var getClientsID = function () {
            $http({
                method: 'GET',
                url: '/buildsurvey/clientid',
                params: {
                    survey_hash: surveyHash
                }
            }).then(function (response) {
                console.log('response', response)
                clientID = response.data[response.data.length - 1].id
                postClientsKPIs()

            })
        }
        var postClientsKPIs = function () {
            console.log('in post client kpi');
            console.log(kpisAdded);
            if (kpisAdded.locationAdded) {
                console.log('in if')
                $http({
                    method: 'POST',
                    url: '/buildsurvey/kpi',
                    data: {
                        kpi_id: '1',
                        client_id: clientID
                    }
                }).then(function (response) {
                    console.log('response', response)

                })
            }
            if (kpisAdded.amenitiesAdded) {
                $http({
                    method: 'POST',
                    url: '/buildsurvey/kpi',
                    data: {
                        kpi_id: '2',
                        client_id: clientID
                    }
                }).then(function (response) {
                    console.log('response', response)

                })
            }
            if (kpisAdded.brandAdded) {
                $http({
                    method: 'POST',
                    url: '/buildsurvey/kpi',
                    data: {
                        kpi_id: '3',
                        client_id: clientID
                    }
                }).then(function (response) {
                    console.log('response', response)

                })
            }
            if (kpisAdded.retainmentAdded) {
                $http({
                    method: 'POST',
                    url: '/buildsurvey/kpi',
                    data: {
                        kpi_id: '4',
                        client_id: clientID
                    }
                }).then(function (response) {
                    console.log('response', response)

                })
            }
            if (kpisAdded.spaceLayoutAdded) {
                $http({
                    method: 'POST',
                    url: '/buildsurvey/kpi',
                    data: {
                        kpi_id: '5',
                        client_id: clientID
                    }
                }).then(function (response) {
                    console.log('response', response)

                })
            }
            window.location.href = '#/build-survey-thank-you/' + contactInformation.point_of_contact
        }

    };//end self.postNewSurveyAndClient method
    


});

