(function(){
'use strict';

/* Factory */

angular.module('authentificationModule')
      .factory('AuthInterceptor', AuthInterceptor)
      .config(["$httpProvider" , function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
      }]);

AuthInterceptor.$inject = ["$q", "$rootScope", "AUTH_EVENTS"];

function AuthInterceptor ($q, $rootScope, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({ 401: AUTH_EVENTS.notAuthenticated, }[response.status], response);
      return $q.reject(response);
    }
  };
}

})();
