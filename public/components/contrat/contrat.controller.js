(function() {
'use strict';
/* Controllers */
angular.module('contratModule')
       .controller('contratCtrl', contratCtrl);

contratCtrl.$inject = ["$rootScope", "$uibModal", "contratService", "clientService", "voitureService", "contratPdfService"];

function contratCtrl ($rootScope, $uibModal, contratService, clientService, voitureService, contratPdfService){

  var contratVm  = this;
  contratVm.refresh            = refreshContrat();
  contratVm.openContratModal   = openContratModal;
  contratVm.editContrat        = editContrat;
  contratVm.deleteContrat      = deleteContrat;
  contratVm.showContent        = showContent;
  contratVm.gestionDate        = gestionDate;
  contratVm.getVoitureByImma   = getVoitureByImma;

  function refreshContrat () {
    contratService
      .getContrats()
      .then(function(data){
          gestionDate(data, 1);
          contratVm.contratsArray = data;
          contratVm.clicked = false;
    });
  };

  function editContrat(id){
     contratService
      .editContrat(id)
      .then(function (data){
        contratVm.clicked = true;
        openContratModal(data);
    });
  };

  function deleteContrat (contrat){

    contratService
      .deleteContrat(contrat._id)
      .then(function(){
        voitureService
          .getVoitures()
          .then(function (data){
              contrat.voiture  = getVoitureByImma(data, contrat.voitureImm);
              if (contrat.voiture){
                  contrat.voiture.used = false;
                  voitureService
                    .updateVoiture(contrat.voiture._id, contrat.voiture)
                    .then(function (data){
                        refreshContrat();
                    });
              }
          });
      });
  };

  function showContent (contrat){
      contratPdfService.showContent(contrat);
  };

  function getVoitureByImma (voituresArray , Immatriculation ){
      for(var item in voituresArray){
        if(voituresArray[item].immatriculation != null){
          if(voituresArray[item].immatriculation == Immatriculation ){
            return voituresArray[item];
          }
        }
      }
  };

  function gestionDate (ContratsArray, id){
     contratService.gestionDate(ContratsArray, id);
  };

  //Contrat Dialog
  function openContratModal (contrat){
    var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: './components/contrat/dlg/contrat.dlg.tmpl.html',
        controller: 'contratDlgCtrl',
        controllerAs : 'vm',
        resolve : {
          contratBean : function (){
              return contrat;
            }
        }
      });

      modalInstance.result.then(modalSuccess)
                          .catch(modalFailed);

      function modalSuccess(response){
        if (response == "ko"){
          contratVm.clicked = false;
        }else{
          refreshContrat();
        }
      };

      function modalFailed(error){
        contratVm.clicked = false;
      };

  };

};

})();
