(function($) {

  'use strict';

  // Seleciona as opções
  $('._itemSelect').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('_activeCategoria');
    $('.btn-action > .btn').removeClass('_btnAlpha');
  });

  // Select categoria
  $('.select-categoria .field').on('click', function(event) {
    event.preventDefault();

    $('.selectCategoria').toggleClass('categoryActive');
  });

})(jQuery);
