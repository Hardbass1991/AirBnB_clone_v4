$( document ).ready(function() {
  let amen = {};
  $('input[type="checkbox"]').change(function () {
  if (this.checked) {
    amen[$(this).data('id')] = ($(this).data('name'));
  } else {
    delete amen[($(this).data('id'))];
  }
  $('#h4_amenities').text(Object.keys(amen).map(function(k){return amen[k]}).join(", "));
  });
});
