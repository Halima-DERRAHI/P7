/**
 * @description filtre les recettes suivant les tags et le champ de recherche,
 * puis extrait les ingrédients, appareils et ustensils et alimente les trois filtres,
 * puis affiche les recettes ainsi filtrées.
 */
let ingredientTags = [];
let applianceTags = [];
let ustensilTags = [];

function filterRecipes() {

	let recipes = [...initialRecipes];

	// filtrer 'recipes' par le champ de chercher (s'il contient 3 caractères ou plus)

	// filtrer 'recipes' par les tags éventuels (tags of ingredients, devices and ustensils)


	if (ingredientTags.length > 0) {
		recipes = filterIngredients(recipes, ingredientTags);
	}
	if (applianceTags.length > 0) {
		recipes = filterAppareils(recipes, applianceTags);
	}
	if (ustensilTags.length > 0) {
		recipes = filterUstensiles(recipes, ustensilTags);
	}


	// extract ingredients, devices and ustensils from 'recipes'

	const ingredientsArray = [];
	const applianceArray = [];
	const ustensilsArray = [];
		
	for (let i = 0; i < recipes.length; i++) {
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
	
	createIngredientsFilter(ingredientsArray, ingredientTags, recipes);
	createAppareilsFilter(applianceArray, applianceTags, recipes);
	createUstensilesFilter(ustensilsArray, ustensilTags, recipes);

	displayRecipes(recipes);
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

// Création du filtre appareils

function createAppareilsFilter(applianceArray, applianceTags) {

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
	const listClass = "filter-appareils_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);
  
	for (let i = 0; i < applianceArray.length; i++) {
		const name = applianceArray[i];
		const item = createAppareilItem(name, applianceTags, arrowUp);
		filterList.appendChild(item);
	}
  
	//updateDisplayedRecipes(filterName, recipes, applianceTags);
  
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

function filterAppareils(recipes, appareils) {
	const filteredRecipes = [];
		
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let appareilMatch = false;
		
		if (appareils.length === 0) {
			appareilMatch = true;
		} else {
			for (let j = 0; j < appareils.length; j++) {
				if (appareils[j] === recipe.appliance) {
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

// Création du filtre ustensiles


function createUstensilesFilter(ustensilsArray, ustensilTags) {
  
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
  
	//updateDisplayedRecipes(filterName, recipes, ustensilTags);
  
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

function filterUstensiles(recipes, ustensiles) {
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
