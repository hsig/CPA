(function() {
  'use strict';

  angular.module('factureModule')
         .factory('factureService', factureService);

factureService.$inject = ['$http'];

function factureService ($http){

  var service = {

    getFactures    : getFactures,
    addFacture     : addFacture,
    deleteFacture  : deleteFacture,
    editFacture    : editFacture,
    updateFacture  : updateFacture

  };

  return service;

  function getFactures(){
    return $http.get('/factures').then(getFactureComplete)
                                 .catch(getFactureFailed);

    function getFactureComplete(response){
      return response.data;
    };

    function getFactureFailed(error){
      console.log("XHR Failed for getFactures")
    };
  };

  function addFacture(Facture){
    return $http.post('/factures', Facture).then(addFactureComplete)
                                           .catch(addFactureFailed);

    function addFactureComplete(response){};

    function addFactureFailed(error){
      console.log("XHR Failed for addFacture");
    };
  };

  function deleteFacture(id){
    return $http.delete('/factures/' + id).then(deleteFactureComplete)
                                         .catch(deleteFactureFailed);

    function deleteFactureComplete(response){};

    function deleteFactureFailed(error){
      console.log("XHR Failed for getFactures")
    };
  };

  function editFacture(id){
    return $http.get('/factures/' + id).then(editFactureComplete)
                                       .catch(editFactureFailed);

    function editFactureComplete(response){
      return response.data;
    };

    function editFactureFailed(error){
      console.log("XHR Failed for getFactures")
    };
  };

  function updateFacture(id,Facture){
    return $http.put('/factures/' + id , Facture).then(updateFactureComplete)
                                                 .catch(updateFactureFailed);

    function updateFactureComplete(response){
      return response.data;
    };

    function updateFactureFailed(error){
      console.log("XHR Failed for getFactures");
      return error;
    };
  };

};

})();
