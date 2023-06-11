/**
 * @description filtre les recettes suivant les tags et le champ de recherche,
 * puis extrait les ingrédients, appareils et ustensils et alimente les trois filtres,
 * puis affiche les recettes ainsi filtrées.
 */

let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

const mainSearch = document.getElementById("main_search");
const ingredientInput = document.getElementById("ingredients-input");
const applianceInput = document.getElementById("appareils-input");
const ustensileInput = document.getElementById("appareils-input");


function filterRecipes() {

	let recipes = [...initialRecipes];

	// filtrer 'recipes' par le champ de chercher (s'il contient 3 caractères ou plus)

	if (mainSearch.value.length >= 3 ) {
		recipes = searchRecipe(recipes);
	}

	if (ingredientInput !== null) {

		if (ingredientInput.value.length >= 3) {
			recipes = searchIngredient(recipes, ingredientInput);
			console.log(recipes);
		}
	}

	if (applianceInput !== null) {

		if (applianceInput.value.length >= 3) {
			recipes = searchAppliance(recipes, applianceInput);
			console.log(recipes);
		}
	}

	if (ustensileInput !== null) {

		if (ustensileInput.value.length >= 3) {
			recipes = searchUstensil(recipes, ustensileInput);
			console.log(recipes);
		}
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

	const ingredientsArray = [];
	const applianceArray = [];
	const ustensilsArray = [];
		
	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Boucle pour les ingrédients
		for (let j = 0; j < recipe.ingredients.length; j++) {
			const ingredient = recipe.ingredients[j].ingredient;
		
			let ingredientExists = false;
			for (let k = 0; k < ingredientsArray.length; k++) {
				if (ingredientsArray[k] === ingredient) {
					ingredientExists = true;
					break;
				}
			}
		
			if (!ingredientExists) {
				let tagExists = false;
				for (let l = 0; l < ingredientTags.length; l++) {
					if (ingredientTags[l] === ingredient) {
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
			if (applianceArray[j] === recipe.appliance) {
				applianceExists = true;
				break;
			}
		}

		if (!applianceExists) {
			let applianceTagExists = false;
			for (let k = 0; k < applianceTags.length; k++) {
				if (applianceTags[k] === recipe.appliance) {
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
				if (ustensilsArray[k] === ustensil) {
					ustensilExists = true;
					break;
				}
			}
		
			if (!ustensilExists) {
				let ustensilTagExists = false;
				for (let l = 0; l < ustensilTags.length; l++) {
					if (ustensilTags[l] === ustensil) {
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

function searchRecipe(recipes) {

	const filterRecipes = [];
	const inputValue = mainSearch.value.toLowerCase();
	
	for (let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		let titleExists = false;
		if ( recipe.name.toLowerCase().indexOf(inputValue) !== -1 ) {
			titleExists = true;
		}

		let recipeIngredientExists = false;
		for ( let j = 0; j < recipe.ingredients.length ; j++ ) {

			if ( recipe.ingredients[j].ingredient.toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeIngredientExists = true;
			}
		}

		let recipeApplianceExists = false;
		for ( let k = 0; k < recipe.appliance.length ; k++ ) {

			if ( recipe.appliance[k].toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeApplianceExists = true;
			}
		}

		let recipeUstensilsExixts = false;
		for ( let m = 0; m < recipe.ustensils.length; m++ ) {
			if ( recipe.ustensils[m].toLowerCase().indexOf(inputValue) !== -1 ){
				recipeUstensilsExixts = true;
			}
		}
		
		if ( titleExists || recipeIngredientExists || recipeApplianceExists || recipeUstensilsExixts ) {
			filterRecipes.push(recipe);
		}
	}

	return filterRecipes;
}

// Création du filtre ingredients

function createIngredientsFilter(ingredientsArray, ingredientTags) {
  
	const filterElement = document.querySelector(".filter-ingredients");
	filterElement.innerHTML = "";

	filterElement.classList.add("select");
	filterElement.classList.add("filter");
  
	const title = document.createElement("span");
	title.textContent = "Ingrédients";
	filterElement.appendChild(title);
  
	const input = document.createElement("input");
	const inputId = "ingredients-input";
	input.setAttribute("id", inputId);
	input.style.display = "none";
	input.setAttribute("placeholder", "Rechercher un ingrédient");
	input.setAttribute("autocomplete", "off");
	input.className = "search-input";
	filterElement.appendChild(input);

	input.addEventListener("input",function (e) {
		if (input.value.length >= 3) {
			e.stopPropagation();
			filterRecipes();
		}
	});
  
	const iconDiv = document.createElement("div");
	iconDiv.className = "icon-div";
  
	const arrowDown = document.createElement("i");
	arrowDown.className = "fa-solid fa-angle-down fa-lg";
	arrowDown.style.cursor = "pointer";
	iconDiv.appendChild(arrowDown);
  
	const arrowUp = document.createElement("i");
	arrowUp.className = "fa-solid fa-angle-up fa-lg";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);
  
	const filterList = document.createElement("ul");
	const listClass = "filter-ingredients_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);
  
	for (let i = 0; i < ingredientsArray.length; i++) {
		const name = ingredientsArray[i];
		const item = createIngredientItem(name, ingredientTags, arrowUp);
		filterList.appendChild(item);
	}
  
	// Gestion des evenements des  fleches

	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
	});
	
	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});
}
  
function createIngredientItem(name, ingredientArray, arrowUp) {
	const item = document.createElement("li");
	item.className = "ingredient-items";
	item.textContent = name;
  
	function clickHandler() {
		let isNameIncluded = false;
		for (let i = 0; i < ingredientArray.length; i++) {
			if (ingredientArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
	
		if (!isNameIncluded) {
			createTag(name, "Ingredients", ingredientTags );
			arrowUp.click();
		}
	}
  
	item.addEventListener("click", clickHandler);
  
	return item;
}

function filterIngredients(recipes, ingredients) {
	const filteredRecipes = [];
	
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let ingredientMatch = true;

		for (let j = 0; j < ingredients.length; j++) {
			const ingredient = ingredients[j];
			let ingredientFound = false;

			for (let k = 0; k < recipe.ingredients.length; k++) {
				const recipeIngredient = recipe.ingredients[k].ingredient;

				if (recipeIngredient === ingredient) {
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

function searchIngredient(recipes, ingredientInput) {

	const filterRecipes = [];
	const inputValue = ingredientInput.value.toLowerCase();
	
	for (let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		let recipeIngredientExists = false;
		for ( let j = 0; j < recipe.ingredients.length ; j++ ) {

			if ( recipe.ingredients[j].ingredient.toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeIngredientExists = true;
			}
		}
		
		if ( recipeIngredientExists ) {
			filterRecipes.push(recipe);
		}
	}
	return filterRecipes;
}

// Création du filtre appareils

function createAppliancesFilter(applianceArray, applianceTags) {

	const filterElement = document.querySelector(".filter-appareils");
	filterElement.innerHTML = "";

	filterElement.classList.add("select");
	filterElement.classList.add("filter");
  
	const title = document.createElement("span");
	title.textContent = "Appareils";
	filterElement.appendChild(title);
  
	const input = document.createElement("input");
	const inputId = "appareils-input";
	input.setAttribute("id", inputId);
	input.style.display = "none";
	input.setAttribute("placeholder", "Rechercher un appareil");
	input.setAttribute("autocomplete", "off");
	input.className = "search-input";
	filterElement.appendChild(input);
  
	input.addEventListener("input",function (e) {
		if (input.value.length >= 3) {
			e.stopPropagation();
			filterRecipes();
		}
	});

	const iconDiv = document.createElement("div");
	iconDiv.className = "icon-div";
  
	const arrowDown = document.createElement("i");
	arrowDown.className = "fa-solid fa-angle-down fa-lg";
	arrowDown.style.cursor = "pointer";
	iconDiv.appendChild(arrowDown);
  
	const arrowUp = document.createElement("i");
	arrowUp.className = "fa-solid fa-angle-up fa-lg";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);
  
	const filterList = document.createElement("ul");
	const listClass = "filter-appareils";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);
  
	for (let i = 0; i < applianceArray.length; i++) {
		const name = applianceArray[i];
		const item = createAppareilItem(name, applianceTags, arrowUp);
		filterList.appendChild(item);
	}
    
	// Gestion des evenements des  fleches
  
	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
	});

	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});
}

function createAppareilItem(name, appareilArray, arrowUp) {
	const item = document.createElement("li");
	item.className = "appareil-items";
	item.textContent = name;
  
	function clickHandler() {
		let isNameIncluded = false;
		for (let i = 0; i < appareilArray.length; i++) {
			if (appareilArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
  
		if (!isNameIncluded) {
			createTag(name, "Appareils", applianceTags);
			arrowUp.click();
		}
	}
  
	item.addEventListener("click", clickHandler);
  
	return item;
}

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

function searchAppliance(recipes, applianceInput) {

	const filterRecipes = [];
	const inputValue = applianceInput.value.toLowerCase();
	
	for (let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		let recipeApplianceExists = false;
		for ( let j = 0; j < recipe.appliance.length ; j++ ) {

			if ( recipe.appliance[j].toLowerCase().indexOf(inputValue) !== -1 ) {
				recipeApplianceExists = true;
			}
		}
		
		if ( recipeApplianceExists ) {
			filterRecipes.push(recipe);
		}
	}

	return filterRecipes;
}


// Création du filtre ustensiles


function createUstensilsFilter(ustensilsArray, ustensilTags) {
  
	const filterElement = document.querySelector(".filter-ustensiles");
	filterElement.innerHTML = "";

	filterElement.classList.add("select");
	filterElement.classList.add("filter");
  
	const title = document.createElement("span");
	title.textContent =  "Ustensiles";
	filterElement.appendChild(title);
  
	const input = document.createElement("input");
	const inputId = "ustensiles-input";
	input.setAttribute("id", inputId);
	input.style.display = "none";
	input.setAttribute("placeholder", "Rechercher un ustensile");
	input.setAttribute("autocomplete", "off");
	input.className = "search-input";
	filterElement.appendChild(input);
  
	input.addEventListener("input",function (e) {
		if (input.value.length >= 3) {
			e.stopPropagation();
			filterRecipes();
		}
	});

	const iconDiv = document.createElement("div");
	iconDiv.className = "icon-div";
  
	const arrowDown = document.createElement("i");
	arrowDown.className = "fa-solid fa-angle-down fa-lg";
	arrowDown.style.cursor = "pointer";
	iconDiv.appendChild(arrowDown);
  
	const arrowUp = document.createElement("i");
	arrowUp.className = "fa-solid fa-angle-up fa-lg";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);
  
	const filterList = document.createElement("ul");
	const listClass = "filter-ustensiles_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);

	filterList.innerHTML = "";

	for (let i = 0; i < ustensilsArray.length; i++) {
		const name = ustensilsArray[i];
		const item = createUstensileItem(name, ustensilTags, arrowUp);
		filterList.appendChild(item);
	}
    
	// Gestion des evenements des  fleches
  
	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
	});

	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});
}

function createUstensileItem(name, ustensileArray, arrowUp) {
	const item = document.createElement("li");
	item.className = "ustensile-items";
	item.textContent = name;
  
	function clickHandler() {
		let isNameIncluded = false;
		for (let i = 0; i < ustensileArray.length; i++) {
			if (ustensileArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}

		if (!isNameIncluded) {
			createTag(name, "Ustensiles", ustensilTags );
			arrowUp.click();
		}
	}

	item.addEventListener("click", clickHandler);

	return item;
}

function filterUstensils(recipes, ustensiles) {
	const filteredRecipes = [];
  
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let ustensilMatch = false;
	
		if (ustensiles.length === 0) {
			ustensilMatch = true;
		} else {
			const recipeUstensils = recipe.ustensils;
			const numUstensils = recipeUstensils.length;
  
			for (let j = 0; j < numUstensils; j++) {
				const ustensil = recipeUstensils[j];
				let ustensilFound = false;
  
				for (let k = 0; k < ustensiles.length; k++) {
					if (ustensiles[k] === ustensil) {
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

function searchUstensil(recipes, ustensilsInput) {

	const filterRecipes = [];
	const inputValue = ustensilsInput.value.toLowerCase();
	
	for (let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		let recipeUstensilsExixts = false;
		for ( let i = 0; i < recipe.ustensils.length; i++ ) {
			if ( recipe.ustensils[i].toLowerCase().indexOf(inputValue) !== -1 ){
				recipeUstensilsExixts = true;
			}
		}
		
		if ( recipeUstensilsExixts ) {
			filterRecipes.push(recipe);
		}
	}

	return filterRecipes;
}

// Création des tags

function createTag(name, filterName, taggedArray ) {

	const tagsContainer = document.querySelector(`.${filterName.toLowerCase()}-tags_container`);
	tagsContainer.classList.add("tags-container");

	const tagDiv = document.createElement("div");
	tagDiv.className = `filter-${filterName.toLowerCase()}_items tags-items`;

	const tagText = document.createElement("span");
	tagText.textContent = name;

	const closeButton = document.createElement("i");
	closeButton.className = "fa-regular fa-circle-xmark";
	closeButton.style.cursor = "pointer";

	closeButton.addEventListener("click", () => {
		tagDiv.remove();
		removetag(taggedArray, name);
		filterRecipes();
	});

	tagDiv.appendChild(tagText);
	tagDiv.appendChild(closeButton);
	tagsContainer.appendChild(tagDiv);
	
	taggedArray.push(name);
	filterRecipes();
}

// Suppression des tags

function removetag(array, name) {

	for (let i = 0; i < array.length; i++) {
		if (array[i] === name) {
			array.splice(i, 1);
			break;
		}
	}
}

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
