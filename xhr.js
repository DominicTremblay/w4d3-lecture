const ROOT_URL = 'http://localhost:3000/api/superheros/70/biography';

const getBiography = (url) => {
  // create the XMLHttpRequest

  const xhr = new XMLHttpRequest();

  // initialize the request

  xhr.open('GET', url, true);

  // send request
  xhr.send();

  // add load event listener
  xhr.addEventListener('load', function(event){

    if (this.status >= 200 && this.status < 300) {
      // success
      const biography = JSON.parse(this.response);
      console.log(biography);
    } else {
      console.log(`Error: this.status`)
    }


  });
};

getBiography(ROOT_URL)