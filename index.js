const footer = document.getElementById('footer');
const wrapper = document.getElementById('wrapper');
const exitAboutUs = document.getElementById('exitAboutUs');
const backToResults = document.getElementById('backToResults');
const backToResults2 = document.getElementById('backToResults2');
const backToResults3 = document.getElementById('backToResults3');
const homeButton = document.getElementById('homeButton');
const settingsButton = document.getElementById('settingsButton');
const backToMise = document.getElementById('backToMise');
const searchTerm = document.getElementById('searchTerm');
const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const exitInfoPanel = document.getElementById('exitInfoPanel');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const enterInstructionMode = document.getElementById('enterInstructionMode');
const instructions = document.getElementById('instructions');
const recipeSelectionScreen = document.getElementById('recipeSelectionScreen');
const informationPanel = document.getElementById('informationPanel');
const recipePreview = document.getElementById('recipePreview');
const imagePreview = document.getElementById('imagePreview');
const ingredientsPreview = document.getElementById('ingredientsPreview');
const instructionsPreview = document.getElementById('instructionsPreview');
const instructionsText = document.getElementById('instructionsText');
const aboutUsButton = document.getElementById('aboutUsButton');
const aboutUs = document.getElementById('aboutUs')
const sayMore = document.getElementById('sayMore');
const ingredients = document.getElementById('ingredients');
const previousPage = document.getElementById('previousPage');
const nextPage = document.getElementById('nextPage');
const selectRecipe = document.getElementById('selectRecipe');
const readTest = document.getElementById('readTest');
const previousStep = document.getElementById('previousStep');
const repeatStep = document.getElementById('repeatStep');
const nextStep = document.getElementById('nextStep');
const muteOration = document.getElementById('muteOration');
const pauseMicrophone = document.getElementById('pauseMicrophone');
const errorPanel = document.getElementById('errorPanel');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
const synth = window.speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var columnPreview = document.getElementsByClassName('columnPreview');
var currentInstruction = 0;
var recipeList;
var stepCount;
var voice;
var offset;
var pageNumber;
var totalPages;
var i;


const grammarArray = ['next', 'back', 'repeat']
const grammar = `#JSGF V1.0; grammar commandWords; public <commandWord> = ${grammarArray.join(' | ')} ;`;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onresult = async (event) => {

  if (event.results.length > 0) {
  const mostRecentResult = event.results.length - 1;

  const commandWord = event.results[mostRecentResult][0].transcript.toLowerCase().trim();
  const confidence = event.results[mostRecentResult][0].confidence

  console.log(event.results)

  if (commandWord == "back" && confidence > 0.5) {
    previousFunction();
  }
  else if(commandWord == "repeat" && confidence > 0.5) {
    repeatFunction();
  }
  else if (commandWord == "next" && confidence > 0.5) {
    nextFunction();
  }
  else {
    console.log('Please try command again')
    console.log(commandWord)
  }
}
};


function repeatFunction() {
  const setAnimation = document.getElementById(`instructionList${currentInstruction}`);
  waitYourTurn(setAnimation.innerText)
}

function previousFunction() {
  currentInstruction -= 1;
  const setAnimation = document.getElementById(`instructionList${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionList${currentInstruction + 1}`);
  setAnimation.classList = "";
  setAnimation.classList.add('currentInstruction');
  setNextAnimation.classList = "";
  setNextAnimation.classList.add('nextInstruction');
  

  if (currentInstruction > 0) {
    const setPreviousAnimation = document.getElementById(`instructionList${currentInstruction - 1}`);
    
    if (setPreviousAnimation) {
    setPreviousAnimation.classList = "";
    setPreviousAnimation.classList.add(`previousInstruction`);
    }
  }

  if (currentInstruction < stepCount - 1) {
    const removeNextAnimation = document.getElementById(`instructionList${currentInstruction + 2}`);

    if (removeNextAnimation) {
    removeNextAnimation.classList = "";
    removeNextAnimation.classList.add('exitInstructionFront');
    }
  }

  if (currentInstruction < stepCount - 2) {
    const removeExit = document.getElementById(`instructionList${currentInstruction + 3}`);

    if (removeExit) {
    removeExit.classList = "";
    }
  }

  buttonCheck();

  console.log(currentInstruction)
  waitYourTurn(setAnimation.innerText)
}

function nextFunction() {
  currentInstruction += 1;
  const setAnimation = document.getElementById(`instructionList${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionList${currentInstruction + 1}`);
  const setPrevAnimation = document.getElementById(`instructionList${currentInstruction - 1}`);
  
  if (setPrevAnimation) {
  setPrevAnimation.classList = "";
  setPrevAnimation.classList.add('previousInstruction');
  }

  if (setAnimation) {
  setAnimation.classList = "";
  setAnimation.classList.add('currentInstruction');
  }

  if (currentInstruction > 1) {
    const exitingInstructionLoop = document.getElementById(`instructionList${currentInstruction - 2}`);
    if (exitingInstructionLoop) {
    exitingInstructionLoop.classList = "";
    exitingInstructionLoop.classList.add('exitInstructionFront')
    }
  }
  if (currentInstruction > 2) {
    const finalExit = document.getElementById(`instructionList${currentInstruction - 3}`);
    if (finalExit) {
    finalExit.classList = "";
    }
  }
  if (currentInstruction + 1 != stepCount) {
    if (setNextAnimation) {
    setNextAnimation.classList = "";
    setNextAnimation.classList.add('nextInstruction');
    }
  }

  buttonCheck();

  
  waitYourTurn(setAnimation.innerText)
}

function buttonCheck() {
  
  const trueCount = currentInstruction + 1;
  console.log(trueCount);
  console.log(stepCount);

  if (stepCount == trueCount) {
    nextStep.disabled = true;
  }
  else {
    console.log(trueCount);
    console.log(stepCount);
    nextStep.disabled = false;
  }

  if (trueCount == 1) {
    previousStep.disabled = true;
  }
  else {
    previousStep.disabled = false;
  }
}

function waitYourTurn(utterance) {
  recognition.stop()
  const utterThis = new SpeechSynthesisUtterance(utterance);
  utterThis.voice = voice;
  synth.speak(utterThis)

  utterThis.addEventListener("end", (event) => {
    recognition.start();
  });
}

async function retrieveRecipes(offset) {
  try {
  const searchValue = webpage.value;

  searchTerm.innerHTML = "";
  searchTerm.innerHTML = searchValue;
  const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true&offset=${offset}`
  // const recipeSearch = `https://api.spoonacular.commmmmmmm/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true&offset=${offset}`


  const findMyRecipe = await fetch(recipeSearch, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  recipeList = await findMyRecipe.json();

  const isItOk = findMyRecipe.ok;
  const whatIsStatus = findMyRecipe.status;

  console.log('isItOk', isItOk)
  console.log('whatIsStatus', whatIsStatus)


  return recipeList;
}
catch (err) {
  console.log('here is the error!!', err)
  if (err.code == "402") {
    errorPanel.innerHTML = "No Hands Baking has exhausted its Spoonacular calls for the day. Try again after 9:00 p.m. UTC.";
    errorPanel.style.visibility = 'visible';
    setTimeout(function(){
  }, 2000);
  errorPanel.style.visibility = 'hidden';

  }
  else {
    errorPanel.innerHTML = "Something has gone wrong, please try again";
    errorPanel.style.visibility = "visible";
    setTimeout(function(){
  }, 2000);
  errorPanel.style.visibility = 'hidden';
    
  }
}
}

async function manageInstructions(parsedInstructions) {

  var instructionInsert = "";
  instructionInsert += '<ul class="instructionListManager"><b>Instructions</b>';

  for (i = 0; i < parsedInstructions.length; i++) {
    instructionInsert += `<li id="instructionList${i}">`;
    instructionInsert += parsedInstructions[i];
    instructionInsert += `</li>`;
  }

  instructionInsert += `</ul>`;

  stepCount = parsedInstructions.length;

  return instructionInsert;
}

async function ingredientArray() {

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);
  const storedId = sessionStorage.getItem('storedRecipeId');
  const parsedId = JSON.parse(storedId);

  const ingredientsList = parsedIngredients;
  var ingredientHTML;
  ingredientHTML = '';
  ingredientHTML = '<ul class="instructionListManager"><b>Ingredients</b>';
    for (i = 0; i < ingredientsList.length; i++) {
      ingredientHTML += '<li>' + ingredientsList[i].original + '</li>'; 
    }
  ingredientHTML += `</ul>`;

  console.log(ingredientsList);

  document.getElementById('lockedAndLoadedButton').value = parsedId;
  return ingredientHTML;
}

async function readMore() {

  const image = sessionStorage.getItem('storedRecipeImage');
  const parsedImage = JSON.parse(image)

  var img = document.createElement("img");
  img.src = parsedImage;

  img.setAttribute('class', 'imggg'); 
  imagePreview.innerHTML = "";
  imagePreview.appendChild(img);

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);

  var ingredientHTML = await ingredientArray(parsedIngredients);
  ingredientsPreview.innerHTML = ingredientHTML;

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
  instructionsText.innerHTML = "";
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
  const instructionsArray = [];
  for (i = 0; i < findMyRecipe.analyzedInstructions[0].steps.length; i++) {
    instructionsArray.push(findMyRecipe.analyzedInstructions[0].steps[i].step)
  }
  const jsonObjectInstructions = JSON.stringify(instructionsArray)

  console.log(jsonObjectInstructions);

  sessionStorage.setItem('storedRecipeTitle', jsonObjectTitle);
  sessionStorage.setItem('storedRecipeId', jsonObjectId);
  sessionStorage.setItem('storedRecipeInstructions', jsonObjectInstructions);
  sessionStorage.setItem('storedRecipeIngredients', jsonObjectIngredients);
  sessionStorage.setItem('storedRecipeImage', jsonObjectImage);

}

async function setVoice() {
var voices = synth.getVoices();

  for (n = 0; n < voices.length; n++){
  if (voices[n].name == "Daniel (English (United Kingdom))") {
    voice = voices[n];
    console.log(voice);
  }
  }
}

async function letsBake() {

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);
  var ingredientHTML = await ingredientArray(parsedIngredients);
  ingredients.innerHTML = ingredientHTML;
}

async function buildSelectionScreen(i) {
  wrapper.innerHTML += `<div class="column" value="">
  <div id="Recipe${i+1}" class="recipeSelectionTitle"></div>
  <div class="buttonWrangler" id="buttonWrangler">
  <button id="recipe${i+1}View" class="readMoreButton" value="">Read more</button>
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

    console.log(document.getElementById(`recipe${i+1}View`).value)

    const jsonObjectTitle = JSON.stringify(recipesList[i].title);
    const jsonObjectId = JSON.stringify(recipesList[i].id);
    sessionStorage.setItem(`Title${i}`, jsonObjectTitle);
    sessionStorage.setItem(`Id${i}`, jsonObjectId);

  }
}

buttonLink.addEventListener('click', async () => {

  offset = 0;
  pageNumber = 1;
  document.body.style.cursor='wait';
  previousPage.disabled = true;

  try {
  recipeList = await retrieveRecipes(offset);
  console.log(recipeList)

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
  recipeSelectionScreen.style.visibility = 'visible';

  recipeSelector.setAttribute('class', 'hideTheOpener');
  document.body.style.cursor='default';
}
  catch(err) {
    if (err.code == "402") {
      errorPanel.innerHTML = "No Hands Baking has exhausted its Spoonacular calls for the day. Try again after 9:00 p.m. UTC.";
      errorPanel.style.visibility = 'visible';
      setTimeout(function(){
    }, 2000);
    errorPanel.style.visibility = 'hidden';

    }
    else {
      errorPanel.innerHTML = "Something has gone wrong, please try again";
      errorPanel.style.visibility = "visible";
      setTimeout(function(){
    }, 2000);
    errorPanel.style.visibility = 'hidden';
      
    }
  }
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
  await setVoice();
  currentInstruction = 0;
  const setAnimation = document.getElementById(`instructionList${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionList${currentInstruction + 1}`);
  previousStep.disabled = true;
  setAnimation.setAttribute('class', 'currentInstruction');
  setNextAnimation.setAttribute('class', 'nextInstruction');
  instructions.classList.add('instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
  informationPanel.style.visibility = 'visible';
})


selectRecipe.addEventListener('click', async () => {
  await letsBake();
  recipePreview.setAttribute('class', 'recipePreview');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
})

aboutUsButton.addEventListener('click', () => {
  sayMore.classList.add('class', 'sayMoreVisible');
  footer.classList.add('class', 'aboutUsVisible');
  exitAboutUs.setAttribute('class', 'aboutUsExitVisible')
})

exitAboutUs.addEventListener('click', () => {
  footer.classList.add('goAwayAbout');
  sayMore.setAttribute('class', 'sayMore');
  exitAboutUs.setAttribute('class', 'aboutUsExitButton')
  
  setTimeout(function(){
  }, 2000);
  console.log(3);
  footer.classList.remove('aboutUsVisible');
  footer.classList.remove('goAwayAbout');
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

previousStep.addEventListener('click', async () => {
  previousFunction();
})

nextStep.addEventListener('click', async () => {
  nextFunction();
})

repeatStep.addEventListener('click', async () => {
  repeatFunction();
})

exitInfoPanel.addEventListener('click', () => {
  informationPanel.style.visibility = "hidden";
  exitInfoPanel.style.visibility = "hidden";

  repeatFunction();

  recognition.start();
})

settingsButton.addEventListener('click', () => {
  informationPanel.style.visibility = "visible";
  exitInfoPanel.style.visibility = "visible";
})

document.addEventListener( "click", previewListener);
// document.addEventListener('click', miseListener);




// const recipe1View = document.getElementById('recipe1View');
// const recipe2View = document.getElementById('recipe2View');
// const recipe3View = document.getElementById('recipe3View');
// const recipe4View = document.getElementById('recipe4View');
// const recipe5View = document.getElementById('recipe5View');
// const recipe6View = document.getElementById('recipe6View');
// const recipe7View = document.getElementById('recipe7View');
// const recipe8View = document.getElementById('recipe8View');
// const recipe9View = document.getElementById('recipe9View');
// const recipe10View = document.getElementById('recipe10View');

// var buttonArray = [recipe1View, recipe2View, recipe3View, recipe4View, recipe5View, recipe6View, recipe7View, recipe8View, recipe9View, recipe10View]


// for (i = 0; i < buttonArray.length; i++) {

//   const myButton = buttonArray[i]

//   myButton.addEventListener(async () => {
//     recipeIdTag = document.getElementById(`${myButton.id}`).value
//     await setRecipe(recipeIdTag);
//     await readMore();
//     recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
//     recipePreview.setAttribute('class', 'recipePreviewVisible');
//   })
// }





async function previewListener(event){
  var element = event.target;

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

  var buttonArray = [recipe1View, recipe2View, recipe3View, recipe4View, recipe5View, recipe6View, recipe7View, recipe8View, recipe9View, recipe10View]

  for (i = 0; i < buttonArray.length; i++) {

    if(element.id == buttonArray[i].id && element.classList.contains("readMoreButton")){
      recipeIdTag = document.getElementById(`${buttonArray[i].id}`).value
      await setRecipe(recipeIdTag);
      await readMore();
      const storedTitle = sessionStorage.getItem('storedRecipeTitle');
      const parsedTitle = JSON.parse(storedTitle);
      recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
      recipeSelectionScreen.style.height = 0;
      recipePreview.setAttribute('class', 'recipePreviewVisible');
    }
  }
}

// async function miseListener(event) {
//   var element = event.target;

//   const recipe1Mise = document.getElementById('recipe1Mise');
//   const recipe2Mise = document.getElementById('recipe2Mise');
//   const recipe3Mise = document.getElementById('recipe3Mise');
//   const recipe4Mise = document.getElementById('recipe4Mise');
//   const recipe5Mise = document.getElementById('recipe5Mise');
//   const recipe6Mise = document.getElementById('recipe6Mise');
//   const recipe7Mise = document.getElementById('recipe7Mise');
//   const recipe8Mise = document.getElementById('recipe8Mise');
//   const recipe9Mise = document.getElementById('recipe9Mise');
//   const recipe10Mise = document.getElementById('recipe10Mise');

//   var buttonArray = [recipe1Mise, recipe2Mise, recipe3Mise, recipe4Mise, recipe5Mise, recipe6Mise, recipe7Mise, recipe8Mise, recipe9Mise, recipe10Mise];
//   for (i = 0; i < buttonArray.length; i++) {

//     if(element.id == buttonArray[i].id && element.classList.contains("readMoreButton")){
//       recipeIdTag = document.getElementById(`${buttonArray[i].id}`).value
//       await setRecipe(recipeIdTag);
//       await letsBake();
//       recipeSelectionScreen.style.visibility = 'hidden';
//       recipeSelectionScreen.style.height = 0;
//       miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
//     }
//   }
// }


// if (muteOration.checked == true){
    
//   } else {
//      text.style.display = "none";
//   }

// if (pauseMicrophone.checked == true){
//     recognition.stop();
//   } else {
//     recognition.start();
//   }