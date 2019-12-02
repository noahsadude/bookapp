'use strict';

$('.edit-button').on('click', function() {
    $(this).next().removeClass('hide-me');
    $(this).addClass('hide-me');
})

$('select.categories').change(function() {
  let selectedCategory = $(this).children('option:selected').val();
  // console.log($('.categories option[value="' + selectedCategory + '"]').attr('selected', 'selected'));
  console.log('Option: ' + selectedCategory + ' has been selected');
  // $('.' + selectedCategory').selected = "selected";
})