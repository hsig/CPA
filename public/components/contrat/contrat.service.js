(function() {
  'use strict';

angular.module('contratModule')
       .service('contratService', contratService);

contratService.$inject = ['$http'];

function contratService ($http){

  var contratService = {

    getContrats    : getContrats,
    addContrat     : addContrat,
    deleteContrat  : deleteContrat,
    editContrat    : editContrat,
    updateContrat  : updateContrat,
    gestionDate    : gestionDate,
    gestionEtat    : gestionEtat

  };

  return contratService;

  function getContrats(){
    return $http.get('/contrats').then(getContratComplete)
                                 .catch(getContratFailed);

    function getContratComplete(response){
      return response.data;
    };

    function getContratFailed(error){
      console.log("XHR Failed for getContrats")
    };
  };

  function addContrat(contrat){
    return $http.post('/contrats', contrat).then(addContratComplete)
                                           .catch(addContratFailed);

    function addContratComplete(response){};

    function addContratFailed(error){
      console.log("XHR Failed for addContrat");
    };
  };

  function deleteContrat(id){
    return $http.delete('/contrats/' + id).then(deleteContratComplete)
                                         .catch(deleteContratFailed);

    function deleteContratComplete(response){};

    function deleteContratFailed(error){
      console.log("XHR Failed for getContrats")
    };
  };

  function editContrat(id){
    return $http.get('/contrats/' + id).then(editContratComplete)
                                       .catch(editContratFailed);

    function editContratComplete(response){
      return response.data;
    };

    function editContratFailed(error){
      console.log("XHR Failed for getContrats")
    };
  };

  function updateContrat(id,contrat){
    return $http.put('/contrats/' + id , contrat).then(updateContratComplete)
                                                 .catch(updateContratFailed);

    function updateContratComplete(response){};

    function updateContratFailed(error){
      console.log("XHR Failed for getContrats");
      return error;
    };
  };

  function gestionEtat(ContratsArray , id){
    switch(id) {
        case 1:
            if(ContratsArray.client !== null && ContratsArray.clientSup !== null
                && (ContratsArray.client.nom == ContratsArray.clientSup.nom) ){
                  return 1;
            };
            break;
        default:
            console.log("Error 404");
    };
  };

  function gestionDate (ContratsArray, id){
    var str;
    var resultTab;
    switch(id) {
        case 1:
            for (var item in ContratsArray) {
                if(ContratsArray[item].dateDebut !== null){
                  str = ContratsArray[item].dateDebut.substr(0,10);
                  ContratsArray[item].dateDebut = str;
                };
                if(ContratsArray[item].dateFin !== null){
                  str = ContratsArray[item].dateFin.substr(0,10);
                  ContratsArray[item].dateFin = str;
                };
            };
            break;
        case 2:
            if(ContratsArray.dateDebut!== null){
              str = ContratsArray.dateDebut.substr(0,10).split('-');
              ContratsArray.dateDebut = str[2] +'-'+ str[1] +'-'+ str[0];
            };
            if(ContratsArray.dateFin !== null){
              str = ContratsArray.dateFin.substr(0,10).split('-');
              ContratsArray.dateFin = str[2] +'-'+ str[1] +'-'+ str[0];
            };
            break;
        case 3:
            str = ContratsArray.dateDebut.split('-');
            ContratsArray.dateDebut = str[2] +'-'+ str[1] +'-'+ str[0];

            str = ContratsArray.dateFin.split('-');
            ContratsArray.dateFin = str[2] +'-'+ str[1] +'-'+ str[0];
            resultTab = ContratsArray;
            break;
        case 4:
            //  Date Control
            var currentDate = new Date();
            if(ContratsArray.dateDebut < currentDate &&
              ContratsArray.dateDebut.getDay() !== currentDate.getDay() ){
                resultTab = 1;
            };
            if(ContratsArray.dateFin < ContratsArray.dateDebut){
                resultTab = 2;
            };
            break;
        case 5:
            if (ContratsArray.dateDebut !== null){
              str = new Date(ContratsArray.dateDebut.substr(0,10));
              ContratsArray.dateDebut = str;
            }
            if (ContratsArray.dateFin !== null){
              str = new Date(ContratsArray.dateFin.substr(0,10));
              ContratsArray.dateFin = str;
            }
            resultTab = ContratsArray;
            break;
        default:
            console.log("Error 404");
    };
    return resultTab;
  };

};

})();
