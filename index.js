console.log("Hello!")

const button = document.getElementById('test');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');

button.addEventListener('click', () => button.setAttribute('class', 'my-blue-thing'))

const buttonLink = document.getElementById('letsGoButton');

function toggle(htmlID) {
  if (htmlID.style.display === "none") {
    htmlID.style.display = "block";
  } else {
    htmlID.style.display = "none";
  }
}

async function retrieveWebString(){
    const linkToRecipe = document.getElementById('webpage');
    finalLink = linkToRecipe.value;
    return finalLink;
};

// const myLink = document.getElementById('myLink');

buttonLink.addEventListener('click', async () => {
  // console.log("myLink", myLink)

  //Backend
  const linkToRecipe = await retrieveWebString();
  recipeTitle.setAttribute('class', 'recipeTitleVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
  
  //Frontend
  // toggle(recipeTitle);

  //window.location = linkToRecipe;
  // myLink.setAttribute('href', linkToRecipe.value)
  console.log(linkToRecipe.value)
  fetch('https://api.codetabs.com/v1/proxy?quest=https://www.allrecipes.com/recipe/261983/tourtiere-french-canadian-meat-pie/').then((response) => response.text()).then((text) => console.log(text));

  
})

buttonLink.addEventListener('click', () => {
  miseEnPlace.SetAttribute('class', 'miseEnPlace')
})
