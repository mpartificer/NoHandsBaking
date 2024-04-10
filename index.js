const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const instructions = document.getElementById('instructions');
const recipeSelectionScreen = document.getElementById('recipeSelectionScreen');
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

function listView() {
  for (i = 0; i < 10; i++) {
    elements[i].style.width = "100%";
  }
}

function gridView() {
  for (i = 0; i < 10; i++) {
    elements[i].style.width = "50%";
  }
}

async function readMore(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);
  console.log(recipesObj.results)

  return recipesObj;
}

async function letsBake(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);
  console.log(recipesObj.results)

  return recipesObj;
}

async function recipeWaiter(recipesList) {
  for (i = 0; i < recipesList.length; i++) {
    document.GetElementById(`Recipe${i+1}`).innerHTML=recipesList[i].title;
    const viewButton = document.getElementById(`recipe${i+1}View`)
    const miseButton = document.getElementById(`recipe${i+1}Mise`)
    const grabID = recipesList[i].id;
    viewButton.value = grabID;
    miseButton.value = grabID;
  }
}

buttonLink.addEventListener('click', async () => {
  const recipesList = await retrieveRecipes();
  await recipeWaiter(recipesList);
  
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible');
  // recipeTitle.setAttribute('class', 'recipeTitleVisible');
  // miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)
