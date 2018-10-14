(function() {
  'use strict';

angular.module('voitureModule')
       .service('voitureService', voitureService);

voitureService.$inject = ['$http'];

function voitureService ($http){

  var srv = {

    getVoitures         : getVoitures,
    getVoituresByStatus : getVoituresByStatus,
    addVoiture          : addVoiture,
    deleteVoiture       : deleteVoiture,
    editVoiture         : editVoiture,
    updateVoiture       : updateVoiture

  };

  return srv;

  function getVoitures(){
    return $http.get('/voitures').then(getVoitureComplete)
                                 .catch(getVoitureFailed);

    function getVoitureComplete(response){
      return response.data;
    };

    function getVoitureFailed(error){
      return error;
    };
  };

  function getVoituresByStatus(status){
    return $http.get('/voitures/' + status).then(getVoitureComplete)
                                           .catch(getVoitureFailed);

    function getVoitureComplete(response){
      return response.data;
    };

    function getVoitureFailed(error){
      console.log("XHR Failed for getVoitures")
    };
  };

  function addVoiture(voiture){
    return $http.post('/voitures', voiture).then(addVoitureComplete)
                                           .catch(addVoitureFailed);

    function addVoitureComplete(response){
      return response;
    };

    function addVoitureFailed(error){
      //console.log(error)
      return error;
    };
  };

  function deleteVoiture(id){
    return $http.delete('/voitures/' + id).then(deleteVoitureComplete)
                                         .catch(deleteVoitureFailed);

    function deleteVoitureComplete(response){};

    function deleteVoitureFailed(error){
      console.log("XHR Failed for deleteVoitures")
    };
  };

  function editVoiture(id){
    return $http.get('/voitures/' + id).then(editVoitureComplete)
                                       .catch(editVoitureFailed);

    function editVoitureComplete(response){
      return response.data;
    };

    function editVoitureFailed(error){
      console.log("XHR Failed for editVoitures")
    };
  };

  function updateVoiture(id,voiture){
    return $http.put('/voitures/' + id , voiture).then(updateVoitureComplete)
                                                 .catch(updateVoitureFailed);

    function updateVoitureComplete(response){
      return response.data;
    };

    function updateVoitureFailed(error){
      return error;
    };
  };

};

})();
