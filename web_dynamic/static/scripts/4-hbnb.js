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

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5001/api/v1/places_search/",
    data: JSON.stringify({}),
    contentType: "application/json",
    success: function(data) {
      console.log(data);
    }
  });
  /*
  $.post("http://127.0.0.1/api/v1/places_search",
	  function(data, textStatus, jqXHR) {
            console.log(data);
	  });
  */
  $("button").on("click", function() {
    $.post("http://127.0.0.1:5001/api/v1/places_search",
          JSON.stringify(amen),
	  function(data, textStatus, jqXHR) {
            console.log(data)
	  }
    )
  });
});
