(function () {
'use strict';

  angular.module('factureModule', [])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.
            when('/Factures', {
              templateUrl: './components/facture/facture.index.list.html',
              controller: 'factureCtrl',
              controllerAs: 'factureVm'
            })

         }]);

}());
