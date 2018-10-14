(function(){
'use strict';

angular.module("voitureModule")
       .controller("voitureDlgCtrl", voitureDlgCtrl);

voitureDlgCtrl.$inject  = ["$uibModal", "$uibModalInstance", "voitureService", "voiturebean"];

function voitureDlgCtrl ($uibModal, $uibModalInstance, voitureService, voiturebean) {

   var vm  = this;
   vm.clicked       = voiturebean != undefined ? true : false;
   vm.header        = voiturebean != undefined ? "Editer Voiture" : "Nouvelle Voiture";
   vm.voiture       = voiturebean != undefined ? voiturebean : "" ;
   vm.failureMessage= "";
   vm.CarModel      = ['Mercedes', 'BMW', 'Nissan', 'Renault', 'Peugot', 'Jeep', 'LandRover', 'Toyota','Audi','Porshe','Hyundai'];
   vm.disponibility = [{ name :'Disponible', value: false }, { name :'Non Disponible', value: true }];
   vm.addVoiture    = addVoiture;
   vm.updateVoiture = updateVoiture;
   vm.cancel        = cancel;
   vm.cancelEdit    = cancelEdit;

   //console.log(vm.clicked)

   function addVoiture (data){
     voitureService
       .addVoiture(data)
       .then(function (response){
         if(response.status == "422")
            vm.failureMessage = response.data;
         else
            $uibModalInstance.close();
       });
   };

   function updateVoiture (data){
      voitureService
       .updateVoiture(data._id, data)
       .then(function(response){
         if(response.status == "422")
            vm.failureMessage = response.data;
         else
            $uibModalInstance.close();
       });
   };

   function cancelEdit (){
     vm.clicked = false;
     vm.voiture = "";
     vm.failureMessage = "";
     vm.header = "Nouvelle Voiture";
   };

   function cancel (){
     $uibModalInstance.close("ko");
   };

};

})();
