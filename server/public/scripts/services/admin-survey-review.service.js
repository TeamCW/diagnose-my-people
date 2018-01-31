myApp.service('AdminSurveyReviewService', ['$http', '$location', function ($http, $location, AdminSurveyReviewService) {

    var self = this;
    self.client = { survey: {} };
    self.categories = { list: [] };
    self.notSelectedArray = { list: [] };

    //GET selected KPIs for each client and display them in their own view using $routeparams
    self.getClientSurvey = function (clientId) {
        $http({
            method: 'GET',
            url: '/admin-survey-review/',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.client.survey = response.data;
            console.log('client survey response:', self.client.survey);
        });
    };

    //GET list of KPIs not currently selected in client survey
    self.getNotSelected = function (clientId) {
        $http({
            method: 'GET',
            url: '/admin-survey-review/not-selected',
            params: {
                clientId: clientId
            }
        }).then(function (response) {
            self.notSelectedArray.list = response.data;
            console.log('not selected response:', self.notSelectedArray.list);
        });
    };


    //Edit or add a blurb to selected KPI on client's survey
    self.editBlurb = function (blurbToEdit, clientId) {
        console.log(blurbToEdit);

        $http({
            method: 'PUT',
            url: '/admin-survey-review/',
            data: blurbToEdit,
        }).then(function (response) {
            console.log('response', response);
            self.getClientSurvey(clientId);
        });
    }

    //add a KPI category to client survey
    self.addClientCategory = function (newCategory, clientId) {
        console.log('newCategory', newCategory);
        // swal({
        //     text: "Category added!",
        //     icon: "success",
        // });
        $http({
            method: 'POST',
            url: '/admin-survey-review/',
            data: {
                newCategory, clientId
            }
        }).then(function (response) {
            self.getClientSurvey(clientId);
            self.getNotSelected(clientId);
        });
    }

    //remove a category from a client's survey
    self.removeCategory = function (categoryToDelete, clientId) {
        swal({
            title: "Are you sure?",
            text: "This category will be removed from the survey",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Category removed!", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/admin-survey-review/' + categoryToDelete.id,
                    }).then(function (response) {
                        self.getClientSurvey(clientId);
                        self.getNotSelected(clientId);
                    });
                } else {
                    swal("File not deleted");
                }
            });
    };




}]);

