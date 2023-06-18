/**
 * @description filtre les recettes suivant les tags et le champ de recherche,
 * puis extrait les ingrédients, appareils et ustensils et alimente les trois filtres,
 * puis affiche les recettes ainsi filtrées.
 */

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

const mainSearch = document.getElementById("main_search");
const errorMessage = document.querySelector(".error-message");

function filterRecipes() {

	let recipes = [...initialRecipes];

	// filtrer 'recipes' par le champ de recherche (s'il contient 3 caractères ou plus)

	if (mainSearch.value.trim().length >= 3 ) {
		recipes = searchRecipe(recipes);

		if (recipes.length === 0) {
			const recherche = mainSearch.value;
			errorMessage.textContent = `« Aucune recette ne contient "${recherche}". 
					Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
		} else {
			errorMessage.textContent = "";
			recipes = searchRecipe(recipes);
		}		
	} else {
		errorMessage.textContent = "";
	}

	// filtrer 'recipes' par les tags éventuels (tags of ingredients, devices and ustensils)

	if (ingredientTags.length > 0) {
		recipes = filterIngredients(recipes, ingredientTags);
	}
	if (applianceTags.length > 0) {
		recipes = filterAppliances(recipes, applianceTags);
	}

	if (ustensilTags.length > 0) {
		recipes = filterUstensils(recipes, ustensilTags);
	}

	// Création des filtres

	createIngredientsFilter(recipes);
	createAppliancesFilter(recipes);
	createUstensilsFilter(recipes);

	// Affichage des recettes

	displayRecipes(recipes);

}

// Gestion des evenements du champ de recherche

mainSearch.addEventListener("keyup", function() {
	filterRecipes();
	closeOtherFilters(mainSearch);
});