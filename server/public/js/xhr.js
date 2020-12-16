const ROOT_URL = 'http://localhost:3000/api/superheros/70/biography';

const getBiography = (url) => {

  console.log('issueing request');

  // create the XMLhttp request
  const xhr = new XMLHttpRequest();


  // Initiate the connection 
  xhr.open('GET', url, true);

  
  // send request
  xhr.send();


  // listen for the load event
  xhr.addEventListener('load',function(event) {
    console.log("displaying result")

    console.log(this.response);


  })

};

getBiography(ROOT_URL)