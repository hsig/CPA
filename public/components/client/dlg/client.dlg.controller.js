(function(){
'use strict';

angular.module("clientModule")
       .controller("clientDlgCtrl", clientDlgCtrl);

clientDlgCtrl.$inject  = ["$uibModal", "$uibModalInstance", "uibDateParser", "clientService", "clientBean", "NATIONALITY", "PRENOM"];

function clientDlgCtrl ($uibModal, $uibModalInstance, uibDateParser, clientService, clientBean, NATIONALITY, PRENOM) {

   var vm  = this;
   vm.header        = clientBean != undefined ? "Editer client" : "Nouveau client";
   vm.clicked       = clientBean != undefined ? true : false;
   vm.nationnalite  = NATIONALITY.names;
   vm.names         = PRENOM.names;

   vm.format        = 'yyyy-MM-dd';
   vm.options       = { showWeeks: true };
   vm.openedA       = false;
   vm.openedB       = false;

   vm.addClient     = addClient;
   vm.updateClient  = updateClient;
   vm.cancel        = cancel;
   vm.cancelEdit    = cancelEdit;
   vm.gestionDate   = gestionDate;
   vm.openA         = openA;
   vm.openB         = openB;

   if (clientBean != undefined ){
     gestionDate(clientBean, 4);
     vm.client  = clientBean ;
   }else{
     vm.client  = "";
   }

   function addClient (data){
     clientService
       .addClient(data)
       .then(function (){
         $uibModalInstance.close();
       });
   };

   function updateClient (data){
      clientService
        .updateClient(data._id, data)
        .then(function (){
          $uibModalInstance.close();
     });
   };

   function cancelEdit (){
     vm.clicked = false;
     vm.client = "";
     vm.header = "Nouveau client";
   };

   function cancel (){
     $uibModalInstance.close("ko");
   };

   function gestionDate (ClientsArray, id){
      clientService.gestionDate(ClientsArray, id);
   };

   function openA () {
     vm.openedA = true;
   };
   function openB () {
     vm.openedB = true;
   };

};

})();
