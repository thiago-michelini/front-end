'use strict';

var ambientes = ['dev','int','sit','uat','local'];
var NOME_APLICACAO = 'Tutorial Angular';
var URL_BASE_PORTAL = criarUrl('portal', '/portal');

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
  $('<script src="' + URL_BASE_PORTAL + '/js/header-apps.js"></script>').insertAfter($('#app-config-js'));
});

function criarUrl(app, uri) {
  var result = app;
  if (urlEhIp())//usuario estah usando ip para acesso a aplicacao
    return window.location.protocol + '//' + window.location.host + uri;
  
  //usuario estah usando DNS para acesso a aplicacao
  var amb = window.location.host;
  amb = amb.substring(0, amb.indexOf('.'));
  $(ambientes).each(function(i, v) {
    if (amb.indexOf(v) > -1) {
      result += '-' + v;
    }
  });

  return window.location.protocol + '//' + result + obterDomain();
}

function urlEhIp() {
  var h = window.location.host;
  var ehIp = Number(h.substring(0, h.indexOf('.')));
    if (!isNaN(ehIp))
        return true;

    return false;
}

function obterDomain() {
    var result = window.location.host;
    var ehIp = Number(result.substring(0, result.indexOf('.')));
    if (!isNaN(ehIp))
        return result;

    result = result.substring(result.indexOf('.'), result.length);
    return result;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}