angular.module('userCtrl', ['userService'])

.controller('UserController', function(User){
	var vm = this;

	User.all().then(function(data){
		vm.user = data;
	})

})

.controller('UserCreateController', function(User, $state, $window){
	var vm = this;

  vm.signup = function() {
    vm.message = '';
    
    User.create(vm.userData).then(function(resp){
      vm.userData = {};
      vm.message = resp.data.message;
      $window.localStorage.setItem('token', resp.data.token);
      $state.go('home');
    });
  };

});