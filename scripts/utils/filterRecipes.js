/**
 * @description filtre les recettes suivant les tags et le champ de recherche,
 * puis extrait les ingrédients, appareils et ustensils et alimente les trois filtres,
 * puis affiche les recettes ainsi filtrées.
 */

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

const mainSearch = document.getElementById("main_search");

function filterRecipes() {

	let recipes = [...initialRecipes];

	// filtrer 'recipes' par le champ de chercher (s'il contient 3 caractères ou plus)

	if (mainSearch.value.length >= 3 ) {
		recipes = searchRecipe(recipes);
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

	// extract ingredients, devices and ustensils from 'recipes'

	let ingredientsArray = [];
	let applianceArray = [];
	let ustensilsArray = [];
	
	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Boucle pour les ingrédients
		for (let j = 0; j < recipe.ingredients.length; j++) {
			const ingredient = recipe.ingredients[j].ingredient;
		
			let ingredientExists = false;
			for (let k = 0; k < ingredientsArray.length; k++) {
				if (ingredientsArray[k].toLowerCase() === ingredient.toLowerCase()) {
					ingredientExists = true;
					break;
				}
			}
		
			if (!ingredientExists) {
				let tagExists = false;
				for (let l = 0; l < ingredientTags.length; l++) {
					if (ingredientTags[l].toLowerCase() === ingredient.toLowerCase()) {
						tagExists = true;
						break;
					}
				}
		
				if (!tagExists) {
					ingredientsArray.push(ingredient);
				}
			}
		}
		
		// Vérification des appareils
		let applianceExists = false;
		for (let j = 0; j < applianceArray.length; j++) {
			if (applianceArray[j].toLowerCase() === recipe.appliance.toLowerCase()) {
				applianceExists = true;
				break;
			}
		}

		if (!applianceExists) {
			let applianceTagExists = false;
			for (let k = 0; k < applianceTags.length; k++) {
				if (applianceTags[k].toLowerCase() === recipe.appliance.toLowerCase()) {
					applianceTagExists = true;
					break;
				}
			}

			if (!applianceTagExists) {
				applianceArray.push(recipe.appliance);
			}
		}

		
		// Boucle pour les ustensiles
		for (let j = 0; j < recipe.ustensils.length; j++) {
			const ustensil = recipe.ustensils[j];
		
			let ustensilExists = false;
			for (let k = 0; k < ustensilsArray.length; k++) {
				if (ustensilsArray[k].toLowerCase() === ustensil.toLowerCase()) {
					ustensilExists = true;
					break;
				}
			}
		
			if (!ustensilExists) {
				let ustensilTagExists = false;
				for (let l = 0; l < ustensilTags.length; l++) {
					if (ustensilTags[l].toLowerCase() === ustensil.toLowerCase()) {
						ustensilTagExists = true;
						break;
					}
				}
		
				if (!ustensilTagExists) {
					ustensilsArray.push(ustensil);
				}
			}
		}
  
	}

	const ingredientInput = document.getElementById("ingredients-input");
	if (ingredientInput !== null && ingredientInput.value.length >= 3) {
		ingredientsArray = searchIngredientItem(ingredientsArray, ingredientInput);
	}

	const applianceInput = document.getElementById("appareils-input");
	if (applianceInput !== null && applianceInput.value.length >= 3) {
		applianceArray = searchApplianceItem(applianceArray, applianceInput);
	}

	const ustensileInput = document.getElementById("appareils-input");
	if (ustensileInput !== null && ustensileInput.value.length >= 3) {
		ustensilsArray = searchUstensilItem(ustensilsArray, ustensileInput);
	}

	// Création des filtres

	createIngredientsFilter(ingredientsArray, ingredientTags);
	createAppliancesFilter(applianceArray, applianceTags, recipes);
	createUstensilsFilter(ustensilsArray, ustensilTags, recipes);

	displayRecipes(recipes);
}

// Rechercher selon la barre de recherche

mainSearch.addEventListener("input", function() {
	filterRecipes();
});

// Gestion des evenements filtres

function closeOtherFilters(filterElement) {
	const filterElements = document.querySelectorAll(".filter");
	for (let i = 0; i < filterElements.length; i++) {
		const filter = filterElements[i];
		const arrowUp = filter.querySelector(".fa-angle-up");
		if (filter !== filterElement && arrowUp && filter.classList.contains("active")) {
			arrowUp.click();
		}
	}
}
