(function () {
'use strict';

  angular.module('authentificationModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.when('/Login', {
              templateUrl: './components/authentification/authentification.login.html',
              controller: 'authentificationCtrl',
              controllerAs: 'authentVm'
            })

         }]);

}());
