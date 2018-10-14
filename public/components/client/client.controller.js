(function() {
'use strict';

angular.module("clientModule")
       .controller("clientCtrl", clientCtrl);

clientCtrl.$inject = ["$rootScope","clientService","$uibModal"];

function clientCtrl ($rootScope,clientService, $uibModal){

    var clientVm  = this;
    clientVm.refreshClient      = refreshClient();
    clientVm.editClient         = editClient;
    clientVm.deleteClient       = deleteClient;
    clientVm.gestionDate        = gestionDate;
    clientVm.openClientModal    = openClientModal;

    function refreshClient (){
       //$rootScope.progressbar.start();
       clientService
       .getClients()
       .then(function(data){
          //$rootScope.progressbar.complete();
          gestionDate(data,1);
          clientVm.clientsArray = data;
          clientVm.clicked = false;
      });
    };

    function editClient(id){
      clientService
      .editClient(id)
      .then(function(data){
          clientVm.clicked = true;
          openClientModal(data);
      });
    };

    function deleteClient (id){
      clientService
      .deleteClient(id)
      .then(function (){
          refreshClient()
      });
    };

    function gestionDate (ClientsArray, id){
       clientService.gestionDate(ClientsArray, id);
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
            clientVm.clicked = false;
          }else{
            refreshClient();
          }
        };

        function modalFailed(error){
          clientVm.clicked = false;
        };

    };

  };

})();
