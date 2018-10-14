(function(){
'use strict';

angular.module('voitureModule')
       .controller('voitureCtrl', voitureCtrl);

voitureCtrl.$inject = ["$rootScope","voitureService","$uibModal"];

function voitureCtrl ($rootScope, voitureService, $uibModal){

  var voitureVm  = this;

  voitureVm.clicked       = false;
  voitureVm.refresh       = refresh();
  voitureVm.deleteVoiture = deleteVoiture;
  voitureVm.editVoiture   = editVoiture;
  voitureVm.cancelEdit    = cancelEdit;
  voitureVm.openVoitureModal  = openVoitureModal;

  function refresh (){
     //$rootScope.progressbar.start();
     voitureService
      .getVoitures()
      .then(function(data){
        //$rootScope.progressbar.complete();
        voitureVm.voituresArray = data;
        voitureVm.voiture = "";
        voitureVm.clicked = false;
      });
  };

  function deleteVoiture (id){
     voitureService
      .deleteVoiture(id)
      .then(function(){
        refresh();
      });
  };

  function editVoiture(id){
     voitureService
      .editVoiture(id)
      .then(function(response){
        voitureVm.clicked = true;
        openVoitureModal(response);
      });
  };

  function cancelEdit (){
    voitureVm.clicked = false;
    voitureVm.voiture = "";
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
          voitureVm.clicked = false;
        }else{
          refresh();
        }
      };

      function modalFailed(error){
        voitureVm.clicked = false;
      };
  };

};

})();
