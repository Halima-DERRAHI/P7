async function getRecipes() {

	const reponse = await fetch("data/recipes.json");
	const data = await reponse.json();

	return data.recipes;
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

let initialRecipes = [];

async function init() {

	initialRecipes = await getRecipes();
	filterRecipes();
}

window.onload = async function()
{
	await init();
};