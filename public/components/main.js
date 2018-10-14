(function() {
'use strict';

/* Controllers */

angular.module('CPAApp')
       .controller('main',main);

main.$inject = ["$rootScope","$location","AuthService","NAV_MENU"];

function main ($rootScope,$location,AuthService,NAV_MENU) {

    var vm = this;
    vm.menuArray  = NAV_MENU;
    vm.getInfo    = getInfo();
    vm.logout     = logout;

    function getInfo(){
      if(AuthService.isAuthenticated()){
        AuthService.getUser().then(function(data){
          $rootScope.memberinfo = data.msg;
      });
      }
    };

    function logout() {
      $rootScope.isActif = false;
      AuthService.logout();
      $location.path('/Login');
    };

};

})();
