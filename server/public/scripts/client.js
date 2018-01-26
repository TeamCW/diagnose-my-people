var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'LoginController as lc',
  })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/admin.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    // Begin survey views
    .when('/survey', {
      templateUrl: '/views/templates/survey.html',
      controller: 'SurveyController as sc'
    })
    .when('/buildsurvey', {
      templateUrl: '/views/templates/buildsurvey.html',
      controller: 'BuildSurveyController as sc'
    })
    .when('/location', {
      templateUrl: '/views/templates/location.html',
      controller: 'SurveyController as sc'
    })
    .when('/amenities', {
      templateUrl: '/views/templates/amenities.html',
      controller: 'SurveyController as sc'
    })
    .when('/brand', {
      templateUrl: '/views/templates/brand.html',
      controller: 'SurveyController as sc'
    })
    .when('/retention', {
      templateUrl: '/views/templates/retention.html',
      controller: 'SurveyController as sc'
    })
    // End survey views
    .when('/dashboard', {
      templateUrl: '/views/templates/dashboard.html',
      controller: 'DashboardController as dc'
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});