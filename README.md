**No Hands Baking!** is a web application which reads recipes to the user based on voice commands. 

This application allows the user to enter a search term and then calls on the [Spoonacular API](https://spoonacular.com/food-api) to deliver the user a selection of recipes relevant to their search term. After the user has selected a recipe, they are brought to a preview page highlighting the recipe image, ingredients, and instructions. The user is encouraged to prepare their ingredients before being brought to the instructions page. Upon opening the instruction page, the user is informed of their command words, as well as a few settings options. Once they have exited the instructions panel, the program will begin orating the first line of the recipe, using [Web Speech API Speech Synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). Afterwards, the user is able to control the pace at which the recipe is read aloud to them using [Web Speech API Speech Recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).

**Web Speech API** is the star of the show in this project. I think we have all had moments where your hands are covered in butter, or meat, or flour, and so on. You are using your laptop or brand new phone to scroll to the next step. You cringe. The elegance of being able to use voice commands which are applied to a unique recipe is the value in this project.

**Spoonacular**'s API was selected as a caveat of the scope of this project. The longterm goal of No Hands Baking! is ultimately to make the program able to filter through websites and retrieve recipes across the internet. However, that sort of work would have required a server-side language, and this project was meant to be accomplished in HTML/CSS/Javascript alone. For now, Spoonacular incorporated some useful API learning, while also continuing to provide a large variety of recipes for user engagement.

No Hands Baking! has emerged out of the [Get Coding]((https://www.getcoding.ca)) Full-Stack Development program, and the [techNL Find Your Future Scholarship](https://findyourfuturenl.ca). I owe a special thanks to my coach Jillian Breau (LINK TO GIT? LINKEDIN?) for helping me along the way.
