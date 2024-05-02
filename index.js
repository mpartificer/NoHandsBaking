const footer = document.getElementById('footer');
const wrapper = document.getElementById('wrapper');
const exitAboutUs = document.getElementById('exitAboutUs');
const backToResults = document.getElementById('backToResults');
const backToResults2 = document.getElementById('backToResults2');
const backToResults3 = document.getElementById('backToResults3');
const homeButton = document.getElementById('homeButton');
const backToMise = document.getElementById('backToMise');
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
const sayMore = document.getElementById('sayMore');
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

async function manageInstructions(parsedInstructions) {
  const yesOrNot = parsedInstructions.startsWith('<ol>');
  if (yesOrNot == true) {
    var instructionInsert = `<div class="instructionsVisible--container">`;
    instructionInsert += `<ul class="content__container__list">`;
    instructionInsert += parsedInstructions;
    instructionInsert += `</div>`
    return parsedInstructions;
  }
  else {
    const instructionsArray = parsedInstructions.split('. ');

    var instructionInsert = "";
    instructionInsert = `<div class="instructionsVisible__container">`
    instructionInsert += '<ol class="instructionsVisible__container__list">';

    for (i = 0; i < instructionsArray.length; i++) {
      instructionInsert += `<li class="instructionsVisible__container__list__item">`;
      instructionInsert += instructionsArray[i];
      instructionInsert += `</li>`;
    }

    instructionInsert += `</ol></div>`;


    console.log(instructionInsert)

    return instructionInsert;
    
  }
}

async function ingredientArray() {

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);
  const storedId = sessionStorage.getItem('storedRecipeId');
  const parsedId = JSON.parse(storedId);

  const ingredientsList = parsedIngredients;
  var ingredientHTML = document.createElement("p");
  ingredientHTML.innerHTML = '<ul>';
    for (i = 0; i < ingredientsList.length; i++) {
      ingredientHTML.innerHTML += '<li>' + ingredientsList[i].original + '</li>';
    }
  ingredientHTML.innerHTML += `</ul>`;

  console.log(ingredientsList);

  document.getElementById('lockedAndLoadedButton').value = parsedId;
  return ingredientHTML;
}

function resizeImage(image) {
  var canvas = document.createElement('canvas');
  var maxWidth = window.innerWidth * 0.40; // Define the maximum width of the image
  var maxHeight = 600; // Define the maximum height of the image
  var width = image.width;
  var height = image.height;

  // Calculate the new dimensions, maintaining the aspect ratio
  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }

  // Set the canvas dimensions to the new dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw the resized image on the canvas
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  // Insert the canvas into the DOM or use it otherwise
  imagePreview.innerHTML = "";
  imagePreview.appendChild(canvas);
}

async function readMore() {

  const image = sessionStorage.getItem('storedRecipeImage');
  const parsedImage = JSON.parse(image)

  var img = document.createElement("img");
  img.src = parsedImage;
  img.onload = function() {
    resizeImage(img);
  };

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);

  var ingredientHTML = await ingredientArray(parsedIngredients);
  ingredientsPreview.innerHTML = "";
  ingredientsPreview.appendChild(ingredientHTML);

  const storedInstructions = sessionStorage.getItem('storedRecipeInstructions');
  const parsedInstructions = JSON.parse(storedInstructions);
  var formattedInstructions = await manageInstructions(parsedInstructions);
  console.log(formattedInstructions) // .split(". ")
  instructionsPreview.innerHTML = formattedInstructions;
}

async function instructionLoad() {
  const storedInstructions = sessionStorage.getItem('storedRecipeInstructions');
  const parsedInstructions = JSON.parse(storedInstructions);
  var formattedInstructions = await manageInstructions(parsedInstructions);
  instructionsText.innerHTML = formattedInstructions;
}

async function setRecipe(recipeID) {
  const recipeSelect = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${spoonacularKey}`

  const selectMyRecipe = await fetch(recipeSelect, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  const findMyRecipe = await selectMyRecipe.json();
  console.log(findMyRecipe);

  if (sessionStorage.getItem('storedRecipeTitle') != undefined) {
    sessionStorage.removeItem('storedRecipeTitle');
    sessionStorage.removeItem('storedRecipeId');
    sessionStorage.removeItem('storedRecipeIngredients');
    sessionStorage.removeItem('storedRecipeImage');
    sessionStorage.removeItem('storedRecipeInstructions');
  }

  const jsonObjectTitle = JSON.stringify(findMyRecipe.title);
  const jsonObjectId = JSON.stringify(findMyRecipe.id);
  const jsonObjectIngredients = JSON.stringify(findMyRecipe.extendedIngredients);
  const jsonObjectImage = JSON.stringify(findMyRecipe.image);
  const jsonObjectInstructions = JSON.stringify(findMyRecipe.instructions);

  sessionStorage.setItem('storedRecipeTitle', jsonObjectTitle);
  sessionStorage.setItem('storedRecipeId', jsonObjectId);
  sessionStorage.setItem('storedRecipeInstructions', jsonObjectInstructions);
  sessionStorage.setItem('storedRecipeIngredients', jsonObjectIngredients);
  sessionStorage.setItem('storedRecipeImage', jsonObjectImage);

}

async function letsBake() {

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);
  var ingredientHTML = await ingredientArray(parsedIngredients);
  ingredients.appendChild(ingredientHTML);

  const storedTitle = sessionStorage.getItem('storedRecipeTitle');
  const parsedTitle = JSON.parse(storedTitle);
  document.title = parsedTitle + " | No Hands Baking!";
  recipeTitle.innerHTML = parsedTitle;
}

async function buildSelectionScreen(i) {
  wrapper.innerHTML += `<div class="column" value="">
  <div id="Recipe${i+1}" class="recipeSelectionTitle"></div>
  <div class="buttonWrangler" id="buttonWrangler">
  <button id="recipe${i+1}View" class="readMoreButton" value="">Read more</button>
  <button id="recipe${i+1}Mise" class="readMoreButton" value="">Let's Bake!</button>
  </div></div>`;
}

async function recipeWaiter(recipesList) {
  wrapper.innerHTML = "";

  for (i = 0; i < recipesList.length; i++) {
    if (sessionStorage.getItem(`Title${i}`) != null) {
      sessionStorage.removeItem(`Title${i}`);
      sessionStorage.removeItem(`Id${i}`);
    }

    await buildSelectionScreen(i);
    const recipeObj = document.getElementById(`Recipe${i+1}`)
    recipeObj.textContent = recipesList[i].title;
    document.getElementById(`recipe${i+1}View`).value = recipesList[i].id;
    document.getElementById(`recipe${i+1}Mise`).value = recipesList[i].id;

    const jsonObjectTitle = JSON.stringify(recipesList[i].title);
    const jsonObjectId = JSON.stringify(recipesList[i].id);
    sessionStorage.setItem(`Title${i}`, jsonObjectTitle);
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
  if (pageNumber == 1 && pageNumber != totalPages) {
    previousPage.disabled = true;
    nextPage.disabled = false;
  }
  else if (pageNumber != 1 && pageNumber == totalPages) {
    previousPage.disabled = false;
    nextPage.disabled = true;
  }
  else if (pageNumber == 1 && pageNumber == totalPages) {
    nextPage.disabled = true;
    previousPage.disabled = true;
  }
  else if (pageNumber != 1 && pageNumber != totalPages) {
    nextPage.disabled = false;
    previousPage.disabled = false;
  }
  
  console.log(totalPages)
  await recipeWaiter(recipeList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 

  recipeSelector.setAttribute('class', 'hideTheOpener');
})

nextPage.addEventListener('click', async () => {
  offset += 10
  pageNumber += 1;
  recipeList = await retrieveRecipes(offset);
  if (pageNumber == 1 && pageNumber != totalPages) {
    previousPage.disabled = true;
    nextPage.disabled = false;
  }
  else if (pageNumber != 1 && pageNumber == totalPages) {
    previousPage.disabled = false;
    nextPage.disabled = true;
  }
  else if (pageNumber == 1 && pageNumber == totalPages) {
    nextPage.disabled = true;
    previousPage.disabled = true;
  }
  else if (pageNumber != 1 && pageNumber != totalPages) {
    nextPage.disabled = false;
    previousPage.disabled = false;
  }
  await recipeWaiter(recipeList.results);
  console.log(totalPages)
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

previousPage.addEventListener('click', async () => {
  offset -= 10;
  pageNumber -= 1;
  recipeList = await retrieveRecipes(offset);
  if (pageNumber == 1 && pageNumber != totalPages) {
    previousPage.disabled = true;
    nextPage.disabled = false;
  }
  else if (pageNumber != 1 && pageNumber == totalPages) {
    previousPage.disabled = false;
    nextPage.disabled = true;
  }
  else if (pageNumber == 1 && pageNumber == totalPages) {
    nextPage.disabled = true;
    previousPage.disabled = true;
  }
  else if (pageNumber != 1 && pageNumber != totalPages) {
    nextPage.disabled = false;
    previousPage.disabled = false;
  }
  await recipeWaiter(recipeList.results);
  document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible'); 
})

miseEnPlaceSet.addEventListener('click', async () => {
  await instructionLoad();
  instructions.classList.add('instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)

selectRecipe.addEventListener('click', async () => {
  await letsBake();
  recipePreview.setAttribute('class', 'recipePreview');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe1View.addEventListener('click', async () => {
  await setRecipe(recipe1View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe2View.addEventListener('click', async () => {
  await setRecipe(recipe2View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe3View.addEventListener('click', async () => {
  await setRecipe(recipe3View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe4View.addEventListener('click', async () => {
  await setRecipe(recipe4View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe5View.addEventListener('click', async () => {
  await setRecipe(recipe5View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe6View.addEventListener('click', async () => {
  await setRecipe(recipe6View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe7View.addEventListener('click', async () => {
  await setRecipe(recipe7View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe8View.addEventListener('click', async () => {
  await setRecipe(recipe8View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe9View.addEventListener('click', async () => {
  await setRecipe(recipe9View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe10View.addEventListener('click', async () => {
  await setRecipe(recipe10View.value);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipePreview.setAttribute('class', 'recipePreviewVisible');
})

recipe1Mise.addEventListener('click', async () => {
  await setRecipe(recipe1Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe2Mise.addEventListener('click', async () => {
  await setRecipe(recipe2Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe3Mise.addEventListener('click', async () => {
  await setRecipe(recipe3Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe4Mise.addEventListener('click', async () => {
  await setRecipe(recipe4Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe5Mise.addEventListener('click', async () => {
  await setRecipe(recipe5Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe6Mise.addEventListener('click', async () => {
  await setRecipe(recipe6Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe7Mise.addEventListener('click', async () => {
  await setRecipe(recipe7Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe8Mise.addEventListener('click', async () => {
  await setRecipe(recipe8Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe9Mise.addEventListener('click', async () => {
  await setRecipe(recipe9Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

recipe10Mise.addEventListener('click', async () => {
  await setRecipe(recipe10Mise.value);
  await letsBake();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

aboutUsButton.addEventListener('click', () => {
  sayMore.classList.add('class', 'sayMoreVisible');
  footer.classList.add('class', 'aboutUsVisible');
})

exitAboutUs.addEventListener('click', () => {
  footer.classList.add('class', 'aboutUsExitButton');
  footer.setAttribute('class', 'footer');
  sayMore.setAttribute('class', 'sayMore');
})

backToResults.addEventListener('click', () => {
  recipePreview.setAttribute('class', 'recipePreview');
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible');
})

backToResults2.addEventListener('click', () => {
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible');
})

backToResults3.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructions');
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreenVisible');
})

backToMise.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructions');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible')
})

homeButton.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructions');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
  recipePreview.setAttribute('class', 'recipePreview');
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipeSelector.setAttribute('class', 'opener');
})