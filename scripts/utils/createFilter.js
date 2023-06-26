// Création du filtre Ingrédients

function createIngredientsFilter(recipes) {

	const filterElement = document.querySelector(".filter-ingredients");
	
	filterElement.innerHTML = "";
	filterElement.className = "filter-ingredients select filter ";

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
	arrowUp.className = "fa-solid fa-angle-up fa-lg ingredients";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);

	const filterList = document.createElement("ul");
	const listClass = "filter-ingredients_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);

	// Gestion des evenements 

	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		input.focus();
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
		createIngredientsList(recipes);
	});
	
	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		input.value = "";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});

	input.addEventListener("keyup",function (e) {
		e.stopPropagation();
		createIngredientsList(recipes);
	});
}

// Création de la liste des ingredients

function createIngredientsList(recipes) {

	let ingredientsArray = [];

	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Liste des ingrédients
		for (let j = 0; j < recipe.ingredients.length; j++) {
			const ingredient = recipe.ingredients[j].ingredient;

			let ingredientExists = false;

			for (let k = 0; k < ingredientsArray.length; k++) {
				if ((ingredientsArray[k].toLowerCase() === ingredient.toLowerCase()) || 
				(ingredient.toLowerCase().endsWith("s") && ingredientsArray[k].toLowerCase() === ingredient.toLowerCase().slice(0, -1))
				) {
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
	}	

	let colneIngredientsArray = ingredientsArray.slice();

	// recherche par le champ input

	const ingredientInput = document.getElementById("ingredients-input");

	if (ingredientInput.value.length > 2) {
		colneIngredientsArray = searchIngredientItem(colneIngredientsArray, ingredientInput);
	}

	// affichage des elements de la liste

	const ingredientsList = document.querySelector(".filter-ingredients_list");
	ingredientsList.innerHTML = "";

	for (let i = 0; i < colneIngredientsArray.length; i++) {
		const name = colneIngredientsArray[i];
		const item = createIngredientItem(name, ingredientTags);
		ingredientsList.appendChild(item);
	}
}

// Création des elements de la liste du filtre Ingrédient

function createIngredientItem(name, ingredientArray) {

	const item = document.createElement("li");
	item.className = "ingredient-items";
	item.textContent = name;
  
	// Gestion de l'element

	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < ingredientArray.length; i++) {
			if (ingredientArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
	
		if (!isNameIncluded) {
			createTag(name, "Ingredients", ingredientTags );
		}
	}
  
	item.addEventListener("click", itemClick);

	return item;
}

// Création du filtre Appareils

function createAppliancesFilter(recipes) {

	const filterElement = document.querySelector(".filter-appareils");

	filterElement.innerHTML = "";
	filterElement.className = "filter-appareils select filter";

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
	arrowUp.className = "fa-solid fa-angle-up fa-lg appareils";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);

	const filterList = document.createElement("ul");
	const listClass = "filter-appareils_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);

	// Gestion des evenements 

	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		input.focus();
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
		createAppliancesList(recipes);
	});

	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		input.value = "";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});

	input.addEventListener("keyup",function (e) {
		e.stopPropagation();
		createAppliancesList(recipes);
	});
}

// Création de la liste des appareils

function createAppliancesList(recipes) {

	let appliancesArray = [];


	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

		// Liste des appareils
		let applianceExists = false;
		for (let j = 0; j < appliancesArray.length; j++) {
			if (appliancesArray[j].toLowerCase() === recipe.appliance.toLowerCase()) {
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
				appliancesArray.push(recipe.appliance);
			}
		}
	}

	let colneAppliancesArray = appliancesArray.slice();

	// recherche par le champ input

	const applianceInput = document.getElementById("appareils-input");

	if (applianceInput.value.length > 2) {
		colneAppliancesArray = searchApplianceItem(appliancesArray, applianceInput);
	}

	// affichage des elements de la liste

	const appliancesList = document.querySelector(".filter-appareils_list");
	appliancesList.innerHTML = "";

	for (let i = 0; i < colneAppliancesArray.length; i++) {
		const name = colneAppliancesArray[i];
		const item = createAppareilItem(name, applianceTags);
		appliancesList.appendChild(item);
	}
}

// Création des elements de la liste du filtre Appareils

function createAppareilItem(name, appareilArray) {

	const item = document.createElement("li");
	item.className = "appareil-items";
	item.textContent = name;
  
	// Gestion de l'evenement

	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < appareilArray.length; i++) {
			if (appareilArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
  
		if (!isNameIncluded) {
			createTag(name, "Appareils", applianceTags);
		}
	}
  
	item.addEventListener("click", itemClick);
  
	return item;
}

// Création du filtre Ustensiles

function createUstensilsFilter(recipes) {

	const filterElement = document.querySelector(".filter-ustensiles");

	filterElement.innerHTML = "";
	filterElement.className = "filter-ustensiles select filter";

	const title = document.createElement("span");
	title.textContent = "Ustensiles";
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
	arrowUp.className = "fa-solid fa-angle-up fa-lg ustensiles";
	arrowUp.style.cursor = "pointer";
	arrowUp.style.display = "none";
	iconDiv.appendChild(arrowUp);
	filterElement.appendChild(iconDiv);

	const filterList = document.createElement("ul");
	const listClass = "filter-ustensiles_list";
	filterList.style.display = "none";
	filterList.className = listClass + " filter-list";
	filterElement.appendChild(filterList);

	// Gestion des evenements 

	arrowDown.addEventListener("click", function () {
		title.style.display = "none";
		input.style.display = "block";
		input.focus();
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "flex";
		closeOtherFilters(filterElement);
		createUstensilsList(recipes);
	});

	arrowUp.addEventListener("click", function () {
		title.style.display = "block";
		input.style.display = "none";
		input.value = "";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterElement.classList.remove("active");
		filterList.style.display = "none";
	});

	input.addEventListener("keyup",function (e) {
		e.stopPropagation();
		createUstensilsList(recipes);
	});
}

// Création de la listes des ustensiles

function createUstensilsList(recipes) {

	let ustensilsArray = [];

	for ( let i = 0; i < recipes.length; i++ ) {
		const recipe = recipes[i];

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
	
	let colneUstensilsArray = ustensilsArray.slice();

	// recherche par le champ input

	const ustensileInput = document.getElementById("ustensiles-input");

	if (ustensileInput.value.length > 2) {
		colneUstensilsArray = searchUstensilItem(colneUstensilsArray, ustensileInput);
	}

	// affichage des elements de la liste

	const ustensilsList = document.querySelector(".filter-ustensiles_list");
	ustensilsList.innerHTML = "";

	for (let i = 0; i < colneUstensilsArray.length; i++) {
		const name = colneUstensilsArray[i];
		const item = createUstensileItem(name, ustensilTags);
		ustensilsList.appendChild(item);
	}
}

// Création des elements de la liste du filtre Ustensiles

function createUstensileItem(name, ustensileArray) {

	const item = document.createElement("li");
	item.className = "ustensile-items";
	item.textContent = name;

	// Gestion de l'evenement
  
	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < ustensileArray.length; i++) {
			if (ustensileArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}

		if (!isNameIncluded) {
			createTag(name, "Ustensiles", ustensilTags );
		}
	}

	item.addEventListener("click", itemClick);

	return item;
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

	// Affichage du tag

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

		if (filter !== filterElement && filter.classList.contains("active") && arrowUp) {
			arrowUp.click();
		}
	}
}
