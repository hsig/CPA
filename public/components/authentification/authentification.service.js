(function(){
'use strict';

/* Service */

angular.module('authentificationModule')
       .service('AuthService', AuthService);

AuthService.$inject = ["$q", "$http", "API_ENDPOINT"];

function AuthService ($q, $http, API_ENDPOINT) {

    var LOCAL_TOKEN_KEY = 'AwsomeCPA';
    var isAuthenticated = false;
    var authToken;
    var memberinfo;
    var allUsers;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/signup', user)
          .then(function(result) {
              if (result.data.success) {
                resolve(result.data.msg);
              } else {
                reject(result.data.msg);
              }
          });
      });
    };
    //console.log("toto")
    var getUser = function () {
        return $http.get(API_ENDPOINT.url + '/memberinfo')
                  .then(getInfoComplete)
                  .catch(getInfoFailed);

        function getInfoComplete(response){
          memberinfo = response.data.msg;
          return response.data;
        };

        function getInfoFailed(error){
          console.log("XHR Failed for getClients")
        };
    };

    var getUsers = function () {
        return $http.get(API_ENDPOINT.url + '/users')
                  .then(getInfoComplete)
                  .catch(getInfoFailed);

        function getInfoComplete(response){
          allUsers = response.data.msg;
          return response.data.msg;
        };

        function getInfoFailed(error){
          console.log("XHR Failed for getUsers")
        };
    };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/authenticate', user)
             .then(function(result) {
                if (result.data.success) {
                  //sessionService.create(result.data.id,result.data.user._id,result.data.user.role)
                  memberinfo = result.data.user.name;
                  storeUserCredentials(result.data.token);
                  resolve(result.data.user);
                } else {
                  reject(result.data.msg);
                }
              });
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };


    loadUserCredentials();
    if(isAuthenticated) getUsers();

    return {
        login     : login,
        register  : register,
        logout    : logout,
        getUser   : getUser,
        getUsers  : getUsers,
        users     : function() { return allUsers},
        connect   : function() { return memberinfo},
        isAuthenticated: function() { return isAuthenticated;},
      };
}

})();
