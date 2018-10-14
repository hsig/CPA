(function () {
'use strict';

  angular.module('contratModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.
            when('/Contrats', {
              templateUrl: './components/contrat/contrats.html',
              controller: 'contratCtrl',
              controllerAs: 'contratVm'
            })

         }]);

}());
