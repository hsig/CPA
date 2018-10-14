(function(){
'use strict';

/* Controllers */
angular.module('authentificationModule')
       .controller('authentificationCtrl', authentificationCtrl);

authentificationCtrl.$inject = ["$rootScope","$location","AuthService","AUTH_EVENTS"];

function authentificationCtrl ($rootScope,$location,AuthService,AUTH_EVENTS){

  var authentVm = this;

  authentVm.user  = { name: '', password: '' };
  authentVm.login = login;
  authentVm.isConnected = isConnected();

  function isConnected (){
    if(AuthService.isAuthenticated()){
        $location.path('/');
    }
  };

  function login () {
    AuthService.login(authentVm.user).then(function(user) {
          $rootScope.isActif = true;
          $rootScope.memberinfo = user.name;
          $location.path('/');
      }, function(errMsg) {
          alert("Erreur : " + errMsg);
      });
  };

};

})();
