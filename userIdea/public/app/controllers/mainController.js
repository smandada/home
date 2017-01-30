angular.module('mainCtrl', [])
.controller('MainController', function($rootScope, $location, Auth){

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	//on every route change check if the user is logged in
  $rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		Auth.getUser().then(function(user){
			vm.user = user.data;
		}, function(err) {
      // $location.path('/login');
    });
	});

  vm.doLogin = function(){
  	vm.processing = true;
  	vm.error = '';

    Auth.login(vm.loginData.username, vm.loginData.password).then(function(data){
      //console.log('login',data, $location.path());
      vm.processing = false;

      //setup the user object
      Auth.getUser().then(function(user){
        //console.log(user);
        vm.user = user.data;
        console.log(vm.user);
      });

     if (data.data.success)
        $location.path('/');
      else
        vm.error = data.message;
    });
  };

  vm.doLogout = function() {
    Auth.logout();
    vm.loggedIn = Auth.isLoggedIn();
    $location.path('/login');
  };
})