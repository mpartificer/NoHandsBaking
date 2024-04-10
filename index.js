const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const instructions = document.getElementById('instructions');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
var i;

async function retrieveRecipes() {
  const searchValue = webpage.value;
  // template literals

  const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true`
  

  const findMyRecipe = await fetch(recipeSearch, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const recipesObj = await findMyRecipe.json();
  console.log(recipesObj);
  console.log(recipesObj.results)

  return recipesObj;
}

async function recipePreview() {

}

async function recipeSelect() {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

}

function listView(recipesObj) {
  for (i = 0; i < recipesObj.length; i++) {
    elements[i].style.width = "100%";
  }
}

function gridView(recipesObj) {
  for (i = 0; i < recipesObj.length; i++) {
    elements[i].style.width = "50%";
  }
}

buttonLink.addEventListener('click', async () => {
  const recipesList = retrieveRecipes();
  // recipeTitle.setAttribute('class', 'recipeTitleVisible');
  // miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  // recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)
