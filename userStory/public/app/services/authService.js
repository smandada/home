angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken){
	var authFactory;
	authFactory.login = function(username, password) {
		return $http.('/api/login', {
			username: username,
			password: password
		})
		.success(function(resp){
			AuthToken.setToken(resp.setToken);
			return resp;
		})
		.error(function(err){
			console.log(err);
		})
	};
	authFactory.logout = function() {
		AuthToken.setToken();
	};
	authFactory.isLoggedIn = function() {
		if (AuthToken.getToken())
			return true;
		else
			return false;
	};
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/me');
		else
			return $q.reject('User has no token');
	};
	return authFactory;
})

.factory('AuthToken', function($window){
	var authTokenFactory;
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};
	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.remove('token');
	};
	return authTokenFactory;
});