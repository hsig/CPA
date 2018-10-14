(function () {
'use strict';

  angular.module('voitureModule', [])
         .config(["$routeProvider", function($routeProvider) {
           $routeProvider.when('/Voitures', {
             templateUrl: './components/voiture/voitures.html',
             controller: 'voitureCtrl',
             controllerAs: 'voitureVm'
           })

         }]);

}());
