(function () {
'use strict';

  angular.module('homeModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.
            when('/', {
              templateUrl: './components/home/home.html',
              controller: 'homeCtrl',
              controllerAs: 'homeVm'
            })

         }]);

}());
