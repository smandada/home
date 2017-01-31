angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/home.html',
    controller: 'MainController',
    controllerAs: 'main'
	});
  $routeProvider.when('/login', {
    templateUrl: 'app/views/pages/login.html'
  }); 
  $routeProvider.when('/signup', {
    templateUrl: 'app/views/pages/signup.html'
  });
  $routeProvider.when('/allIdeas', {
    templateUrl: 'app/views/pages/allIdeas.html',
    controller: 'AllIdeasController',
    controllerAs: 'ideasCtrl',
    resolve: {
      ideas: function(Idea){
        return Idea.allIdeas();
      }
    }
  });
  
  $locationProvider.html5Mode(true);
})

// angular.module('appRoutes', ['ui.router'])
// .config(function($stateProvider, $locationProvider) {

//   $stateProvider.state({
//     name: 'home',
//     url: '/',
//     templateUrl: 'app/views/pages/home.html'
//   });

//   $stateProvider.state({
//     name: 'login',
//     url: '/login',
//     templateUrl: 'app/views/pages/login.html'
//   });

//   $stateProvider.state({
//     name: 'signup',
//     url: '/signup',
//     templateUrl: 'app/views/pages/signup.html'
//   });

//   $locationProvider.html5Mode(true);
// })