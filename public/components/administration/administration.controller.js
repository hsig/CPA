(function(){
'use strict';

/* Controllers */
angular.module('administrationModule')
       .controller('administrationCtrl', administrationCtrl);

administrationCtrl.$inject = ["AuthService","AllUsers"];

function administrationCtrl (AuthService,AllUsers){

  var administrationVm = this;

  administrationVm.clicked      = false;
  administrationVm.refresh      = refresh;
  administrationVm.register     = register;
  administrationVm.cancelEdit   = cancelEdit;
  administrationVm.userArray    = AllUsers();

  function register (){
    administrationVm.user.role = "guest";
    AuthService.register(administrationVm.user).then(function(){
        cancelEdit();
        refresh();
    });
  };

  function refresh(){
    AuthService.getUsers().then(function(data){
      administrationVm.userArray = data;
    })
  };

  function cancelEdit (){
    administrationVm.clicked = false;
    administrationVm.user = "";
  }

};
})();
