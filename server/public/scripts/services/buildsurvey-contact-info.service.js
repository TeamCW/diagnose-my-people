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
        postion: ''
    };

    self.postNewSurveyAndClient = function (kpisAdded) {
        var clientID;
        var ts = Math.round((new Date()).getTime() / 1000).toString;

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
                point_of_contact: contactInfo.point_of_contact,
                contact_email: contactInfo.contact_email,
                organization: contactInfo.organization,
                survey_hash: surveyHash,
                contact_number: contactInfo.contact_number,
                position: contactInfo.position
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
                clientID = response
                postClientsKPIs()
            })
        }

        if (kpis_added.locationAdded) {
            $http({
                method: 'POST',
                url: '/kpi',
                params: {
                    kpi_id: 1,
                    client_id: clientID
                }
            }).then(function (response) {
                console.log('response', response)

            })
        }
        if (kpis_added.amenitiesAdded) {
            $http({
                method: 'POST',
                url: '/kpi',
                params: {
                    kpi_id: 2,
                    client_id: clientID
                }
            }).then(function (response) {
                console.log('response', response)

            })
        }
        if (kpis_added.brandAdded) {
            $http({
                method: 'POST',
                url: '/kpi',
                params: {
                    kpi_id: 3,
                    client_id: clientID
                }
            }).then(function (response) {
                console.log('response', response)

            })
        }
        if (kpis_added.retainmentAdded) {
            $http({
                method: 'POST',
                url: '/kpi',
                params: {
                    kpi_id: 4,
                    client_id: clientID
                }
            }).then(function (response) {
                console.log('response', response)

            })
        }
        if (kpis_added.spaceLayoutAdded) {
            $http({
                method: 'POST',
                url: '/kpi',
                params: {
                    kpi_id: 5,
                    client_id: clientID
                }
            }).then(function (response) {
                console.log('response', response)

            })
        }
    };//end self.postNewSurveyAndClient method
});