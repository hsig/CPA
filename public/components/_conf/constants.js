angular.module('CPAApp')

.constant('AUTH_EVENTS', {
  notAuthenticated  : 'auth-not-authenticated',
  notAuthorized     : 'auth-not-authorized',
  loginSuccess      : 'auth-login-success',
  loginFailed       : 'auth-login-failed',
  logoutSuccess     : 'auth-logout-success',
  sessionTimeout    : 'auth-session-timemout'
})

.constant('USER_ROLES', {
  all   : '*',
  admin : 'admin',
  guest : 'guest'
})

.constant('API_ENDPOINT', {
  url : './api'
  //url: 'http://127.0.0.1:9090/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})

.constant('NAV_MENU', {
  contrats      : {name:"Tableau de bord", href:"#/Contrats", path:"/Contrats",actif:""},
  clients       : {name:"Clients", href:"#/Clients", path:"/Clients",actif:""},
  voitures      : {name:"Voitures", href:"#/Voitures", path:"/Voitures",actif:""},
  reservation   : {name:"Reservations", href:"#/Reservations", path:"/Reservations",actif:""}
})

.constant('GENERAL', {
  notDispo  : 'non'
});
