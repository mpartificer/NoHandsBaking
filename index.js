const buttonLink = document.getElementById('letsGoButton');
const recipeTitle = document.getElementById('recipeTitle');
const miseEnPlaceSet = document.getElementById('lockedAndLoadedButton');
const miseEnPlaceText = document.getElementById('miseEnPlace');
const recipeSelector = document.getElementById('recipeSelector');
const instructions = document.getElementById('instructions');

buttonLink.addEventListener('click', async () => {

  recipeTitle.setAttribute('class', 'recipeTitleVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlaceVisible');
  recipeSelector.setAttribute('class', 'hideTheOpener');
})

miseEnPlaceSet.addEventListener('click', () => {
  instructions.setAttribute('class', 'instructionsVisible');
  miseEnPlaceText.setAttribute('class', 'miseEnPlace');
}
)
