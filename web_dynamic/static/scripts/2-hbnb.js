$( document ).ready(function() {
  let selected = [];
  $(".amenities .popover li").on("input", function() {
    let id = $(this).attr("data-id");
    if ($(this).is(":checked")) {
      selected.append(id);
    } else {
      if selected.includes(id) {
        let index = selected.indexOf(id);
        array.splice(index, 1);
      }
    }
  });
  $(".amenities h4").text(selected.join(", "));

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
    .done(function() {
      $("div#api_status").addClass("available");
    })
    .fail(function () {
      $("div#api_status").removeClass("available");
    })
  })
});
