'use strict';

var NOME_APLICACAO = 'Tutorial Angular';
var urlBasePortal = window.location.protocol + '//' + window.location.host + '/portal';

angular.
  module('phonecatApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        //when('/phones/:phoneId', {
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);

$(function(){
  //insere o JS que monta o Header de aplicacoes, que serah comum para todas as APPS
  $('<script src="' + urlBasePortal + '/js/header-apps.js"></script>').insertAfter($('#app-config-js'));
});