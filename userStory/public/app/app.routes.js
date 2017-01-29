// angular.module('appRoutes', ['ngRoute'])
// .config(function($routeProvider, $locationProvider) {
// 	$routePovider.when('/', {
// 		templateUrl: 'app/views/pages/home.html'
// 	});
// })

angular.module('appRoutes', ['ui.router'])
.config(function($stateProvider, $locationProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/',
    templateUrl: 'app/views/pages/home.html'
  });

  $stateProvider.state({
    name: 'login',
    url: '/login',
    templateUrl: 'app/views/pages/login.html'
  });

  $stateProvider.state({
    name: 'signup',
    url: '/signup',
    templateUrl: 'app/views/pages/signup.html'
  });

  $locationProvider.html5Mode(true);
})