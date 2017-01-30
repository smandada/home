angular.module('ideaService', [])
.factory('Idea', function($http){
	var ideaFactory = {};

	ideaFactory.create = function(ideaData){
		return $http.post('/api', ideaData);
	};

	ideaFactory.allIdeas=function(){
    return $http.get('/api');
	};
  return ideaFactory;
});