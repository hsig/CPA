(function(){
'use strict';

angular.module("contratModule")
       .controller("contratDlgCtrl", contratDlgCtrl);

contratDlgCtrl.$inject  = ["$uibModal", "$uibModalInstance", "uibDateParser", "$location", "contratService","clientService","voitureService", "contratBean"];

function contratDlgCtrl ($uibModal, $uibModalInstance, uibDateParser, $location, contratService, clientService, voitureService, contratBean) {

   var vm  = this;

   vm.header        = contratBean != undefined ? "Editer contrat" : "Nouveau contrat";
   vm.clicked       = contratBean != undefined ? true : false;

   vm.format        = 'yyyy-MM-dd';
   vm.options       = { showWeeks: true };
   vm.openedA       = false;
   vm.openedB       = false;

   vm.ModelType          = [{ name :'Contrat', value: 'contrat' }, { name :'Réservation', value: 'reservation' }];
   vm.initBean           = initBean();
   vm.getListVoitures    = getListVoitures();
   vm.getListClients     = getListClients();
   vm.addContrat         = addContrat;
   vm.updateContrat      = updateContrat;
   vm.getVoitureByImma   = getVoitureByImma;
   vm.cancel             = cancel;
   vm.cancelEdit         = cancelEdit;
   vm.gestionDate        = gestionDate;
   vm.gestionEtat        = gestionEtat;
   vm.changeLocation     = changeLocation;
   vm.openA              = openA;
   vm.openB              = openB;

   var oldCar;

   function initBean (){
     if (contratBean != undefined ){
       gestionDate(contratBean, 5);
       console.log(contratBean)
       vm.contrat  = contratBean;
       voitureService
         .getVoitures()
         .then(function (data){
             vm.contrat.voiture = getVoitureByImma(data, vm.contrat.voitureImm);
             oldCar = vm.contrat.voiture;
             vm.voituresArray.push(vm.contrat.voiture);
        });

     }else{
       vm.contrat  = "";
     }
   }

   function getListClients (){
     clientService
       .getClients()
       .then(function(data){
          vm.clientsArray = data;
     });
   }

   function getListVoitures(){
     voitureService
       .getVoituresByStatus("non disponible")
       .then(function(data){
          vm.voituresArray = data;
     });
   }

   function addContrat (contrat){

     switch(gestionEtat(contrat, 1)) {
       case 1:
         vm.failureMessage="Les conducteurs doivent être différent";
         return;
       default:
         vm.failureMessage="";
     };

     switch(gestionDate(contrat, 4)) {
       case 1:
         vm.failureMessage="La date de de début de contrat ne peut pas être dans le passé";
         return;
       case 2:
         vm.failureMessage="La date de de début de contrat ne peut pas être inférieure à la date de fin du contrat";
         return;
       default:
         vm.failureMessage="";
     };
     if (contrat.voiture){
         contrat.clientNom    = contrat.client.nom;
         if (contrat.clientSup){
           contrat.clientNomSup    = contrat.clientSup.nom;
         }
         contrat.voitureImm   = contrat.voiture.immatriculation;
         contrat.voiture.used = true;
         contratService
          .addContrat(contrat)
          .then(function (){
              voitureService
                .updateVoiture(contrat.voiture._id, contrat.voiture)
                .then(function(){
                  $uibModalInstance.close();
                });
          });
     };

   };

   function updateContrat (contrat){
     switch(gestionDate(contrat, 4)) {
       case 1:
         vm.failureMessage = "La date de de début de contrat ne peut pas être dans le passé";
         return;
         break;
       case 2:
         vm.failureMessage = "La date de de début de contrat ne peut pas être inférieure à la date de fin du contrat";
         return;
         break;
       default:
         vm.failureMessage = "";
     };

     var newCar = contrat.voiture;
     //New Car
     if (newCar){
       newCar.used = true;
       voitureService.updateVoiture(newCar._id, newCar);
     };
     //Old Car
     if (oldCar){
         oldCar.used = false;
         voitureService.updateVoiture(oldCar._id, oldCar);
      };

     contrat.voitureImm = contrat.voiture.immatriculation;
     contratService
      .updateContrat(contrat._id, contrat)
      .then(function(){
          $uibModalInstance.close();
      });

   };

   function cancelEdit (){
     vm.clicked = false;
     vm.contrat = "";
     vm.header = "Nouveau contrat";
   };

   function cancel (){
     $uibModalInstance.close("ko");
   };

   function gestionDate (ContratsArray, id){
      return contratService.gestionDate(ContratsArray, id);
   };

   function gestionEtat (ContratsArray, id){
      return contratService.gestionEtat(ContratsArray, id);
   };

   function changeLocation (id) {
     if (id == 1){
       openClientModal();
     }else if (id == 2){
       openVoitureModal();
     }

   };

   function getVoitureByImma (voituresArray , Immatriculation){
       for(var item in voituresArray){
         if(voituresArray[item].immatriculation != null){
           if(voituresArray[item].immatriculation == Immatriculation ){
             return voituresArray[item];
           }
         }
       }
   };

   function openA () {
     vm.openedA = true;
   };

   function openB () {
     vm.openedB = true;
   };

   function openClientModal (client){
     var modalInstance = $uibModal.open({
         animation: true,
         ariaLabelledBy: 'modal-title',
         ariaDescribedBy: 'modal-body',
         templateUrl: './components/client/dlg/client.dlg.tmpl.html',
         controller: 'clientDlgCtrl',
         controllerAs : 'vm',
         resolve : {
           clientBean : function (){
               return client;
             }
         }
       });

       modalInstance.result.then(modalSuccess)
                           .catch(modalFailed);
       function modalSuccess(response){
         if (response == "ko"){
           vm.clicked = false;
         }else{
           getListClients();
         }
       };

       function modalFailed(error){
         vm.clicked = false;
       };
   };

   function openVoitureModal (voiture){

     var modalInstance = $uibModal.open({
         animation: true,
         ariaLabelledBy: 'modal-title',
         ariaDescribedBy: 'modal-body',
         templateUrl: './components/voiture/dlg/voiture.dlg.tmpl.html',
         controller: 'voitureDlgCtrl',
         controllerAs : 'vm',
         resolve : {
           voiturebean : function (){
               return voiture;
             }
         }
       });

       modalInstance.result.then(modalSuccess)
                           .catch(modalFailed);
       function modalSuccess(response){
         if (response == "ko"){
           vm.clicked = false;
         }else{
           getListVoitures();
         }
       };

       function modalFailed(error){
          vm.clicked = false;
       };
   };

};

})();
