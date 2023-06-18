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

	if (mainSearch.value.trim().length >= 3) {
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

/*function filtersList(recipes) {

	// extract ingredients, devices and ustensils from 'recipes'
	
	let ingredientsArray = [];
	let applianceArray = [];
	let ustensilsArray = [];

	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Liste des ingrédients
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
		
		// Liste des appareils
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

		
		// Liste des ustensiles
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

	const ingredientsList = document.querySelector(".filter-ingredients_list");
	const appliancesList = document.querySelector(".filter-appareils_list");
	const ustensilsList = document.querySelector(".filter-ustensiles_list");

	const ingredientInput = document.getElementById("ingredients-input");
	if (ingredientInput.value.length > 2) {
		ingredientsArray = searchIngredientItem(ingredientsArray, ingredientInput);
	}

	ingredientsList.innerHTML = "";

	for (let i = 0; i < ingredientsArray.length; i++) {
		const name = ingredientsArray[i];
		const item = createIngredientItem(name, ingredientTags);
		ingredientsList.appendChild(item);
	}

	ingredientInput.addEventListener("keyup",function (e) {
		e.stopPropagation();
		filtersList(recipes);
	});

	appliancesList.innerHTML = "";

	const applianceInput = document.getElementById("appareils-input");
	if (applianceInput.value.length > 2) {
		applianceArray = searchApplianceItem(applianceArray, applianceInput);
	}

	for (let i = 0; i < applianceArray.length; i++) {
		const name = applianceArray[i];
		const item = createAppareilItem(name, applianceTags);
		appliancesList.appendChild(item);
	}

	applianceInput.addEventListener("keyup",function (e) {
		e.stopPropagation();
		filtersList(recipes);
	});

	ustensilsList.innerHTML = "";

	const ustensileInput = document.getElementById("ustensiles-input");
	if (ustensileInput.value.length > 2) {
		ustensilsArray = searchUstensilItem(ustensilsArray, ustensileInput);
	}

	for (let i = 0; i < ustensilsArray.length; i++) {
		const name = ustensilsArray[i];
		const item = createUstensileItem(name, ustensilTags);
		ustensilsList.appendChild(item);
	}

	ustensilsList.addEventListener("keyup",function (e) {
		e.stopPropagation();
		filtersList(recipes);
	});
	console.log("mise à jour des listes");
}*/