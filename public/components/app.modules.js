(function () {
'use strict';

angular.module('CPAApp', ['ngRoute',
                          'ngMaterial',
                          'ngAnimate',
                          'ui.bootstrap',
                          'ngProgress',
                          'authentificationModule',
                          'homeModule',
                          'contratModule',
                          'clientModule',
                          'voitureModule',
                          'factureModule',
                          'administrationModule'])

        .config(["$routeProvider", function($routeProvider) {
            $routeProvider.otherwise({ redirectTo: '/' });
        }])
        .run(["$rootScope","$location","AuthService","ngProgressFactory","AUTH_EVENTS","NAV_MENU",
        function ($rootScope,$location,AuthService,ngProgressFactory,AUTH_EVENTS,NAV_MENU) {

            $rootScope.progressbar = ngProgressFactory.createInstance();

            $rootScope.$on('$routeChangeStart', function () {
                // redirect to login page if not logged in and trying to access a restricted page
                var arr = ['/Login', '/register'];
                var restrictedPage = arr.indexOf($location.path()) === -1;
                var loggedIn = AuthService.isAuthenticated();

                if (restrictedPage && !loggedIn) {
                  $rootScope.isActif = false;
                  $location.path('/Login');
                }else if (loggedIn){
                  $rootScope.isActif = true;
                }
            });

            // Active Effect on TabChange
            $rootScope.$on("$routeChangeSuccess", function () {
                $.each(NAV_MENU, function(index, value) {
                    if(value.path == $location.path()){
                      value.actif = "active";
                    }else{
                      value.actif = "";
                    }
                });
            });

            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
                AuthService.logout();
                $location.path('/Login');
            });
        }]);
}());
