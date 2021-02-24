const createBadges = (genresArr) => {
  let badges = '';

  for (let genre of genresArr) {
    badges += `<span class="badge badge-pill badge-info">${genre}</span>`;
  }

  return badges;
};

const createMediaElement = (mediaObj) => {
  const newElement = `
  <li class="media">
  <img class="align-self-start mr-3"
    src="${mediaObj.show.image.medium}" alt="${mediaObj.show.name}">
  <div class="media-body">
    <h5 class="mt-0 mb-1">${mediaObj.show.name} ${createBadges(
    mediaObj.show.genres
  )}</h5>
    <ul class="list-group">
      <li class="list-group-item">Premiered: ${mediaObj.show.premiered}</li>
      <li class="list-group-item">Rating: ${mediaObj.show.rating.average}</li>
      <li class="list-group-item">Runtime: ${mediaObj.show.runtime}</li>
    </ul>
  </div>
  </li>
  `;

  return newElement;
};

const renderMediaElements = (mediaArr) => {
  for (let mediaObj of mediaArr) {
    // convert data to HTML elements

    const newElement = createMediaElement(mediaObj);

    // Add each HTML elements to the container
    $('#search-results').append(newElement);
  }
};

$(document).ready(function () {
  // Put an event listener on submit of form

  const getTvResult = (searchTerm) => {
    const url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;

    // Send a request to the API with Ajax
    // Ajax calls are asynchronous
    $.ajax({
      url,
      method: 'GET',
    })
      .done((data) => {

        // empty the container

        $('#search-results').empty();

        // success! we're getting the data back :)
        console.log(data);
        renderMediaElements(data);

      })
      .fail((err) => {
        // fail case
        console.log(err.message);
      })
      .always(() => console.log('request to the API has been performed'));
  };

  $('#search-frm').on('submit', function (event) {
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log('Submit form'); // always do these console.log every step of the way!!!
    // capture the content of the searchBox

    // Method #1: DOM traversal
    // this = form element that the submit event happened on
    // you can also use event.target
    // attribute selector: input[type="search"]
    // console.log(this); // value of this?

    const searchBox = $(this).children('input[type="search"]');
    const searchTerm = searchBox.val(); // getting the content of the search box

    // Method #2: serialize => jQuery
    // Create a string in the format name=value&name=value...

    // const searchTerm = $(this).serialize();

    // Performing the request to the API
    getTvResult(searchTerm);
    searchBox.val(''); // reset the input box to empty string
  });
});
