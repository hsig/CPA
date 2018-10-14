(function () {
'use strict';

  angular.module('administrationModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.
            when('/Utilisateur', {
              templateUrl: './components/administration/administration.user.html',
              controller: 'administrationCtrl',
              controllerAs: 'administrationVm',
              resolve:{
                AllUsers : ["AuthService", function (AuthService) {
                  return AuthService.users;
                }]
              }
            })

         }]);

}());
