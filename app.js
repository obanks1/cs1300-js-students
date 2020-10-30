var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=sPWqqd35MRckbSGu8txSnzvA0N7hAiKZVFaObwNXB70";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/species" + apiToken + "&range[maximum_height_cm]=,8",
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      const plantData = JSON.parse(request.response).data;
      console.log(plantData);
      updatePage(plantData)

    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const updatePage = (plantData) => {
  plantData.forEach(plant => {
    createUserCard(plant);
  });
}

const createUserCard = (plant) => {
  let card = document.createElement('div');
  card.className = "card";
  let name = document.createElement('h5');
  let scientificName = document.createElement('h6');
  let image = document.createElement('img')
  name.innerHTML = plant.common_name;
  scientificName.innerHTML = plant.scientific_name;
  image.src = plant.image_url;
  card.appendChild(name);
  card.appendChild(scientificName);
  card.appendChild(image);

  document.getElementById('plantList').appendChild(card);
}
