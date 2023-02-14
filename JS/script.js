//diven som sparar alla images inuti
const divImageContainer = document.querySelector(".remove");
document.querySelector(".button").addEventListener("click", getInformation);
//function som får alla input data från kliant 
function getInformation(event) {
  event.preventDefault();
  const userInputSearch = document.querySelector(".textInput").value;
  const userInputNumber = document.querySelector(".numberInput").value;
  const userInputOptionPhoto = document.querySelector(".dropDown2").value;

  if (userInputSearch !=''&& userInputNumber!=''&& userInputOptionPhoto!=''){
    divImageContainer.innerHTML='';
    getDataFromInput(userInputSearch, userInputNumber, userInputOptionPhoto)
    console.log(userInputOptionPhoto);

  }else{alert('Name of Photos and Number cannot be Empty. Number should be above 0');

  }

}

//function som får alla input value från kliant sidan och stoppa in api url att får önskade data från det, exempel: antal bilder, sök name osv.
function getDataFromInput(imgData, numberData, relevantData) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c022d8ac7d8401ff4363499d291be510&text=${imgData}&sort=${relevantData}&per_page=${numberData}&format=json&nojsoncallback=1`
// fetch gör en anrop av api address
  fetch(url)
    .then((response) => {
      console.log(url);
      //if statmant gör att om responset från url 
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw createElement("It doesn't work it right now!");
      }
    })
    .then(displayImage)
    .catch((error) => {
      console.log(error +'fladsfjaldfjlasdjfa');
      createElement("Something went wrong try again!");
      createElementForImage();
    });
}

// fuctionen som får det önskade data från api-url
function displayImage(info) {

  // input value som utföra storlek for bilder
  const userInputPhotoSize = document.querySelector(".dropDown").value;

 // om input eller sökning inte vara söktbara då kliant får den här meddelande
  if (info.photos.photo==0) {
    createElement("Oops! There are no matches for search. Please try again!");
    
  }
// for each loppa genom data eller array som finns i apiUrl
  info.photos.photo.forEach((dataAPI) => {
    console.log(dataAPI);
    
    const apiUrl = `https://live.staticflickr.com/${dataAPI.server}/${dataAPI.id}_${dataAPI.secret}_${userInputPhotoSize}.jpg`;

    const imageHolder = document.createElement("img");
    const imageHaveClick = document.createElement("a");

    imageHaveClick.append(imageHolder);
    divImageContainer.append(imageHaveClick);

    imageHolder.src = apiUrl;
    imageHaveClick.href = apiUrl;
    imageHaveClick.target = `_blank`;
  });
}

// function som skappar nya elementer och appanda till divImageContaner.
function createElement(data) {
  const dataValue = document.createElement("h3");
  divImageContainer.append(dataValue);
  dataValue.innerText = data;
}

function createElementForImage(){
  const image=document.getElementsByClassName('.icon');
  divImageContainer.append(image);
  image.src ='img/confused.gif'
}
