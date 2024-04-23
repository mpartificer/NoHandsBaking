const footer = document.getElementById('footer');
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
const selectRecipe = document.getElementById('selectRecipe');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
var recipeList;
var offset;
var pageNumber;
var totalPages;
var i;
var storedRecipe;

async function retrieveRecipes(offset) {
  const searchValue = webpage.value;
  // template literals

  const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true&offset=${offset}`
  

  const findMyRecipe = await fetch(recipeSearch, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  recipeList = await findMyRecipe.json();
  console.log(recipeList);
  console.log(recipeList.results)

  return recipeList;
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

async function readMore(storedRecipe) {
  // var recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  // const selectMyRecipe = await fetch(recipeSelect, {
  //   headers: 
  //     {"Content-Type": "application/json"
  // }});

  // storedRecipe = await selectMyRecipe.json();
  // console.log(storedRecipe);

  var img = document.createElement("img");
  img.src = storedRecipe.image;
  imagePreview.appendChild(img);

  var ingredientHTML = await ingredientArray(storedRecipe);
  ingredientsPreview.appendChild(ingredientHTML);

  instructionsPreview.innerHTML = storedRecipe.instructions;

  console.log(imagePreview);
  console.log(ingredientsPreview);
  console.log(instructionsPreview);

  return storedRecipe;
}
async function instructionLoad(storedRecipe) {
  instructionsText.innerHTML = storedRecipe.instructions;
}

async function setRecipe(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const findMyRecipe = await selectMyRecipe.json();
  console.log(findMyRecipe);

  if (sessionStorage.getItem('storedRecipeTitle') != null) {
    sessionStorage.removeItem('storedRecipeTitle');
    sessionStorage.removeItem('storedRecipeId');
    sessionStorage.removeItem('storedRecipeIngredients');
    sessionStorage.removeItem('storedRecipeImage');
    sessionStorage.removeItem('storedRecipeInstructions');
  }

  const jsonObject = JSON.stringify(findMyRecipe)

  sessionStorage.setItem('storedRecipeTitle', jsonObject.title);
  sessionStorage.setItem('storedRecipeId', jsonObject.id);
  sessionStorage.setItem('storedRecipeInstructions', jsonObject.instructions);
  sessionStorage.setItem('storedRecipeIngredients', jsonObject.extendedIngredients);
  sessionStorage.setItem('storedRecipeImage', jsonObject.image);

}

async function letsBake(storedRecipe) {
  var ingredientHTML = await ingredientArray(storedRecipe);

  console.log(ingredientHTML);

  ingredients.appendChild(ingredientHTML);

  document.title = storedRecipe.title + " | No Hands Baking!";
  recipeTitle.innerHTML = storedRecipe.title;

  return storedRecipe;
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
    if (sessionStorage.getItem(`Title${i}`) != null) {
      sessionStorage.removeItem(`Title${i}`);
      sessionStorage.removeItem(`Id${i}`);
    }
    const recipeObj = document.getElementById(`Recipe${i+1}`)
    recipeObj.textContent = recipesList[i].title;
    document.getElementById(`recipe${i+1}View`).value = recipesList[i].id;
    document.getElementById(`recipe${i+1}Mise`).value = recipesList[i].id;

    const jsonObjectTitle = JSON.stringify(recipesList[i].title);
    const jsonObjectId = JSON.stringify(recipesList[i].id);
    sessionStorage.setItem(`Title${1}`, jsonObjectTitle);
    sessionStorage.setItem(`Id${i}`, jsonObjectId);
  }
}

buttonLink.addEventListener('click', async () => {
  offset = 0;
  pageNumber = 1;
  previousPage.disabled = true;
  recipeList = await retrieveRecipes(offset);
  totalPages = recipeList.totalResults / 10
  if (totalPages % 10 != 0) {
    totalPages = Math.floor(recipeList.totalResults/10) + 1;
  }
  // await buildSelectionHTML(recipesList);
  await recipeWaiter(recipeList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 

  recipeSelector.setAttribute('class', 'hideTheOpener');
})

nextPage.addEventListener('click', async () => {
  offset += 10
  pageNumber += 1;
  recipeList = await retrieveRecipes(offset);
  await recipeWaiter(recipeList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

previousPage.addEventListener('click', async () => {
  offset -= 10;
  pageNumber -= 1;
  recipeList = await retrieveRecipes(offset);
  await recipeWaiter(recipeList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

miseEnPlaceSet.addEventListener('click', async () => {
  await instructionLoad(storedRecipe);
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)

selectRecipe.addEventListener('click', async () => {
  await letsBake(storedRecipe.id);
  recipePreview.setAttribute('class', 'recipePreview');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe1View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe1View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe2View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe2View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe3View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe3View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe4View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe4View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe5View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe5View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe6View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe6View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe7View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe7View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe8View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe8View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe9View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe9View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe10View.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe10View.value);
  await readMore(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe1Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe1Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe2Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe2Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe3Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe3Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe4Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe4Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe5Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe5Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe6Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe6Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe7Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe7Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe8Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe8Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe9Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe9Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe10Mise.addEventListener('click', async () => {
  storedRecipe = await setRecipe(recipe10Mise.value);
  await letsBake(storedRecipe);
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

aboutUsButton.addEventListener('click', () => {
  footer.classList.add('class', 'aboutUsVisible');
})
