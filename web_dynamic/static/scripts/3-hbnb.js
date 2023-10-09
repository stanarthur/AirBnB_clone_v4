$('document').ready(function () {
    const root_url = 'http://' + window.location.hostname;
    $.get(root_url + ':5001/api/v1/status/', function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      if (Object.values(amenities).length === 0) {
        $('.amenities H4').html('&nbsp;');
      } else {
        $('.amenities H4').text(Object.values(amenities).join(', '));
      }
    });

    $.ajax({
        url: api + ':5001/api/v1/places_search/',
        type: 'POST',
        data: '{}',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
          $('section.places').append(data.map(place => {
            return `<article>
                      <div class="title">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">
                          ${place.price_by_night}
                        </div>
                      </div>
                      <div class="information">
                        <div class="max_guest">
                          <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                          </br>
                          ${place.max_guest} Guests
                        </div>
                        <div class="number_rooms">
                          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                          </br>
                          ${place.number_rooms} Bedrooms
                        </div>
                        <div class="number_bathrooms">
                          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                          </br>
                          ${place.number_bathrooms} Bathrooms
                        </div>
                      </div>
                      <div class="description">
                        ${place.description}
                      </div>
                    </article>`;
          }));
        }
      });
});
