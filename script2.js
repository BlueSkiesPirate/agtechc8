// require("dotenv").config();

var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    for (let j = 0; j < coll.length; j++) {
      if (coll[j].classList.contains("active") && j != i) {
        coll[j].classList.toggle("active");
        coll[j].nextElementSibling.style.maxHeight = null;
      }
    }
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.overflow = "auto"; //This is to make the content scrollable
    }
  });
}

function uploadAndIdentifyPlantID() {
  console.log("submitted");
  //get the photo from the front end
  const photoInput = document.getElementById("photoInput");

  //if no photo was selected and the user clicks on submit
  //alerts user to upload a photo
  if (photoInput.files.length === 0) {
    alert("Please select a photo to upload");
    return;
  }
  //select the first file from the file arrays of an input element
  const selectedFIle = photoInput.files[0];

  //create a new file reader object so we can read file contents

  const reader = new FileReader();

  //trigger the onload event when the reading operation of a file is completed
  reader.onload = function (e) {
    //store the base64 image on a variable
    const base64Image = e.target.result;
    console.log("base64Image", base64Image);
    //store variables for the API call

    const apiKey = "vg5higCzJBrG8fxVlRnrYM1ZZ4sP4dlwFQU4OIZc8PwxmhQXon"; //process.env.API_KEY
    const latitude = 49.207;
    const longitude = 16.608;
    const health = "all";
    const similarImages = true;
    const details =
      "common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods,treatment,cause";
    const language = "en";
    const apiUrlPlantID = `https://plant.id/api/v3/identification?details=${details}&language=${language}`;

    //Make firt API call with our base64Image
    axios
      .post(
        apiUrlPlantID,
        {
          images: [base64Image],
          latitude: latitude,
          longitude: longitude,
          health: health,
          similar_images: similarImages,
        },
        {
          headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      )

      //this is the pending state of the promise
      .then(function (response) {
        console.log("Response from Plant ID API:", response.data);
        displayPlantIDInfo(response.data, base64Image);
      })
      //this is the error state of the promise
      .catch(function (error) {
        alert(
          `Error: ${
            error?.response?.data?.message ||
            error.message ||
            "An unknown error occurred"
          } XXX`
        ); //THis Error doesn't display well
        console.error("Error:", error);
      });
  };
  // REad the selected file as a date URL -- a base64 encoded representation
  // of the file's content
  reader.readAsDataURL(selectedFIle);
}

//Display function for the palnt ID info
function displayPlantIDInfo(plantIdResponse, base64Image) {
  //Variable tp store the first suggestion

  const plantIdClassification = plantIdResponse.result.classification;
  const plantIdDisease = plantIdResponse.result.disease;
  const plantIdIsHealthy = plantIdResponse.result.is_healthy;
  const plantIdIsPlant = plantIdResponse.result.is_plant;

  //Plan previeew image
  //grab the previewImage element from the front plantIdentifier.html file
  const previewImage = document.getElementById("previewImage");
  previewImage.src = base64Image;

  //Plant name
  // Grab the html for the palnt title container
  const plantNameContainer = document.getElementById("plant-name-container");
  //create a new <p> tag for the palnt title
  const plantNameElement = document.createElement("p");
  //add the name of the plant to the innerHtml of the new p tag
  plantNameElement.innerHTML = `<strong>Name:  </strong> ${plantIdClassification.suggestions[0].name}`;
  //append the new div to the api result container we grabbed from our html
  plantNameContainer.appendChild(plantNameElement);

  //similar image
  //grab the simial image form the API Response
  console.log(
    "image:",
    plantIdClassification.suggestions[0].similar_images[0].url
  );
  const plantSimiliarImage =
    plantIdClassification.suggestions[0].similar_images[0].url;
  //grab the HTML where the image will be placed
  const similiarImageHTML = document.getElementById("plant-similiar-image");
  //set the image HTML src attribute to the imaghe
  similiarImageHTML.classList.remove("invisible");
  similiarImageHTML.src = plantSimiliarImage;

  //PROBABILITY - grab the socre from the API Response
  const probabilityOfPlant = plantIdClassification.suggestions[0].probability;
  //grab the HTML where the probabilityh will be placed
  const probabilityNameContainer = document.getElementById(
    "probability-container"
  );
  //create a new p tag for ther probability text
  const probabilityNameElement = document.createElement("p");
  //ad tyhe probability text to the innerHTML of the new p tag
  probabilityNameElement.innerHTML = `<strong> Probability: </strong> ${probabilityOfPlant}`;

  //append the new div we cretaed
  probabilityNameContainer.appendChild(probabilityNameElement);

  //Is plant section
  //grab the is plant boolean value from our API response
  const isPlant = plantIdIsPlant.binary;
  //grab the html where the boolean will be placed
  const isPlantContainer = document.getElementById("isPlant-container");
  //create a new p tag for the is plant boolean
  const isPlantElement = document.createElement("p");
  //check to see if the submitted picture is a plant; if not, alert user
  if (isPlant == false) {
    alert("The picture you submitted is not a plant. Please try again!");
    window.location.reload();
  }

  //add the boolean to the innerHTML of the new p tag created
  isPlantElement.innerHTML = `<strong> Is Plant: </strong> ${isPlant} `;
  //append the new div we created
  isPlantContainer.appendChild(isPlantElement);

  //Common Name -grab the first common name from the api response
  const commonName =
    plantIdClassification.suggestions[0].details.common_names[0];
  //grab the HTML where the common name will be placed
  const commonNameContainer = document.getElementById("common-name-container");
  //create a new p tag element
  const commonNameElement = document.createElement("p");
  //add the common name to the innerHTML of the new p tag created
  commonNameElement.innerHTML = `<strong> Common Name: </strong> ${commonName}`;
  //append the new div we created
  commonNameContainer.appendChild(commonNameElement);

  //DESCRIPTION - grab the value common name from the api response
  const plantDescription =
    plantIdClassification.suggestions[0].details.description.value;
  //grab the constiner from the front end HTML
  const descriptionContainer = document.getElementById(
    "description-name-container"
  );
  //create a new p tag element
  const descriptionElement = document.createElement("p");
  //add the common name to the innerHTML of the new p tag created
  descriptionElement.innerHTML = `<strong> Description: </strong> ${plantDescription}`;
  //append the new div we created
  descriptionContainer.appendChild(descriptionElement);

  //Plant Health Status - grab the value common name from the api response
  const plantHealthStatus = plantIdIsHealthy.binary;
  //grab the constiner from the front end HTML
  const plantHealthStatusContainer = document.getElementById(
    "plant-health-status-container"
  );
  //create a new p tag element
  const plantHealthStatusElement = document.createElement("p");
  //add the common name to the innerHTML of the new p tag created
  plantHealthStatusElement.innerHTML = `<strong> Plant Health Status: </strong> ${plantHealthStatus}`;
  //append the new div we created
  plantHealthStatusContainer.appendChild(plantHealthStatusElement);

  //Similar Image With Dsease
  //Grab the similar image fron the API response
  const plantSimiliarImageWithDisease =
    plantIdDisease.suggestions[0].similar_images[0].url;
  //grab the HTML where the image will be placed
  const similiarImageWithDiseaseHTML = document.getElementById(
    "plant-similiar-image-with-disease"
  );
  //set the image HTML src attribute to the image
  similiarImageWithDiseaseHTML.classList.remove("invisible");
  similiarImageWithDiseaseHTML.src = plantSimiliarImageWithDisease;

  ////Disease name - grab value from API repsonse
  const plantDiseaseName = plantIdDisease.suggestions[0].name;
  //grab container from the front end HTML
  const plantDiseaseNameContainer = document.getElementById(
    "plant-disease-name-container"
  );

  //create the new p tag element
  const plantDiseaseNameElement = document.createElement("p");
  // add text to the innerHTML of the new p tag
  plantDiseaseNameElement.innerHTML = `<strong> Disease: </strong> ${plantDiseaseName}`;
  //appned the new div we created
  plantDiseaseNameContainer.appendChild(plantDiseaseNameElement);

  ////Disease probability - grab value from API repsonse
  const plantDiseasProbability = plantIdDisease.suggestions[0].probability;
  //grab container from the front end HTML
  const plantDiseaseProbabilityContainer = document.getElementById(
    "plant-disease-probability"
  );

  //create the new p tag element
  const plantDiseaseProbabilityElement = document.createElement("p");
  // add text to the innerHTML of the new p tag
  plantDiseaseProbabilityElement.innerHTML = `<strong> Probability: </strong> ${plantDiseasProbability}`;
  //appned the new div we created
  plantDiseaseProbabilityContainer.appendChild(plantDiseaseProbabilityElement);

  ////Disease description - grab value from API repsonse
  const plantDiseaDescription =
    plantIdDisease.suggestions[0].details.description;
  //grab container from the front end HTML
  const plantDiseaseDescriptionContainer = document.getElementById(
    "plant-disease-description"
  );
  //create the new p tag element
  const plantDiseaseDescriptionElement = document.createElement("p");
  // add text to the innerHTML of the new p tag
  plantDiseaseDescriptionElement.innerHTML = `<strong> Disease Description: </strong> ${plantDiseaDescription}`;
  //appned the new div we created
  plantDiseaseDescriptionContainer.appendChild(plantDiseaseDescriptionElement);

  //Disease Treatment
  // GRab value from API response
  const plantDiseaseTreatment = plantIdDisease.suggestions[0].details.treatment;
  // grab the container from the front end HTML
  const plantDiseaseTreatmentContainer = document.getElementById(
    "plant-disease-treatment"
  );
  //create a new p tag element
  const palntDiseaseTreatmentElement = document.createElement("p");

  //Do a check if the palnt is dead/objecrt is empty
  //we let the user know there is no treatment vailable for dead plants
  if (Object.keys(plantDiseaseTreatment).length === 0) {
    //add text to the innerHTML of the new p tag created
    palntDiseaseTreatmentElement.innerHTML = `<strong> Disease Treatment: </strong> No treatment Available`;
    plantDiseaseTreatmentContainer.appendChild(palntDiseaseTreatmentElement);
  }

  //for loop through the object and will map the various keys to their assignment values then attachj them to their HTML containers
  for (const key in plantDiseaseTreatment) {
    //if the object has a key value pair
    if (plantDiseaseTreatment.hasOwnProperty(key)) {
      //create a variable that matches the key with the values and wrap them in HTML
      const plantDiseaseTreatmentValues = plantDiseaseTreatment[key]
        .map((value) => `<li>${value}</li>`)
        .join("");

      const plantDiseaseTreatmnetText = `<strong> Disease Treatment ${key}: </strong> <ul>${plantDiseaseTreatmentValues} </ul>`;
      // append the text of the key values pairs into the HTML container
      plantDiseaseTreatmentContainer.innerHTML += plantDiseaseTreatmnetText;
    }
  }
}
