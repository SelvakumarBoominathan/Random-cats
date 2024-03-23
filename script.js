const fetchCatFacts = async () => {
  const API = "https://cat-fact.herokuapp.com/facts/random";
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.text; // Return the fact text
  } catch (error) {
    console.error('Error fetching cat facts:', error);
  }
};

const fetchCatPicture = async () => {
  const API_PICTURE = "https://api.thecatapi.com/v1/images/search";
  try {
    const response = await fetch(API_PICTURE);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0].url; // Return the image URL
  } catch (error) {
    console.error('Error fetching cat picture:', error);
  }
};

const renderData = async () => {
  const catFactsDiv = document.querySelector('.catFacts');
  const catPicturesDiv = document.querySelector('.catPictures');
  catFactsDiv.innerHTML = ''; // Clear previous facts
  catPicturesDiv.innerHTML = ''; // Clear previous pictures

  const fact = await fetchCatFacts();
  // if (fact) {
  const factElement = document.createElement('p');
  factElement.textContent = fact;
  catFactsDiv.appendChild(factElement);
  // }

  const pictureUrl = await fetchCatPicture();
  if (pictureUrl) {
    const pictureElement = document.createElement('img');
    pictureElement.src = pictureUrl;
    pictureElement.alt = 'Random Cat Picture';
    catPicturesDiv.appendChild(pictureElement);
  }
};

const fetchDataBtn = document.querySelector('.fetchDataBtn');
fetchDataBtn.addEventListener('click', renderData);