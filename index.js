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
const instructionsText = document.getElementById('instructionsText');
const aboutUsButton = document.getElementById('aboutUsButton');
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
const ingredients = document.getElementById('ingredients');
const previousPage = document.getElementById('previousPage');
const nextPage = document.getElementById('nextPage');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
var offset;
var i;

async function retrieveRecipes(offset) {
  const searchValue = webpage.value;
  // template literals

  const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true&offset=${offset}`
  

  const findMyRecipe = await fetch(recipeSearch, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const recipesObj = await findMyRecipe.json();
  console.log(recipesObj);
  console.log(recipesObj.results)

  return recipesObj;
}

async function ingredientArray(recipeObj) {
const ingredientsList = recipeObj.extendedIngredients;
var ingredientHTML = document.createElement("p");
ingredientHTML.innerHTML = '<ul>';
  for (i = 0; i < ingredientsList.length; i++) {
    ingredientHTML.innerHTML += '<li>' + ingredientsList[i].original + '</li>';
  }
ingredientHTML.innerHTML += `</ul>`;

console.log(ingredientsList);

document.getElementById('lockedAndLoadedButton').value = recipeObj.id;
return ingredientHTML;
}

async function readMore(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});

  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);

  var img = document.createElement("img");
  img.src = recipesObj.image;
  imagePreview.appendChild(img);

  var ingredientHTML = await ingredientArray(recipesObj);
  ingredientsPreview.appendChild(ingredientHTML);

  instructionsPreview.innerHTML = recipesObj.instructions;

  console.log(imagePreview);
  console.log(ingredientsPreview);
  console.log(instructionsPreview);

  return recipesObj;
}
async function instructionLoad(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers:
    {"Content-Type": "application/json"}
  });

  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);

  instructionsText.innerHTML = recipesObj.instructions;
}

async function letsBake(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const recipesObj = await selectMyRecipe.json();
  console.log(recipesObj);

  var ingredientHTML = await ingredientArray(recipesObj);

  console.log(ingredientHTML);

  ingredients.appendChild(ingredientHTML);

  document.title = recipesObj.title + " | No Hands Baking!";
  recipeTitle.innerHTML = recipesObj.title;

  return recipesObj
}

// async function buildSelectionHTML(recipesList){
//   var ingredientHTML = document.createElement("p");

//   ingredientHTML.innerHTML = '<div class="wrapper">';
//     for (i = 0; i < recipesList.length; i++) {
//       ingredientHTML.innerHTML += '<div class="column" value="">'
//       ingredientHTML.innerHTML += `<div id="Recipe${i+1}">Recipe 1</div>`
//       ingredientHTML.innerHTML += '<p></p>'
//       ingredientHTML.innerHTML += `<button id="recipe${i+1}View" class="readMoreButton" value="">Read more</button>`
//       ingredientHTML.innerHTML += `<button id="recipe${i+1}Mise" class="readMoreButton" value="">Let\'s Bake!</button>`
//       ingredientHTML.innerHTML += '</div>';
//     }

//   ingredientHTML.innerHTML += `</div>`;

//   recipeSelectionScreen.appendChild(ingredientHTML);
// }

async function recipeWaiter(recipesList) {
  for (i = 0; i < recipesList.length; i++) {
    const recipeObj = document.getElementById(`Recipe${i+1}`)
    recipeObj.textContent = recipesList[i].title;
    document.getElementById(`recipe${i+1}View`).value = recipesList[i].id;
    document.getElementById(`recipe${i+1}Mise`).value = recipesList[i].id;
  }
}

buttonLink.addEventListener('click', async () => {
  offset = 0;
  var pageNumber = 1;
  const recipesList = await retrieveRecipes(offset);
  var totalPages = recipesList.totalResults / 10
  // await buildSelectionHTML(recipesList);
  await recipeWaiter(recipesList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 

  recipeSelector.setAttribute('class', 'hideTheOpener');
})

nextPage.addEventListener('click', async () => {
  offset += 10
  const recipesList = await retrieveRecipes(offset);
  await recipeWaiter(recipesList.results);
  document.getElementById('selectorPageTracker').innerHTML = 
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

previousPage.addEventListener('click', async () => {
  offset -= 10;
  const recipesList = await retrieveRecipes(offset);
  await recipeWaiter(recipesList.results);
  document.getElementById('selectorPageTracker').innerHTML = 
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

miseEnPlaceSet.addEventListener('click', async () => {
  await instructionLoad(1003464);
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

aboutUsButton.addEventListener('click', () => {
  aboutUs.setAttribute('aboutUsVisible');
})
