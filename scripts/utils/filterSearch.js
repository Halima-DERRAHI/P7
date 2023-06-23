// Recherche par la barre de recherche principale

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
			
			const ingredientFound = recipe.ingredients.filter(recipeIngredient => recipeIngredient.ingredient.toLowerCase())
				.includes(ingredient.toLowerCase()).length > 0;

			if (!ingredientFound) {
				ingredientMatch = false;
			}
		});

		if (ingredientMatch) {
			filteredRecipes.push(recipe);
		}
	});

	console.log(filteredRecipes);
	
	// .replace(/s$/, "")

	return filteredRecipes;
}

function searchIngredientItem(ingredientsArray, ingredientInput) {

	const inputValue = ingredientInput.value.toLowerCase();
	ingredientsArray = ingredientsArray.filter(item => item.toLowerCase().includes(inputValue));
	
	return ingredientsArray;
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
	applianceArray = applianceArray.filter(item => item.toLowerCase().includes(inputValue));
	
	return applianceArray;
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
	ustensilsArray = ustensilsArray.filter(item => item.toLowerCase().includes(inputValue));
	
	return ustensilsArray;
}
  