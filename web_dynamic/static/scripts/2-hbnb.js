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

  $.get("http://127.0.0.1:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });
});
