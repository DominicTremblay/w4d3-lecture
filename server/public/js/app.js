$(document).ready(function () {
  /* <li class="media">
  <img class="align-self-start mr-3"
    src="http://static.tvmaze.com/uploads/images/medium_portrait/246/616301.jpg" alt="Upload">
  <div class="media-body">
    <h5 class="mt-0 mb-1">Upload <span class="badge badge-pill badge-info">Comedy</span><span
        class="badge badge-pill badge-info">Science-Fiction</span><span
        class="badge badge-pill badge-info">Mystery</span><span
        class="badge badge-pill badge-secondary"></span></h5>
    <ul class="list-group">
      <li class="list-group-item">Premiered: 2020-05-01</li>
      <li class="list-group-item">Rating: 8.4</li>
      <li class="list-group-item">Runtime: 30</li>
    </ul>
  </div>
  </li> */

  const createBadges = function (badgeArr) {
    // <span class="badge badge-pill badge-info">Comedy</span>

    let badgeStr = '';

    for (let badge of badgeArr) {
      badgeStr += `<span class="badge badge-pill badge-info">${badge}</span>`;
    }

    return badgeStr;
  };

  const createMediaElement = function (mediaObj) {
    const mediaEl = `
    <li class="media">
    <img class="align-self-start mr-3" src="${
      mediaObj.show.image.medium
    }" alt="${mediaObj.show.name}">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${mediaObj.show.name} 
        ${createBadges(mediaObj.show.genres)}    
      </h5>
      <ul class="list-group">
        <li class="list-group-item">Premiered: ${mediaObj.show.premiered}</li>
        <li class="list-group-item">Rating: ${
          mediaObj.show.rating.average || 'N/A'
        }</li>
        <li class="list-group-item">Runtime: ${mediaObj.show.runtime}</li>
      </ul>
    </div>
    </li>
    `;

    return mediaEl;
  };

  const renderMediaElements = function (mediaObjArr) {
    // We need to extract the information out of the object [{},{},{}] to create the HTML
    // Create a loop to render the HTML elements
    // append each element to the container  id="search-results"

    for (let mediaObj of mediaObjArr) {
      // Create the HTML media element
      const newMediaElement = createMediaElement(mediaObj);

      // append each HTML element to the search result container
      $('#search-results').append(newMediaElement);
    }
  };

  const getShowInfo = function (keyword) {
    // Make a request to the API and get the data back

    const url = `http://api.tvmaze.com/search/shows?q=${keyword}`;

    $.ajax({
      url,
      method: 'GET',
    })
      .done((result) => {
        // success case. getting the result of the api
        // this is the only block where you can access the result
        renderMediaElements(result);
      })
      .fail(() =>
        console.log('There was an error getting the info for that show')
      )
      .always(() => console.log('Request is completed.'));
  };

  // Event handler for the form => id="search-frm" => submit

  $('#search-frm').on('submit', function (event) {
    // prevent the default form submission
    event.preventDefault();
    // Read the data from the input text content
    // target the search box in the form
    const searchBox = $(this).children('input[type=search]');

    const keyword = searchBox.val();

    // empty the search result container
    $("#search-results").empty();

    getShowInfo(keyword);
    searchBox.val(''); // reset the content of the search box to empty string
  });
});
