const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const instructions = document.getElementById('instructions');
const recipeSelectionScreen = document.getElementById('recipeSelectionScreen');
const recipePreview = document.getElementById('recipePreview');
const imagePreview = document.getElementById('imagePreview');
const ingredientsPreview = document.getElementById('ingredientsPreview');
const instructionsPreview = document.getElementById('instructionsPreview');
const aboutUsButton = document.getElementById('aboutUsButton');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
const aboutUs = document.getElementById('aboutUs')
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

  return recipesObj.results;
}

async function readMore(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});

  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);

  imagePreview.textContent = recipesObj.image;
  ingredientsPreview.textContent = recipesObj.extendedIngredients;
  instructionsPreview.textContent = recipesObj.instructions;

  console.log(imagePreview);
  console.log(ingredientsPreview);
  console.log(instructionsPreview);

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

  mise

  return recipesObj
}

async function recipeWaiter(recipesList) {
  for (i = 0; i < recipesList.length; i++) {
    const recipeObj = document.getElementById(`Recipe${i+1}`)
    recipeObj.textContent = recipesList[i].title;
    document.getElementById(`recipe${i+1}View`).value = recipesList[i].id;
    document.getElementById(`recipe${i+1}Mise`).value = recipesList[i].id;
  }
}

buttonLink.addEventListener('click', async () => {
  const recipesList = await retrieveRecipes();
  await recipeWaiter(recipesList);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible');

  // await readMore(640386);
  // recipePreview.setAttribute('class', 'recipePreviewVisible')

  // recipeTitle.setAttribute('class', 'recipeTitleVisible');
  // miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)

// aboutUsButton.addEventListener('click', () => {
//   aboutUs.setAttribute('aboutUsVisible');
// })
