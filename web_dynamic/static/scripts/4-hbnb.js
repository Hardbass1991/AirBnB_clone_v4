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
      $.each(data, function(index, value) {
        let article = $("<article></article>");
        /*Article tag with three elements. The first one is 'title_box'*/
        let title_box = $("<div></div>");
        title_box.addClass("title_box");
        let title_box_1 = $("<h2></h2>");
        title_box_1.text(value.name);
        let title_box_2 = $("<div></div>");
        title_box_2.addClass("price_by_night");
        title_box_2.text("$" + value.price_by_night);
	title_box.append(title_box_1, title_box_2);

	/*Second part is 'information'*/
        let info = $("<div></div>");
        info.addClass("information");
        let information_1 = $("<div></div>");
        information_1.addClass("max_guest");
        information_1.text(value.max_guest + "guests");
        let information_2 = $("<div></div>");
        information_2.addClass("number_rooms");
        information_2.text(value.number_rooms + "rooms");
        let information_3 = $("<div></div>");
        information_3.addClass("number_bathrooms");
        information_3.text(value.max_guest + "bathroomss");
        info.append(information_1, information_2, information_3);

        /*Finally, the description*/
        let desc = $("<div></div>");
        desc.addClass("description");
        desc.text(value.description.replace(/<BR ?\/?>/g, "\n"));

	article.append(title_box, info, desc);
	$(".places").append(article);
      });
    }
  });
  /* ---------5-------*/
  $("button").on("click", function() {
    let amenities = {}
    amenities["amenities"] = Object.keys(amen);
    console.log(amen);
    console.log(Object.keys(amen));
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5001/api/v1/places_search",
      data: JSON.stringify(amenities),
      contentType: "application/json",
      success: function(data) {
        $("section.places").empty();
        $.each(data, function(index, value) {
          $("section.places").append(`
	  <article>
	    <div class="title_box">
	      <h2>${value.name}</h2>
	      <div class="price_by_night">
	        $${value.price_by_night}
	      </div>
	    </div>
	    <div class="information">
	      <div class="max_guest">
	        ${value.max_guest} Guest${value.max_guest !== 1 ? 's' : ''}
	      </div>
	      <div class="number_rooms">
	        ${value.number_rooms} Bedroom${value.number_rooms !== 1 ? 's' : ''}
	      </div>
	      <div class="number_bathrooms">
	        ${value.number_bathrooms} Bathroom${value.number_bathrooms !== 1 ? 's' : ''}
	      </div>
	    </div>
	    <div class="description">
	      ${value.description.replace(/<BR ?\/?>/g, "\n")}
	    </div>
	  </article>
	  `);
        });
      }
    });
  });
});
