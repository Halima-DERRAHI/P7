async function getRecipes() {

	const reponse = await fetch("data/recipes.json");
	const recipes = await reponse.json();

	return recipes;
}

function displayRecipes(recipes) {
	const reciepContainer = document.querySelector(".recipes-container");
	reciepContainer.innerHTML = "";

	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		const recipeModel = recipesFactory(recipe);
		const recipeCardDOM = recipeModel.recipeCardDOM();
		reciepContainer.appendChild(recipeCardDOM);
	}
}

async function init() {

	const { recipes } = await getRecipes();
	await createFilters(recipes);

	displayRecipes(recipes);
}

window.onload = function()
{
	init();
};