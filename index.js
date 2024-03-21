console.log("Hello!")

const button = document.getElementById('test');

button.addEventListener('click', () => button.setAttribute('class', 'my-blue-thing'))

const buttonLink = document.getElementById('letsGoButton');

const linkToRecipe = document.getElementById('webpage');

buttonLink.addEventListener('click', () => linkToRecipe.setAttribute('href', linkToRecipe.value))