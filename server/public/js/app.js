const createBadges = function (badgesArr) {
  let badges = '';

  for (let badge of badgesArr) {
    badges += `<span class="badge badge-pill badge-info">${badge}</span>`;
  }

  return badges;
};

const createShowElement = function (showObj) {
  const showElement = `
  <li class="media">
  <img class="align-self-start mr-3" src="${showObj.show.image.medium}"
alt="${showObj.show.name}">
  <div class="media-body">
  <h5 class="mt-0 mb-1">${showObj.show.name} ${createBadges(showObj.show.genres)}</h5>
<ul class="list-group">
<li class="list-group-item">Premiered:${showObj.show.premiered}</li>
<li class="list-group-item">Rating: ${showObj.show.rating.average}</li>
<li class="list-group-item">Runtime: ${showObj.show.runtime}</li>
</ul>
</div>
</li>
`;

  return showElement;
};

// looping throught the results => [{},{},{}...]
const renderShowElements = function (showArr) {
  for (let showObj of showArr) {
    // Targetting the container and appending the item to it
    const showElement = createShowElement(showObj);
    $('#search-results').append(showElement);
  }
};

// perform the request and deal with the results
const getShows = function (searchTerm) {
  const url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;
  // create a request to the tv maze API

  // sending the requet to the TV Maze API
  $.ajax({
    url: url,
    method: 'GET',
  })
    .done((results) => {
      console.log(results); // array of objects

      renderShowElements(results);

      // with the results => create the HTML element => attach to the DOM
    })
    .fail((err) => {
      console.log(`Error: ${err.message}`);
    })
    .always(() => {
      console.log('request to TV Maze done');
    });
};

$(document).ready(function () {
  // catch the form submit

  $('#search-frm').on('submit', function (event) {
    // prevent form submission
    event.preventDefault();

    // extract the search keyword

    const inputBox = $(this).children('input[type="search"]');

    const searchTerm = inputBox.val();

    // trigger the request
    getShows(searchTerm);
  });
});
