angular.module('myApp', [
  'appRoutes',
  'mainCtrl',
  'authService', 
  'userCtrl', 
  'userService', 
  'ideaCtrl', 
  'ideaService'
]).config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});