angular.module('mainCtrl', [])
.controller('MainController', function($rootScope, $state, Auth){

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();
  vm.userName = '';

	//on every route change check if the user is logged in
  $rootScope.$on('$routeChangeStart', function() {
		vm.isLoggedIn = Auth.isLoggedIn();

		Auth.getUser().then(function(user){
			vm.user = user.data;
		})
	});

  vm.doLogin = function(){
  	vm.processing = true;
  	vm.error = '';

    Auth.login(vm.loginData.username, vm.loginData.password).then(function(data){
      vm.processing = false;

      //setup the user object
      Auth.getUser().then(function(user){
        vm.user = user.data;
        vm.userName = vm.user.name;
      });

     if (data.data.success)
        $state.go('home');
      else
        vm.error = data.message;
    });
  };

  vm.doLogout = function() {
    Auth.logout();
    $state.go('login');
  };
})