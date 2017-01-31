angular.module('ideaService', [])

.factory('Idea', function($http){
	var ideaFactory = {};

	ideaFactory.create = function(ideaData){
		return $http.post('/api', ideaData);
	};

	ideaFactory.all=function(){
    return $http.get('/api');
	};
  
  ideaFactory.allIdeas=function(){
    return $http.get('/api/all_ideas');
  };

  return ideaFactory;
})

.factory('socketIO', function($rootScope){
	var socket = io.connect();

	return	{
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function(){
				var args = arguments;
				if (callback) {
					$rootScope.$apply(function(){
						callback.apply(socket, args);
					});
				}
			});
		}
	}

});