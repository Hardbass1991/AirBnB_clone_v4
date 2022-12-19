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
  $(".amenities h4").text(selected.join(", "))  
});
