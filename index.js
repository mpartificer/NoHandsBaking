console.log("Hello!")

const button = document.getElementById('test');

button.addEventListener('click', () => button.setAttribute('class', 'my-blue-thing'))

const buttonLink = document.getElementById('letsGoButton');

const linkToRecipe = document.getElementById('webpage');

// const myLink = document.getElementById('myLink');

buttonLink.addEventListener('click', () => {
  // console.log("myLink", myLink)
  // myLink.setAttribute('href', linkToRecipe.value)
  console.log(linkToRecipe.value)
  fetch('https://api.codetabs.com/v1/proxy?quest=https://www.allrecipes.com/recipe/261983/tourtiere-french-canadian-meat-pie/').then((response) => response.text()).then((text) => console.log(text));

  
})
