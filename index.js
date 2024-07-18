const footer = document.getElementById('footer');
const wrapper = document.getElementById('wrapper');
const exitAboutUs = document.getElementById('exitAboutUs');
const backToResults = document.getElementById('backToResults');
const homeButton = document.getElementById('homeButton');
const searchInput = document.getElementById('webpage');
const settingsButton = document.getElementById('settingsButton');
const ingredientReminderImage = document.getElementById('ingredientReminderImage');
const ingredientInsert = document.getElementById('ingredientInsert');
const ingredientReminderPanel = document.getElementById('ingredientReminderPanel');
const exitIngRemPanel = document.getElementById('exitIngRemPanel');
const backToMise = document.getElementById('backToMise');
const searchTerm = document.getElementById('searchTerm');
const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const exitInfoPanel = document.getElementById('exitInfoPanel');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const exitMisePanel = document.getElementById('exitMisePanel');
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
const recipePreviewTitle = document.getElementById('recipePreviewTitle');
const spoonacularKey = "3c5ec8b2939641a99e28c6023598b2d4";
const synth = window.speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var columnPreview = document.getElementsByClassName('columnPreview');
var currentInstruction = 0;
var recipeList;
var synthVolume = 1;
var microphoneBox = 0;
var backMicControl = 0;
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

recognition.addEventListener('end', () => {
  
  if (microphoneBox == 0 && backMicControl == 0) {
    console.log('iamonend', `${microphoneBox}`);
    recognition.start();
  }

  if (backMicControl == 1) {
    backMicControl = 0;
  }
})


function repeatFunction() {
  const setAnimation = document.getElementById(`instructionListItem${currentInstruction}`);
  waitYourTurn(setAnimation.innerText)
}

function previousFunction() {
  currentInstruction -= 1;
  const setAnimation = document.getElementById(`instructionListItem${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionListItem${currentInstruction + 1}`);
  setAnimation.classList = "";
  setAnimation.classList.add('currentInstruction');
  setNextAnimation.classList = "";
  setNextAnimation.classList.add('previousInstruction');
  

  if (currentInstruction > 0) {
    const setPreviousAnimation = document.getElementById(`instructionListItem${currentInstruction - 1}`);
    
    if (setPreviousAnimation) {
    setPreviousAnimation.classList = "";
    setPreviousAnimation.classList.add(`nextInstruction`);
    }
  }

  if (currentInstruction < stepCount - 1) {
    const removeNextAnimation = document.getElementById(`instructionListItem${currentInstruction + 2}`);

    if (removeNextAnimation) {
    removeNextAnimation.classList = "";
    removeNextAnimation.classList.add('exitInstructionFront');
    }
  }

  if (currentInstruction < stepCount - 2) {
    const removeExit = document.getElementById(`instructionListItem${currentInstruction + 3}`);

    if (removeExit) {
    removeExit.classList = "";
    }
  }

  scrollParentToChild(instructionsText, setAnimation);
  buttonCheck();

  waitYourTurn(setAnimation.innerText)
}

function nextFunction() {
  currentInstruction += 1;
  const setAnimation = document.getElementById(`instructionListItem${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionListItem${currentInstruction + 1}`);
  const setPrevAnimation = document.getElementById(`instructionListItem${currentInstruction - 1}`);
  const exitingInstructionLoop = document.getElementById(`instructionListItem${currentInstruction - 2}`);
  const finalExit = document.getElementById(`instructionListItem${currentInstruction - 3}`);

  if (setPrevAnimation) {
    setPrevAnimation.classList = "";
    setPrevAnimation.classList.add('previousInstruction');
  }

  if (setAnimation) {
    setAnimation.classList = "";
    setAnimation.classList.add('currentInstruction');
  }

  if (exitingInstructionLoop) {
    console.log(exitingInstructionLoop);
    exitingInstructionLoop.classList.remove('previousInstruction');
    exitingInstructionLoop.classList.add('exitInstructionFront');
  }

  if (finalExit) {
    finalExit.classList.remove('exitInstructionFront');
  }

  if ((currentInstruction + 1) != stepCount) {
    if (setNextAnimation) {
      setNextAnimation.classList = "";
      setNextAnimation.classList.add('nextInstruction');
    }
  }

  scrollParentToChild(instructionsText, setAnimation);
  buttonCheck();

  waitYourTurn(setAnimation.innerText)
}

function scrollParentToChild(parent, child) {
  var parentRect = parent.getBoundingClientRect();
  var parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };

  var childRect = child.getBoundingClientRect();
  var isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);

  if (!isViewable) {
        const scrollTop = childRect.top - parentRect.top;
        const scrollBot = childRect.bottom - parentRect.bottom;
        if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
            parent.scrollTop += scrollTop;
        } else {
            parent.scrollTop += scrollBot;
        }
  }

}

function buttonCheck() {
  
  const trueCount = currentInstruction + 1;

  if (stepCount == trueCount) {
    nextStep.disabled = true;
  }
  else {
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
  const utterThis = new SpeechSynthesisUtterance(utterance);
  utterThis.voice = voice;
  utterThis.volume = synthVolume;
  synth.speak(utterThis)
}

async function retrieveRandomRecipes() {
  try {
    searchTerm.innerHTML = "RANDOM";
    const recipeSearch = `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularKey}&number=10`
  
    const findMyRecipe = await fetch(recipeSearch, {
      headers: 
        {"Content-Type": "application/json"
    }});
    
    recipeList = await findMyRecipe.json();
  
    const isItOk = findMyRecipe.ok;
    const whatIsStatus = findMyRecipe.status;
  
    console.log('isItOk', isItOk)
    console.log('whatIsStatus', whatIsStatus)
  
  
    if (!findMyRecipe.ok) {
      const responseError = {
        type: 'Error',
        message: recipeList.message || 'Something went wrong',
        data: recipeList.data || '', 
        code: recipeList.code || '',
      };
    
      let error = new Error();
      error = { ...error, ...responseError };
      throw (error);
    };
  
    return recipeList;
  }
  catch (err) {
    console.log('here is the error!!', err, typeof err)
    if (err.code == "402") {
      console.log('it is a 402!!', err)
      errorPanel.innerHTML = "";
      errorPanel.innerHTML = "No Hands Baking has exhausted its Spoonacular calls for the day. Try again after 9:00 p.m. UTC.";
      errorPanel.style.visibility = 'visible';
  
      setTimeout(function(){
        errorPanel.style.visibility = 'hidden';
      }, 5000);
    }
    else {
      errorPanel.innerHTML = "";
      errorPanel.innerHTML = "Something has gone wrong, please try again";
      errorPanel.style.visibility = 'visible';
      setTimeout(function(){
        errorPanel.style.visibility = 'hidden';
      }, 5000);    
    }
  }
}

async function retrieveRecipes(offset) {
  console.log('hello retrieve')
  try {
  const searchValue = webpage.value;
  console.log(searchValue);

  searchTerm.innerHTML = "";
  searchTerm.innerHTML = searchValue;
  const recipeSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchValue}&instructionsRequired=true&offset=${offset}`

  const findMyRecipe = await fetch(recipeSearch, {
    headers: 
      {"Content-Type": "application/json"
  }});
  
  recipeList = await findMyRecipe.json();

  const isItOk = findMyRecipe.ok;
  const whatIsStatus = findMyRecipe.status;

  console.log('isItOk', isItOk)
  console.log('whatIsStatus', whatIsStatus)


  if (!findMyRecipe.ok) {
    const responseError = {
      type: 'Error',
      message: recipeList.message || 'Something went wrong',
      data: recipeList.data || '', 
      code: recipeList.code || '',
    };
  
    let error = new Error();
    error = { ...error, ...responseError };
    throw (error);
  };

  return recipeList;
}
catch (err) {
  console.log('here is the error!!', err, typeof err)
  if (err.code == "402") {
    console.log('it is a 402!!', err)
    errorPanel.innerHTML = "";
    errorPanel.innerHTML = "No Hands Baking has exhausted its Spoonacular calls for the day. Try again after 9:00 p.m. UTC.";
    errorPanel.style.visibility = 'visible';

    setTimeout(function(){
      errorPanel.style.visibility = 'hidden';
    }, 5000);
  }
  else {
    errorPanel.innerHTML = "";
    errorPanel.innerHTML = "Something has gone wrong, please try again";
    errorPanel.style.visibility = 'visible';
    setTimeout(function(){
      errorPanel.style.visibility = 'hidden';
    }, 5000);    
  }
}
}

async function manageInstructionsPreview(parsedInstructions) {

  var instructionInsert = "";
  instructionInsert += '<ul class="instructionListManager"><b>Instructions</b>';

  for (i = 0; i < parsedInstructions.length; i++) {
    instructionInsert += `<li id="instructionList${i}" class="">`;
    instructionInsert += parsedInstructions[i];
    instructionInsert += `</li>`;
  }

  instructionInsert += `</ul>`;

  stepCount = parsedInstructions.length;

  return instructionInsert;
}


async function manageInstructions(parsedInstructions) {
  var instructionInsert = "";
  instructionInsert += '<ul>';

  for (i=0; i < parsedInstructions.length; i++) {
    instructionInsert += `<li id="instructionListItem${i}" class="">`;
    instructionInsert += parsedInstructions[i];
    instructionInsert += `</li>`
  }

  instructionInsert += '</ul>';
  stepCount = parsedInstructions.length;

  return instructionInsert;
}
async function ingredientArray() {

  const storedIngredients = sessionStorage.getItem('storedRecipeIngredients');
  const parsedIngredients = JSON.parse(storedIngredients);

  const ingredientsList = parsedIngredients;
  var ingredientHTML;
  ingredientHTML = '';
  ingredientHTML = '<ul class="instructionListManager"><b>Ingredients</b>';
    for (i = 0; i < ingredientsList.length; i++) {
      ingredientHTML += '<li>' + ingredientsList[i].original + '</li>'; 
    }
  ingredientHTML += `</ul>`;

  return ingredientHTML;
}

async function searchingIsHappening() {
  if (typeof searchInput.value == "string" && searchInput.value.trim()){
    offset = 0;
    pageNumber = 1;
    document.body.style.cursor='wait';
    previousPage.disabled = true;

    console.log('hello about to retrieve')

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

    await recipeWaiter(recipeList.results);
    document.getElementById('selectorPageTracker').innerHTML = `Page ${pageNumber} of ${totalPages}`
    recipeSelectionScreen.style.visibility = 'visible';
    recipeSelectionScreen.style.display = 'block';

    recipeSelector.style.visibility = 'hidden';
    recipeSelector.style.display = 'none';
    document.body.style.cursor='default';
  }
  else {
    document.body.style.cursor='wait';

    console.log('hello about to retrieve no input value tho')

    recipeList = await retrieveRandomRecipes();

    console.log(recipeList.recipes);
    previousPage.disabled= true;
    nextPage.disabled = true;
    await recipeWaiter(recipeList.recipes);
    document.getElementById('selectorPageTracker').innerHTML = `Page 1 of 1`

    recipeSelectionScreen.style.visibility = 'visible';
    recipeSelectionScreen.style.display = 'block';

    recipeSelector.style.visibility = 'hidden';
    recipeSelector.style.display = 'block';
    document.body.style.cursor='default';

  }
}

async function readMore() {

  const image = sessionStorage.getItem('storedRecipeImage');
  const parsedImage = JSON.parse(image)

  var img = document.createElement("img");
  img.src = parsedImage;

  img.setAttribute('class', 'imggg'); 
  imagePreview.innerHTML = "";
  imagePreview.appendChild(img);

  try {
    const readyInMinutes = sessionStorage.getItem('storedReadyInMinutes');
    const parsedMinutes = JSON.parse(readyInMinutes)
    var minutes = document.createElement("minutes");
    minutes.setAttribute('class', "pageCounter");
    minutes.innerHTML = "<p>Ready in " + parsedMinutes + " minutes";
    imagePreview.appendChild(minutes);
  }
  catch{}

  const recipeTitle = sessionStorage.getItem('storedRecipeTitle');
  const parsedRecipeTitle = JSON.parse(recipeTitle);
  recipePreviewTitle.innerHTML = "";
  recipePreviewTitle.innerHTML = parsedRecipeTitle;


  var ingredientHTML = await ingredientArray();
  ingredientsPreview.innerHTML = ingredientHTML;

  const storedInstructions = sessionStorage.getItem('storedRecipeInstructions');
  const parsedInstructions = JSON.parse(storedInstructions);
  var formattedInstructions = await manageInstructionsPreview(parsedInstructions);
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
  console.log(findMyRecipe)

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
  if (findMyRecipe.readyInMinutes) {
    const jsonObjectReadyInMinutes = JSON.stringify(findMyRecipe.readyInMinutes);
    sessionStorage.setItem('storedReadyInMinutes', jsonObjectReadyInMinutes);
  }

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
  }
  }
}

async function buildSelectionScreen(i, id) {
  wrapper.innerHTML += `<div class="row" onclick="previewListener(${id})"><div class="column" value="">
  <div id="Recipe${i+1}" class="recipeSelectionTitle"></div>
  </div><div class="cardImage" id="cardImage${i+1}"></div></div>`;
}

async function recipeWaiter(recipesList) {
  wrapper.innerHTML = "";
  console.log(recipesList);
  for (i = 0; i < recipesList.length; i++) {
    if (sessionStorage.getItem(`Title${i}`) != null) {
      sessionStorage.removeItem(`Title${i}`);
      sessionStorage.removeItem(`Id${i}`);
      sessionStorage.removeItem(`Image${i}`);
    }

    await buildSelectionScreen(i, recipesList[i].id);

    const recipeObj = document.getElementById(`Recipe${i+1}`)
    recipeObj.textContent = recipesList[i].title;

    var img = document.createElement("img");
    img.src = recipesList[i].image;


    img.setAttribute('class', 'cardImage'); 
    const cardImage = document.getElementById(`cardImage${i+1}`)

    cardImage.innerHTML = "";
    cardImage.appendChild(img);
    
    const jsonObjectImage = JSON.stringify(recipesList[i].image);
    const jsonObjectTitle = JSON.stringify(recipesList[i].title);
    const jsonObjectId = JSON.stringify(recipesList[i].id);
    sessionStorage.setItem(`Image${i}`, jsonObjectImage);
    sessionStorage.setItem(`Title${i}`, jsonObjectTitle);
    sessionStorage.setItem(`Id${i}`, jsonObjectId);

  }
}

buttonLink.addEventListener('touchstart', async () => {
  footer.style.backgroundColor = 'red'
  searchingIsHappening();
})

searchInput.addEventListener('keydown', async (e) => {
  if (e.key == "Enter"){
    searchingIsHappening();
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
  const setAnimation = document.getElementById(`instructionListItem${currentInstruction}`);
  const setNextAnimation = document.getElementById(`instructionListItem${currentInstruction + 1}`);

  var savedRecipeTitle = sessionStorage.getItem('storedRecipeTitle');
  var parsedRecipeTitle = JSON.parse(savedRecipeTitle);
  recipeTitle.innerHTML = "";
  recipeTitle.innerHTML = parsedRecipeTitle;
  previousStep.disabled = true;
  setAnimation.classList.add('currentInstruction');
  setNextAnimation.setAttribute('class', 'nextInstruction');
  instructions.style.visibility = 'visible';
  recipePreview.style.visibility = 'hidden';
  miseEnPlaceText.style.visibility = 'hidden';
  exitMisePanel.style.visibility = 'hidden';
  informationPanel.style.visibility = 'visible';
  exitInfoPanel.style.visibility = 'visible';
})


selectRecipe.addEventListener('click', async () => {
  miseEnPlaceText.style.visibility = 'visible';
  exitMisePanel.style.visibility = 'visible';
})

aboutUsButton.addEventListener('click', () => {
  sayMore.classList.add('sayMoreVisible');
  footer.classList.add('aboutUsVisible');
  exitAboutUs.setAttribute('class', 'aboutUsExitVisible')
})

exitAboutUs.addEventListener('click', () => {
  footer.classList.remove('aboutUsVisible');
  footer.classList.add('goAwayAbout');
  exitAboutUs.setAttribute('class', 'aboutUsExitAnimation')
  
  setTimeout(function(){
    footer.classList.remove('goAwayAbout');
    exitAboutUs.setAttribute('class', 'aboutUsExitButton')
  }, 2000);
  })

backToResults.addEventListener('click', () => {
  recipePreview.style.visibility = "hidden";
  recipeSelectionScreen.style.visibility = "visible";
  recipeSelectionScreen.style.display = "block";
  miseEnPlaceText.style.visibility = "hidden";
  exitMisePanel.style.visibility = "hidden";
})

backToMise.addEventListener('click', () => {
  instructions.style.visibility = 'hidden';
  recipePreview.style.visibility = "visible";
  informationPanel.style.visibility = "hidden";
  exitInfoPanel.style.visibility = "hidden";
  ingredientReminderPanel.style.visibility = "hidden";
  exitIngRemPanel.style.visibility = "hidden";
  backMicControl = 1;
  recognition.stop();
  synth.cancel();
})

homeButton.addEventListener('click', () => {
  instructions.style.visibility = "hidden";
  miseEnPlaceText.style.visibility = "hidden";
  exitMisePanel.style.visibility = "hidden";
  recipePreview.style.visibility = "hidden";
  recipeSelectionScreen.style.visibility = "hidden";
  recipeSelector.style.visibility = 'visible';
  recipeSelector.style.display = 'flex';
  informationPanel.style.visibility = "hidden";
  exitInfoPanel.style.visibility = "hidden";
  ingredientReminderPanel.style.visibility = "hidden";
  exitIngRemPanel.style.visibility = "hidden";
  backMicControl = 1;
  recognition.stop();
  synth.cancel();
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
  if (microphoneBox == 0) {
    recognition.start();
  }
})

exitMisePanel.addEventListener('click', () => {
  miseEnPlaceText.style.visibility = "hidden";
  exitMisePanel.style.visibility = "hidden";
})

settingsButton.addEventListener('click', () => {
  informationPanel.style.visibility = "visible";
  exitInfoPanel.style.visibility = "visible";
})

ingredientReminderImage.addEventListener('click', async () => {

  var ingredientHTML = await ingredientArray()
 
  ingredientInsert.innerHTML = "";
  ingredientInsert.innerHTML = ingredientHTML;

  ingredientReminderPanel.style.visibility = 'visible';
  exitIngRemPanel.style.visibility = 'visible';
})

exitIngRemPanel.addEventListener('click', () => {
  ingredientReminderPanel.style.visibility = 'hidden';
  exitIngRemPanel.style.visibility = 'hidden';
})

async function previewListener(id){
  await setRecipe(id);
  await readMore();
  recipeSelectionScreen.setAttribute('class', 'recipeSelectionScreen');
  recipeSelectionScreen.style.visibility = "hidden";
  recipeSelectionScreen.style.display = "none";
  recipePreview.style.visibility = "visible";
}

function checkVoice () {
  if (muteOration.checked == true){
      synthVolume = 0;
      console.log(synthVolume);
      synth.cancel();
    } else {
      synthVolume = 1;
    }
}

function checkMicrophone() {
  console.log("i'm here microphone", `${pauseMicrophone.checked}`);
  if (pauseMicrophone.checked == true){
      microphoneBox = 1;
    } else {
      microphoneBox = 0;
    }
}