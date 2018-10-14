(function () {
'use strict';

  angular.module('reservationModule', [])
         .config(["$routeProvider", function($routeProvider) {

          $routeProvider.
            when('/Reservations', {
              templateUrl: './components/reservation/reservation.html',
              controller: 'reservationCtrl',
              controllerAs: 'reservationVm',
              resolve:{
                user : ['AuthService', function (AuthService) {
                  return AuthService.connect
                }],
                users : ['AuthService', function (AuthService) {
                  return AuthService.users
                }],
              }
            })

         }]);

}());
