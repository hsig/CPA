(function() {
  'use strict';

angular.module('reservationModule')
       .service('serviceReservation', serviceReservation);

serviceReservation.$inject = ['$http'];

function serviceReservation ($http){

  var serviceReservation = {

    getReservations    : getReservations,
    addReservation     : addReservation,
    deleteReservation  : deleteReservation,
    editReservation    : editReservation,
    updateReservation  : updateReservation

  };

  return serviceReservation;

  function getReservations(){
    return $http.get('/reservations').then(getReservationComplete)
                                 .catch(getReservationFailed);

    function getReservationComplete(response){
      return response.data;
    };

    function getReservationFailed(error){
      console.log("XHR Failed for getReservations")
    };
  };

  function addReservation(Reservation){
    return $http.post('/reservations', Reservation).then(addReservationComplete)
                                           .catch(addReservationFailed);

    function addReservationComplete(response){};

    function addReservationFailed(error){
      console.log("XHR Failed for addReservation");
    };
  };

  function deleteReservation(id){
    return $http.delete('/reservations/' + id).then(deleteReservationComplete)
                                         .catch(deleteReservationFailed);

    function deleteReservationComplete(response){};

    function deleteReservationFailed(error){
      console.log("XHR Failed for getReservations")
    };
  };

  function editReservation(id){
    return $http.get('/reservations/' + id).then(editReservationComplete)
                                           .catch(editReservationFailed);

    function editReservationComplete(response){
      return response.data;
    };

    function editReservationFailed(error){
      console.log("XHR Failed for getReservations")
    };
  };

  function updateReservation(id,Reservation){
    return $http.put('/reservations/' + id , Reservation).then(updateReservationComplete)
                                               .catch(updateReservationFailed);

    function updateReservationComplete(response){
      console.log(response);
    };

    function updateReservationFailed(error){
      console.log("XHR Failed for getReservations");
      return error;
    };
  };

};

})();
