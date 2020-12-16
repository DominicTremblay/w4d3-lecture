$(document).ready(function () {
  const createBadges = (genres) => {

    // ['Comedy','Thriller','Adventures']

    // '' + <span class="badge badge-pill badge-info">Comedy</span>
    // <span class="badge badge-pill badge-info">Comedy</span> + <span class="badge badge-pill badge-info">Thriller</span>
    // <span class="badge badge-pill badge-info">Comedy</span> + <span class="badge badge-pill badge-info">Thriller</span> + <span class="badge badge-pill badge-info">Comedy</span> + <span class="badge badge-pill badge-info">Adventures</span>

    let badges = '';

    for (let genre of genres) {
      badges += `<span class="badge badge-pill badge-info">${genre}</span>`;
    }

    // <span class="badge badge-pill badge-info">Comedy</span><span class="badge badge-pill badge-info">Thriller</span><span class="badge badge-pill badge-info">Comedy</span><span class="badge badge-pill badge-info">Adventures</span>

    return badges;
  };
  // we need to create <li> items
  const createListItem = (showObj) => {
    const show = showObj.show;

    const element = `<li class="media">
    <img class="align-self-start mr-3"
      src="${show.image.medium}" alt="${show.name}">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${show.name} ${createBadges(show.genres)}</h5>
      <ul class="list-group">
        <li class="list-group-item">Premiered: ${show.premiered}</li>
        <li class="list-group-item">Rating: ${show.rating.average || 'n/a'}</li>
        <li class="list-group-item">Runtime: ${show.runtime} minutes</li>
      </ul>
    </div>
    </li>`;

    return element;
  };


  // add the new li items to the <ul> in the page
  const renderListItems = showsArr => {

    // loop throught the shows
    for (let show of showsArr){
      // create the listItem
      const listItem = createListItem(show);
      $('#search-results').append(listItem);
    }


    // add it to the DOM


  }

  // Issue a request to the tv api to get the result
  const getTVShow = (search) => {
    // create the url for the request
    const url = `http://api.tvmaze.com/search/shows?q=${search}`;

    // Create an AJAX request GET
    $.ajax({
      method: 'GET', // GET,POST,PUT, or DELETE
      url: url,
    })
      .then((result) => {
        // success. getting the result here
        // result = respon form the server
        console.log(result);
        renderListItems(result);
      })
      .catch((err) => console.log(err));
  };

  // catch the input content

  // catch an event: which one? click on the button? submit on the form?
  // target the input
  // get the content of that input

  $('#search-frm').on('submit', function (event) {
    // stop the form from being submitted
    event.preventDefault();

    // target the input field -> children

    const $searchBox = $(this).children('input[type="search"]');

    const searchTerm = $searchBox.val();

    getTVShow(searchTerm);
    $searchBox.val('');
  });
});
