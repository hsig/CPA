(function(){
'use strict';

/* Service */

angular.module('contratModule')
       .service('contratPdfService', contratPdfService);

contratPdfService.$inject = ["$http","$q"];

function contratPdfService ($http, $q) {

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
    doc.text('CONTRAT DE LOCATION', 10, 10);
    doc.text('RENTAL AGREEMENT', 10, 16);
    doc.text('CONTRATO DE ALQUILER', 10, 22);
    doc.line(10,25,200,25)
    doc.text('Identité du locataire', 10, 35);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(9,38,90,50,3,3,'F');
    doc.text('Véhicule', 10, 94);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(9,97,90,15,3,3,'F');
    doc.text('Remarque', 10, 242);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(9,245,90,25,3,3,'F');

    doc.text('Conducteur supplémentaire', 110, 35);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,38,90,50,3,3,'F');
    doc.text('Durée de la location', 110, 94);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,97,90,30,3,3,'F');
    doc.text('Cautionnement', 110, 133);
    doc.text('Facturation', 110, 147);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,151,90,50,3,3,'F');
    doc.text('Modalité de Paiement', 110, 207);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,210,90,16,3,3,'F');
    doc.text('Informations importantes', 110, 232);
    doc.setDrawColor(0);
    doc.setFillColor(223, 242, 255);
    doc.roundedRect(109,235,90,35,3,3,'F');

    doc.line(10,280,200,280)

    doc.setFontSize(10);
    //Identité locataire
    doc.text('Nom et prénom : ' + contrat.clientNom, 12, 42);
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
    //Véhicule
    doc.text('Marque et Type: ' + "", 12, 101);
    doc.text('Matricule: ' + contrat.voitureImm, 12, 108);
    //Durée de la location
    doc.text('Date début: ' + contrat.dateDebut, 112, 101);
    doc.text('Date retour: ' + contrat.dateFin, 112, 108);
    doc.text('Prolongation 1: ' + "", 112, 115);
    doc.text('Prolongation 2: ' + "", 112, 122);
    //cautionnement
    doc.setFontSize(10);
    doc.text('NB: Avance pour tous dégâts subis au véhicule suite à ', 112, 137);
    doc.text('un accident ou mal utilisation', 119, 141);
    //Facturation
    doc.setFontSize(10);
    doc.text('Durée de location: ' + "", 112, 155);
    doc.text('Prix par jour: ' + "", 112, 162);
    doc.text('Autres charges: ' + "", 112, 169);
    doc.text('Total HT: ' + "", 112, 176);
    doc.text('TVA 18%: ' + "", 112, 183);
    doc.text('Droit de timbre: ' + "", 112, 190);
    doc.text('Total facture: ' + "", 112, 197);
    //Mode de paiement
    doc.text('Chéque: ' + "   ", 111, 214);
    doc.text('Carte de crédit: ' + "   ", 135, 214);
    doc.text('Espèce: ' + "   ", 170, 214);
    doc.text('N°: ' + "   ", 111, 221);
    //Informations importantes
    doc.setFontSize(8);
    doc.text("1. En cas d\'accident le locataire doit payer une fanchise égale à 4% de la \n valeur de la voiture s\'il a appliqué toutes les conditions du contrat et dans \n le cas contraire il doit payer tous les frais. 2- L'assurance tout risque n'inclut \n pas de dommages causés aux phares, rétroviseurs, pare-chocs avant et \n arrière, peinture de voiture et toute perte d'équipement comme : papier, clefs \n et radio cassette qui sont à la charge du locataire. 3 - Le client paye l'usure \n mécanique provenant d'une négligence de la part du locataire ou du 2ème \n conducteur. Le remoruage de la voiture en cas d'accident ou d'une panne est\n à la charge du locataire. 4 - Le client doit présenter ce document en cas de \n besoin. ", 111, 238);
    doc.text('Le kilométrage est limoté à 300Km/jour, tout excés est facturé à base de \n 0,300 millimes/Km' , 11, 249);

    var img = new Image();
    //img.width = 400;
    img.src = '/assets/images/templatePDF/etat.png';
    img.addEventListener('load', function(cb) {
        doc.addImage(img, 'png', 10, 120, 90, 60);
          doc.save(contrat.clientNom + '-contrat.pdf');
    });


  }

};
})();
