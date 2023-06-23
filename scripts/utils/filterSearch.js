// Recherche par la barre de recherche principale

function searchRecipe(recipes) {

	const filterRecipes = [];
	const inputValue = mainSearch.value.toLowerCase();
	
	for (let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Recherche dans le titre
		let titleExists = false;
		if ( recipe.name.toLowerCase().indexOf(inputValue) !== -1 ) {
			titleExists = true;
		}

		// Recherche dans les ingredients
		let recipeIngredientExists = false;
		for ( let j = 0; j < recipe.ingredients.length ; j++ ) {

			if ( recipe.ingredients[j].ingredient.toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeIngredientExists = true;
				break;
			}
		}

		// Rercherche dans la description
		let recipeDescriptionExists = false;
		for ( let k = 0; k < recipe.description.length ; k++ ) {

			if ( recipe.description[k].toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeDescriptionExists = true;
				break;
			}
		}

		if ( titleExists || recipeIngredientExists || recipeDescriptionExists ) {
			filterRecipes.push(recipe);
		}
	}

	return filterRecipes;
}

// Recherche selon les ingrédients

function filterIngredients(recipes, ingredients) {
	const filteredRecipes = [];
	
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let ingredientMatch = true;

		for (let j = 0; j < ingredients.length; j++) {
			const ingredient = ingredients[j].toLowerCase();
			let ingredientFound = false;

			for (let k = 0; k < recipe.ingredients.length; k++) {
				const recipeIngredient = recipe.ingredients[k].ingredient.toLowerCase();

				if ((recipeIngredient === ingredient) ||
				(recipeIngredient.endsWith("s") && recipeIngredient.slice(0, -1) === ingredient)
				) {
					ingredientFound = true;
					break;
				}
			}

			if (!ingredientFound) {
				ingredientMatch = false;
				break;
			}
		}

		if (ingredientMatch) {
			filteredRecipes.push(recipe);
		}
	}

	return filteredRecipes;
}

function searchIngredientItem(ingredientsArray, ingredientInput) {

	const inputValue = ingredientInput.value.toLowerCase();
	const filteredIngredients = [];
  
	for (let i = 0; i < ingredientsArray.length; i++) {
		const item = ingredientsArray[i];
	
		if (item.toLowerCase().indexOf(inputValue) !== -1) {
			filteredIngredients.push(item);
		}
	}
  
	return filteredIngredients;
}

// Recherche selon les appareils

function filterAppliances(recipes, appliance) {

	const filteredRecipes = [];
		
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let appareilMatch = false;
		
		if (appliance.length === 0) {
			appareilMatch = true;
		} else {
			for (let j = 0; j < appliance.length; j++) {
				if (appliance[j] === recipe.appliance) {
					appareilMatch = true;
					break;
				}
			}
		}
		
		if (appareilMatch) {
			filteredRecipes.push(recipe);
		}
	}
		
	return filteredRecipes;
}

function searchApplianceItem(applianceArray, applianceInput) {

	const inputValue = applianceInput.value.toLowerCase();
	const filteredAppliance = [];
  
	for (let i = 0; i < applianceArray.length; i++) {
		const item = applianceArray[i];
	
		if (item.toLowerCase().indexOf(inputValue) !== -1) {
			filteredAppliance.push(item);
		}
	}
  
	return filteredAppliance;
}

// Recherche selon les ustensiles

function filterUstensils(recipes, ustensils) {
	const filteredRecipes = [];
  
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let ustensilMatch = false;
	
		if (ustensils.length === 0) {
			ustensilMatch = true;
		} else {
			const recipeUstensils = recipe.ustensils;
			const numUstensils = recipeUstensils.length;
  
			for (let j = 0; j < numUstensils; j++) {
				const ustensil = recipeUstensils[j];
				let ustensilFound = false;
  
				for (let k = 0; k < ustensils.length; k++) {
					if (ustensils[k] === ustensil) {
						ustensilFound = true;
						break;
					}
				}
  
				if (ustensilFound) {
					ustensilMatch = true;
					break;
				}
			}
		}
  
		if (ustensilMatch) {
			filteredRecipes.push(recipe);
		}
	}
  
	return filteredRecipes;
}

function searchUstensilItem(ustensilsArray, ustensilsInput) {

	const inputValue = ustensilsInput.value.toLowerCase();
	const filteredUstensil = [];
  
	for (let i = 0; i < ustensilsArray.length; i++) {
		const item = ustensilsArray[i];
	
		if (item.toLowerCase().indexOf(inputValue) !== -1) {
			filteredUstensil.push(item);
		}
	}
	return filteredUstensil;
}