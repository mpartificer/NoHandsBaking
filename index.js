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
const recipe1View = document.getElementById('recipe1View');
const recipe2View = document.getElementById('recipe2View');
const recipe3View = document.getElementById('recipe3View');
const recipe4View = document.getElementById('recipe4View');
const recipe5View = document.getElementById('recipe5View');
const recipe6View = document.getElementById('recipe6View');
const recipe7View = document.getElementById('recipe7View');
const recipe8View = document.getElementById('recipe8View');
const recipe9View = document.getElementById('recipe9View');
const recipe10View = document.getElementById('recipe10View');
const recipe1Mise = document.getElementById('recipe1Mise');
const recipe2Mise = document.getElementById('recipe2Mise');
const recipe3Mise = document.getElementById('recipe3Mise');
const recipe4Mise = document.getElementById('recipe4Mise');
const recipe5Mise = document.getElementById('recipe5Mise');
const recipe6Mise = document.getElementById('recipe6Mise');
const recipe7Mise = document.getElementById('recipe7Mise');
const recipe8Mise = document.getElementById('recipe8Mise');
const recipe9Mise = document.getElementById('recipe9Mise');
const recipe10Mise = document.getElementById('recipe10Mise');
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

  // recipeTitle.setAttribute('class', 'recipeTitleVisible');
  // miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)

recipe1View.addEventListener('click', async () => {
  await readMore(recipe1View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe2View.addEventListener('click', async () => {
  await readMore(recipe2View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe3View.addEventListener('click', async () => {
  await readMore(recipe3View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe4View.addEventListener('click', async () => {
  await readMore(recipe4View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe5View.addEventListener('click', async () => {
  await readMore(recipe5View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe6View.addEventListener('click', async () => {
  await readMore(recipe6View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe7View.addEventListener('click', async () => {
  await readMore(recipe7View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe8View.addEventListener('click', async () => {
  await readMore(recipe8View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe9View.addEventListener('click', async () => {
  await readMore(recipe9View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe10View.addEventListener('click', async () => {
  await readMore(recipe10View.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe1Mise.addEventListener('click', async () => {
  await letsBake(recipe1Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe2Mise.addEventListener('click', async () => {
  await letsBake(recipe2Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe3Mise.addEventListener('click', async () => {
  await letsBake(recipe3Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe4Mise.addEventListener('click', async () => {
  await letsBake(recipe4Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe5Mise.addEventListener('click', async () => {
  await letsBake(recipe5Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe6Mise.addEventListener('click', async () => {
  await letsBake(recipe6Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe7Mise.addEventListener('click', async () => {
  await letsBake(recipe7Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe8Mise.addEventListener('click', async () => {
  await letsBake(recipe8Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe9Mise.addEventListener('click', async () => {
  await letsBake(recipe9Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe10Mise.addEventListener('click', async () => {
  await letsBake(recipe10Mise.value);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

// aboutUsButton.addEventListener('click', () => {
//   aboutUs.setAttribute('aboutUsVisible');
// })
