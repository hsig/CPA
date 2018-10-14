'use strict';

angular.module('autoComplete', ['autoCompletePrenom','autoCompleteNation']);

angular.module('autoCompletePrenom', [])
       .directive("autoCompletePrenom", function($timeout){
  console.log("Directive : autoComplete client")
  return function(scope, iElement, iAttrs) {
    restrict : 'AEC',
    iElement.autocomplete({
        source: scope[iAttrs.uiItems],
        select: function (event, ui) {
            $(this).val(ui.item ? ui.item : " ");
        },
        change: function (event, ui) {
          if (!ui.item)
              this.value = '';
        }
    });
  };

});

angular.module('autoCompleteNation', [])
       .directive("autoCompleteNation", function($timeout){
  console.log("Directive : autoComplete client nationalité")
  return function(scope, iElement, iAttrs) {
    restrict : 'AEC',
    iElement.autocomplete({
        source: scope[iAttrs.uiItems],
        /*select: function (event, ui) {
             return false;
         },*/

         select: function (event, ui) {
             $(this).val(ui.item ? ui.item : " ");},

         change: function (event, ui) {
             if (!ui.item) {
                 this.value = '';
              }else{
               /*$timeout(function() {
                 iElement.trigger('input');
               }, 0);*/
             }
         }
    });
  };
});
