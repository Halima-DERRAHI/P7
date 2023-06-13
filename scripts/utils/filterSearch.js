function searchRecipe(recipes) {

	const filterRecipes = [];
	const inputValue = mainSearch.value.toLowerCase();
	
	recipes.forEach(recipe => {

		const titleExists = recipe.name.toLowerCase().includes(inputValue);

		const recipeIngredientExists = recipe.ingredients.some((ingredient) =>
			ingredient.ingredient.toLowerCase().includes(inputValue)
		);
			
		const recipeDescriptionExists = recipe.description.toLowerCase().includes(inputValue);

		if ( titleExists || recipeIngredientExists || recipeDescriptionExists ) {
			filterRecipes.push(recipe);
		}
	}); 

	return filterRecipes;
}

// Recherche selon les ingrédients

function filterIngredients(recipes, ingredients) {

	const filteredRecipes = recipes.filter((recipe) => {
		return ingredients.every(ingredient => {
			return recipe.ingredients.ingredient.includes(ingredient);
		});
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

	const filteredRecipes = recipes.filter((recipe) => {
		return appliance.every(appliance => {
			return recipe.appliance.includes(appliance);
		});
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
	
	const filteredRecipes = recipes.filter((recipe) => {
		return ustensils.every(ustensil => {
			return recipe.ustensils.includes(ustensil);
		});
	});

	return filteredRecipes;
}

function searchUstensilItem(ustensilsArray, ustensilsInput) {

	const inputValue = ustensilsInput.value.toLowerCase();
	const filteredUstensils = ustensilsArray.filter(item => item.toLowerCase().includes(inputValue));
	return filteredUstensils;
}
  