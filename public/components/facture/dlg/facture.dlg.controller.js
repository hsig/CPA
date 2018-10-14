(function(){
'use strict';

angular.module("factureModule")
       .controller("factureDlgCtrl", factureDlgCtrl);

factureDlgCtrl.$inject  = ["$uibModal", "$uibModalInstance", "uibDateParser","factureService", "clientService", "$location", "factureBean"];

function factureDlgCtrl ($uibModal, $uibModalInstance, uibDateParser,factureService, clientService, $location, factureBean) {

   var vm  = this;

   vm.header        = factureBean != undefined ? "Editer facture" : "Nouvelle Facture";
   vm.clicked       = factureBean != undefined ? true : false;
   vm.count         = 1;
   vm.format        = 'yyyy-MM-dd';
   vm.options       = { showWeeks: true };
   vm.openedA       = false;
   vm.openedB       = false;

   vm.article = [{
     designation: '',
     quantite: '',
     prix: '',
     tva: '',
     montant: ''
   }];

   vm.getAllId        = getAllId();
   vm.getListClients  = getListClients();
   vm.addFacture      = addFacture;
   vm.checkLastId     = checkLastId;
   vm.addArticle      = addArticle;
   vm.deleteArticle   = deleteArticle;
   vm.articleSum      = articleSum;
   vm.factureAmount   = factureAmount;
   vm.cancel          = cancel;
   vm.cancelEdit      = cancelEdit;
   vm.changeLocation  = changeLocation;
   vm.openA           = openA;
   vm.openB           = openB;


   if (factureBean != undefined ){

   }else{
      vm.facture  = "";
   }

   function getAllId (){
       factureService
         .getFactures()
         .then(function(data){
            checkLastId(data);
       });
   };

   function getListClients (){
     clientService
       .getClients()
       .then(function(data){
          vm.clientsArray = data;
     });
   };

   function addFacture (facture){
     vm.facture.article = facture.article;
     vm.facture.amount  = facture.amount;

     factureService
      .addFacture(vm.facture)
      .then(function(){
         $uibModalInstance.close();
     });
   };

   function addArticle (){
     vm.article.push({
       designation: '',
       quantite: '',
       prix: '',
       tva:'',
       montant:''
     });
     vm.count++;
   };

   function articleSum (array, index){
     if(array.prix && array.quantite && array.tva){
       vm.article[index].montant = ((array.prix * array.quantite) + (( array.prix * array.quantite) * array.tva)/100).toFixed(2);
       factureAmount();
     }else{
       vm.article[index].montant = 0;
     }
   };

   function factureAmount (){
     vm.amount = 0;
     for (var i=0;i< vm.article.length; i++){
       vm.amount =+ vm.article[i].montant;
     }
   };

   function deleteArticle (article){
     var index = vm.article.indexOf(article);
     if (index > -1) {
       vm.article.splice(index, 1);
       vm.count--;
     };
   };

   function cancel (){
     $uibModalInstance.close("ko");
   };

   function changeLocation (id) {
     if (id == 1){
       openClientModal();
     }else if (id == 2){
       //openVoitureModal();
     }

   };

   function cancelEdit (){
      vm.clicked = false;
      vm.facture = "";
      vm.article = [{
        designation: '',
        quantite: '',
        prix: '',
        tva: '',
        montant: ''
      }];
      vm.amount = 0;
      vm.header = "Nouvelle facture";
   };

   function checkLastId(array){
       var tab = [];
       for (var i=0; i< array.length; i++){
         tab.push(array[i].num_facture);
       }
       return vm.largest = Math.max.apply(Math, tab);
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

};

})();
