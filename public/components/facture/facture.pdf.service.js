(function(){
'use strict';

/* Service */

angular.module('factureModule')
       .service('facturePdfService', facturePdfService);

//facturePdfService.$inject = ['$http'];

function facturePdfService () {

  var service = {
    showContent : showContent
  };

  return service;

  function showContent (contrat){

    var doc = new jsPDF();
    //Titre
    doc.setFont("times");
    doc.setFontType("normal");
    doc.setTextColor(100);
    //doc.text('CONTRAT DE LOCATION', 10, 10);
    //doc.text('RENTAL AGREEMENT', 10, 16);
    doc.text('Facture', 10, 22);
    doc.line(10,25,200,25)
    doc.text('Client', 10, 35);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(9,38,90,50,3,3,'F');

    doc.text('N° Facture', 110, 35);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,38,90,50,3,3,'F');

    doc.line(10,280,200,280)

    doc.setFontSize(10);
    //Identité locataire
    doc.text('Nom et prénom : ' + "Test", 12, 42);
    doc.text('Date et lieu de naissance: ' + "", 12, 49);
    doc.text('Pièce d identié : ' + "", 12, 56);
    doc.text('Nationalité : ' + "", 12, 63);
    doc.text('Permis N° : ' + "", 12, 70);
    doc.text('Adresse: ' + "", 12, 77);
    doc.text('GSM: ' + "", 12, 84);
    //Identité conducteur supp
    doc.text('Nom et prénom : ' + "", 112, 42);
    doc.text('Date et lieu de naissance: ' + "", 112, 49);
    doc.text('Pièce d identié : ' + "", 112, 56);
    doc.text('Nationalité : ' + "", 112, 63);
    doc.text('Permis N° : ' + "", 112, 70);
    doc.text('Adresse: ' + "", 112, 77);
    doc.text('GSM: ' + "", 112, 84);

    /*var img = new Image();
    img.src = '/assets/images/templatePDF/etat.png';

    img.addEventListener('load', function() {
        doc.addImage(img, 'png', 10, 130);
    });*/

    doc.save(contrat.clientNom + '-contrat.pdf');

  }

};
})();
