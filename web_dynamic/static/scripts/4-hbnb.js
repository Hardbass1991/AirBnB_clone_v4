let selected = [];
$( document ).ready(function() {
  /* ACA COMIENZA LA 2*/
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
  /*------2------*/
  /*ACA COMIENZA LA 3*/
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
    .done(function() {
      $("div#api_status").addClass("available");
    }),
    .fail(function () {
      $("div#api_status").removeClass("available");
    })
  })
  /*------3------*/
  /*ACA COMIENZA LA 4*/
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: {},
    .done(function (json) {
      $.each(json, function(item) {
        let article = $("<article></article>");
        /*Article tag with three elements. The first one is 'title_box'*/
        let title_box = $("<div></div>");
        title_box.addClass("title_box");
        let title_box_1 = $("<h2></h2>");
        title_box_1.text(item.name);
        let title_box_2 = $("<div></div>");
        title_box_2.addClass("price_by_night");
        title_box_2.text(item.price_by_night);
        title_box.append(title_box_1, title_box_2);
        /*Second part is 'information'*/
        let info = $("<div></div>");
        info.addClass("information");
        let information_1 = $("<div></div>");
        information_1.addClass("max_guest");
        information_1.text(item.max_guest + "guests");
        let information_2 = $("<div></div>");
        information_2.addClass("number_rooms");
        information_2.text(item.number_rooms + "rooms");
        let information_3 = $("<div></div>");
        information_3.addClass("number_bathrooms");
        information_3.text(item.max_guest + "bathroomss");
        info.append(information_1, information_2, information_3);
        /*Finally, the description*/
        let desc = $("<div></div>");
        desc.addClass("description");
        desc.text(item.description);
        /*We append the three elements to article, and article itself to places*/
        article.append(title_box, info, desc);
        $(".places").append(article);
      });
    })
  })
  /*------4------*/
  /*ACA COMIENZA LA 5*/
  
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    type: "POST",
    data: {"amenities": selected}
  })
  /*------5------*/
});
