function searchRecipe(recipes) {

	const filterRecipes = [];
	const inputValue = mainSearch.value.toLowerCase();
	
	recipes.forEach(recipe => {
		const titleExists = recipe.name.toLowerCase().includes(inputValue);

		const recipeIngredientExists = recipe.ingredients.filter(ingredient =>
			ingredient.ingredient.toLowerCase().includes(inputValue)
		).length > 0;

		const recipeDescriptionExists = recipe.description.toLowerCase().includes(inputValue);

		if (titleExists || recipeIngredientExists || recipeDescriptionExists) {
			filterRecipes.push(recipe);
		}
	});


	return filterRecipes;
}

// Recherche selon les ingrédients

function filterIngredients(recipes, ingredients) {

	const filteredRecipes = [];

	recipes.forEach(recipe => {
		let ingredientMatch = true;

		ingredients.forEach(ingredient => {
			const ingredientFound = recipe.ingredients.map(recipeIngredient => recipeIngredient.ingredient).includes(ingredient);

			if (!ingredientFound) {
				ingredientMatch = false;
			}
		});

		if (ingredientMatch) {
			filteredRecipes.push(recipe);
		}
	});

	return filteredRecipes;

}

function searchIngredientItem(ingredientsArray, ingredientInput) {

	const inputValue = ingredientInput.value.toLowerCase();
	const filteredIngredients = ingredientsArray.filter(item => item.toLowerCase().includes(inputValue));
	return filteredIngredients;
}

// Recherche selon les appareils

function filterAppliances(recipes, appliance) {

	const filteredRecipes = [];

	recipes.forEach(recipe => {
		if (appliance.length === 0 || appliance.includes(recipe.appliance)) {
			filteredRecipes.push(recipe);
		}
	});

	return filteredRecipes;

}

function searchApplianceItem(applianceArray, applianceInput) {

	const inputValue = applianceInput.value.toLowerCase();
	const filteredAppliances = applianceArray.filter(item => item.toLowerCase().includes(inputValue));
	return filteredAppliances;
}

// Recherche selon les ustensiles

function filterUstensils(recipes, ustensils) {
	
	const filteredRecipes = [];
  
	recipes.forEach(recipe => {
		let ustensilMatch = true;
	
		ustensils.forEach(ustensil => {
			const ustensilFound = recipe.ustensils.includes(ustensil);
	
			if (!ustensilFound) {
				ustensilMatch = false;
			}
		});
	
		if (ustensilMatch) {
			filteredRecipes.push(recipe);
		}
	});
  
	return filteredRecipes;
}
  

function searchUstensilItem(ustensilsArray, ustensilsInput) {

	const inputValue = ustensilsInput.value.toLowerCase();
	const filteredUstensils = ustensilsArray.filter(item => item.toLowerCase().includes(inputValue));
	
	return filteredUstensils;
}
  