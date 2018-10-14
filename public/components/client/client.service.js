(function() {
  'use strict';

angular.module('clientModule')
       .service('clientService', clientService);

clientService.$inject = ['$http'];

function clientService ($http){

  var clientService = {

    getClients    : getClients,
    addClient     : addClient,
    deleteClient  : deleteClient,
    editClient    : editClient,
    updateClient  : updateClient,
    gestionDate   : gestionDate

  };

  return clientService;

  function getClients(){
    return $http.get('/clients').then(getClientComplete)
                                 .catch(getClientFailed);

    function getClientComplete(response){
      return response.data;
    };

    function getClientFailed(error){
      console.log("XHR Failed for getClients")
    };
  };

  function addClient(Client){
    return $http.post('/clients', Client).then(addClientComplete)
                                           .catch(addClientFailed);

    function addClientComplete(response){};

    function addClientFailed(error){
      console.log("XHR Failed for addClient");
    };
  };

  function deleteClient(id){
    return $http.delete('/clients/' + id).then(deleteClientComplete)
                                         .catch(deleteClientFailed);

    function deleteClientComplete(response){};

    function deleteClientFailed(error){
      console.log("XHR Failed for getClients")
    };
  };

  function editClient(id){
    return $http.get('/clients/' + id).then(editClientComplete)
                                       .catch(editClientFailed);

    function editClientComplete(response){
      return response.data;
    };

    function editClientFailed(error){
      console.log("XHR Failed for getClients")
    };
  };

  function updateClient(id,Client){
    return $http.put('/Clients/' + id , Client).then(updateClientComplete)
                                               .catch(updateClientFailed);

    function updateClientComplete(response){
      return response.data;
    };

    function updateClientFailed(error){
      console.log("XHR Failed for getClients");
      return error;
    };
  };

  function gestionDate (ClientsArray, id){
    var str;
    var resultTab;
    switch(id) {
        case 1:
            for (var item in ClientsArray) {
                if (ClientsArray[item].dateNaissance != null){
                  str = ClientsArray[item].dateNaissance.substr(0,10).split('-');
                  ClientsArray[item].dateNaissance = str[0] +'-'+ str[1] +'-'+ str[2];
                }
                if (ClientsArray[item].datePermis != null){
                  str = ClientsArray[item].datePermis.substr(0,10).split('-');
                  ClientsArray[item].datePermis = str[0] +'-'+ str[1] +'-'+ str[2];
                }
            }
            break;
        case 2:
            if (ClientsArray.dateNaissance != null){
              str = ClientsArray.dateNaissance.substr(0,10).split('-');
              ClientsArray.dateNaissance = str[2] +'-'+ str[1] +'-'+ str[0];
            }
            if (ClientsArray.datePermis != null){
              str = ClientsArray.datePermis.substr(0,10).split('-');
              ClientsArray.datePermis = str[2] +'-'+ str[1] +'-'+ str[0];
            }
            resultTab = ClientsArray;
            break;
        case 3:
            str = ClientsArray.dateNaissance.split('-');
            ClientsArray.dateNaissance = str[2] +'-'+ str[1] +'-'+ str[0];

            str = ClientsArray.datePermis.split('-');
            ClientsArray.datePermis = str[2] +'-'+ str[1] +'-'+ str[0];

            resultTab = ClientsArray;
            break;
        case 4:
            if (ClientsArray.dateNaissance != null){
              str = new Date(ClientsArray.dateNaissance.substr(0,10));
              ClientsArray.dateNaissance = str;
            }
            if (ClientsArray.datePermis != null){
              str = new Date(ClientsArray.datePermis.substr(0,10));
              ClientsArray.datePermis = str;
            }
            resultTab = ClientsArray;
            break;
        default:
            console.log("Default");
    }
    return resultTab;

  };

};

})();
