(function () {
'use strict';

  angular.module('clientModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.
            when('/Clients', {
              templateUrl: './components/client/clients.html',
              controller: 'clientCtrl',
              controllerAs: 'clientVm'
            })

         }]);

}());
