async function getRecipes() {

	const reponse = await fetch("data/recipes.json");
	const recipes = await reponse.json();

	return recipes;
}

function displayRecipes(recipes) {
	const reciepContainer = document.querySelector(".recipes-container");
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		const recipeModel = recipesFactory(recipe);
		const recipeCardDOM = recipeModel.recipeCardDOM();
		reciepContainer.appendChild(recipeCardDOM);
	}
}


async function init() {

	const { recipes } = await getRecipes();
	displayRecipes(recipes);
	createIngredientsFilter();
	createAppareilsFilter();
	createUstansilesFilter();
}

window.onload = function()
{
	init();
};