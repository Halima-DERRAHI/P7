// Récuperation des données 

async function getRecipes() {

	const reponse = await fetch("data/recipes.json");
	const data = await reponse.json();

	return data.recipes;
}

// Affichage des recettes

function displayRecipes(recipes) {
	const recipeContainer = document.querySelector(".recipes-container");
	recipeContainer.innerHTML = "";

	recipes.forEach(recipe => {
		const recipeModel = recipesFactory(recipe);
		const recipeCardDOM = recipeModel.recipeCardDOM();
		recipeContainer.appendChild(recipeCardDOM);
	});
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