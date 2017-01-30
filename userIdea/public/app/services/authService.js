angular.module('authService', [])
.factory('Auth', function($http, $q, AuthToken){
	var authFactory = {};
	
	authFactory.login = function(username, password) {
		return $http({
			url: '/api/login',
			method: 'POST',
			data: {
				username: username,
				password: password
			}
		}).then(function(resp){
			AuthToken.setToken(resp.data.token);
			return resp;
		}, function(err){
			console.log(err);
		});
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
	var authTokenFactory = {};
	
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};
	
	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};
	
	return authTokenFactory;
})

.factory('AuthInterceptor', function(AuthToken, $location, $q){
	var interceptorFactory = {};

	interceptorFactory.request = function(config) {
		var token = AuthToken.getToken();
		if(token)
			config.headers['x-access-token'] = token;
		return config;

	};

	interceptorFactory.responseError = function(reponse){
		if(response.status == 403)
			$location.path = '/login';
		return $q.reject(response);
	};

	return interceptorFactory;
})