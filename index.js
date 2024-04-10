const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const instructions = document.getElementById('instructions');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";

async function logMovies() {

  // template literals

  const myName = 'Jillian'
  const myNameSentence = `My name is ${myName}, did you know?`
  634006
  console.log(myNameSentence)

// const url2 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query="banana%20bread"&instructionsRequired=true`
  const url = `https://api.spoonacular.com/recipes/634006/information?apiKey=${spoonacularKey}&includeNutrition=true`

  const response = await fetch(url, {
    headers: 
      {"Content-Type": "application/json"
  }});
  const recipesObj = await response.json();
  console.log(recipesObj);
  console.log(recipesObj.results)
}

buttonLink.addEventListener('click', async () => {
  logMovies();
  recipeTitle.setAttribute('class', 'recipeTitleVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)
