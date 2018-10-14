(function(){
'use strict';

/* Controllers */
angular.module("factureModule")
       .controller("factureCtrl", factureCtrl);

factureCtrl.$inject = ["$rootScope", "$uibModal", "factureService","facturePdfService","uibDateParser"]

function factureCtrl ($rootScope, $uibModal, factureService, facturePdfService, uibDateParser){

  var factureVm  = this;

  factureVm.refresh       = refresh();
  factureVm.deleteFacture = deleteFacture;
  factureVm.editFacture   = editFacture;
  factureVm.updateFacture = updateFacture;
  factureVm.showContent   = showContent;
  factureVm.openAjoutFactureModal   = openAjoutFactureModal;

  function refresh (){
      $rootScope.progressbar.start();
      factureService
        .getFactures()
        .then(function(data){
          $rootScope.progressbar.complete();
          factureVm.facturesArray = data;
      });
  };

  function deleteFacture (id){
    factureService
      .deleteFacture(id)
      .then(function () {
        refresh();
    });
  };

  function editFacture(id){
    /*return factureService.editFacture(id).then(function(response){
      factureVm.facture = response;
    });*/
  };

  function updateFacture (){
    //return factureService.updateFacture(factureVm.facture._id, factureVm.facture).then(refresh());
  };

  function showContent (facture){
    facturePdfService.showContent(facture);
  };

  function openAjoutFactureModal (facture){

    var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: './components/facture/dlg/facture.dlg.tmpl.html',
        controller: 'factureDlgCtrl',
        controllerAs : 'vm',
        size : 'lg',
        resolve : {
          factureBean : function (){
              return facture;
            }
        }
      });

      modalInstance.result.then(modalSuccess)
                          .catch(modalFailed);
      function modalSuccess(response){
        if (response == "ko"){
          //factureVm.clicked = false;
        }else{
          refresh();
        }
      };

      function modalFailed(error){
        //contratVm.clicked = false;
      };

  };

};

})();
