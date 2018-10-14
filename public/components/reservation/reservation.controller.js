(function() {
'use strict';
/* Controllers */
angular.module('reservationModule')
       .controller('reservationCtrl', reservationCtrl);

 reservationCtrl.$inject = ["serviceReservation","AuthService","user","users"];

 function reservationCtrl (serviceReservation,AuthService,user,users) {

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // reservationCtrl Variables
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  var reservationVm  = this;
  var video_out = document.getElementById("vid-box");
  var vid_thumb = document.getElementById("vid-thumb");

  reservationVm.error       = "";
  reservationVm.state       = false;
  reservationVm.memberinfo  = user();
  reservationVm.refreshContact  = refreshContact();
  reservationVm.contact     = reservationVm.number || "";

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // reservationCtrl Function
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  reservationVm.init      = init();
  reservationVm.call      = call;
  reservationVm.mute      = mute;
  reservationVm.pause     = pause;
  reservationVm.end       = end;
  reservationVm.stop      = stop;
  reservationVm.reconnect = reconnect;

  function refreshContact(){
    var arr = users();
    reservationVm.users = arr.filter(function( obj ) {
        return obj.name !== reservationVm.memberinfo;
    });
  }

  function init(){

    if(!AuthService.isAuthenticated()){
      reservationVm.error = "Ouups, connexion Failed ..."
      return;
    }

    if(typeof(ctrl) != 'undefined'){
      reservationVm.error = "You are already connected"
      return;
    }

    var phone = window.phone = PHONE({
        number        : reservationVm.memberinfo || undefined, // listen on username line else Anonymous
        publish_key   : 'pub-c-8dfedd3d-2b18-4050-9abd-c56854c72b27',
        subscribe_key : 'sub-c-46528784-4b1c-11e8-a061-3a3a847bebcf',
        //media : { audio : false, video : false }
    });

    var ctrl = window.ctrl = CONTROLLER(phone);

    ctrl.ready(function(){
      ctrl.addLocalStream(vid_thumb);
    });

    ctrl.receive(function(session){
        //console.log(session);
        session.connected(function(session){
          //reservationVm.state = true;
          reservationVm.contact = session.number;
          var video = session.video;
          video.setAttribute( 'class', 'video-call' );
          video_out.appendChild(video);
        });
        session.ended(function(session) {
          ctrl.getVideoElement(session.number).remove();
          reservationVm.state = false;
        });
    });

    ctrl.videoToggled(function(session, isEnabled){
      // Hide video is stream paused
  		ctrl.getVideoElement(session.number).toggle(isEnabled);
  	});

  	ctrl.audioToggled(function(session, isEnabled){
      // 0.75 opacity is audio muted
  		ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.5);
  	});

    reservationVm.error = "";
  }

  function call(){
    if(typeof(ctrl) == 'undefined'){
      alert("Pas de chat en cours ...");
      return;
    }
    reservationVm.error = "";
    phone.dial(reservationVm.number);
    /**ctrl.isOnline(reservationVm.number, function(isOn){
      if(isOn){
        //alert("contact online");
        //phone.dial(reservationVm.number);
      }else{
        alert("contact not online " + reservationVm.number);
      }
    });**/
  }

  function mute(){
    if(typeof(ctrl) == 'undefined'){
      alert("Pas de chat en cours ...");
      return;
    }
    reservationVm.error = "";
    var audio = ctrl.toggleAudio();
  	if (!audio) reservationVm.error = "Audio Off"
  	else reservationVm.error = "Audio On"
  }

  function pause(){

    if(typeof(ctrl) == 'undefined'){
      alert("Pas de chat en cours ...");
      return;
    }
    reservationVm.error = "";
    var video = ctrl.toggleVideo();
  	if (!video) {
      //vid_thumb.className = ("fa-paused");
      //reservationVm.error = "Video Off"
    } else {
      //vid_thumb.classList.remove("fa-paused");
      //reservationVm.error = "Video On"
    }

  }

  function end(){

    if(typeof(ctrl) == 'undefined'){
      alert("Pas de chat en cours ...");
      return;
    }
    reservationVm.error = "";
    ctrl.hangup();
  }

  function stop() {
    if(typeof(ctrl) == 'undefined'){
      alert("Pas de chat en cours ...");
      return;
    }
    ctrl.stopVideo();
  }

  function reconnect(){
    ctrl.getVideoElement(reservationVm.memberinfo).remove();
    init();
  }

};

})();
