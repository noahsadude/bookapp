'use strict';

$('.edit-button').on('click', function() {
    $(this).next().removeClass('hide-me');
    $(this).addClass('hide-me');
})

$('select.categories').change(function() {
  let selectedCategory = $(this).children('option:selected').val();
  let allChildren = $(this).children;
  console.log('children: ', allChildren);
  // $(this).children.removeAttr('name');
  $(this).children('option:selected').attr('name', "shelf");
  console.log('Option: ' + selectedCategory + ' has been selected');
  // $('.' + selectedCategory').selected = "selected";

})