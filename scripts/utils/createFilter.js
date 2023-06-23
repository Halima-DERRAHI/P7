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

// Création de la liste du filtre Ingrédient

function createIngredientsList(recipes) {

	let ingredientsArray = [];

	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredientObj => {
			const ingredient = ingredientObj.ingredient.toLowerCase();
			let ingredientsExists = false;
			
			ingredientsArray.forEach(existingIngredient => {
				if ((existingIngredient.toLowerCase() === ingredient.toLowerCase()) || 
				(ingredient.toLowerCase().endsWith("s") && existingIngredient.toLowerCase() === ingredient.toLowerCase().slice(0, -1))
				) {
					ingredientsExists = true;
				}
			});

			if (!ingredientsExists) {
				const tagExists = ingredientTags.filter(existingTag => existingTag.toLowerCase() === ingredient.toLowerCase()).length > 0;
	
				if (!tagExists) {
					ingredientsArray.push(ingredient);
				}
			}
		});
	});

	// Recherche d'ingredients via l'input ingredient et la créattion de la liste

	let cloneIngredientsArray = ingredientsArray.slice();
	const ingredientInput = document.getElementById("ingredients-input");

	if (ingredientInput.value.length > 2) {
		cloneIngredientsArray = searchIngredientItem(cloneIngredientsArray, ingredientInput);
	}

	const ingredientsList = document.querySelector(".filter-ingredients_list");
	ingredientsList.innerHTML = "";

	cloneIngredientsArray.forEach(name => {
		const item = createIngredientItem(name, ingredientTags);
		ingredientsList.appendChild(item);
	});
}

// Création des éléments de la liste du filtre Ingrédient

function createIngredientItem(name, ingredientArray) {

	const item = document.createElement("li");
	item.className = "ingredient-items";
	item.textContent = name;
  
	// Gestion du click de l'element

	function itemClick() {
	
		if (!ingredientArray.includes(name)) {
			createTag(name, "Ingredients", ingredientTags);
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

// Création de la liste du filtre Appareils

function createAppliancesList(recipes) {
	let appliancesArray = [];

	recipes.forEach(recipe => {
		const applianceExists = appliancesArray.filter(existingAppliance => existingAppliance.toLowerCase() === recipe.appliance.toLowerCase()).length > 0;

		if (!applianceExists) {
			const applianceTagExists = applianceTags.filter(existingTag => existingTag.toLowerCase() === recipe.appliance.toLowerCase()).length > 0;
	
			if (!applianceTagExists) {
				appliancesArray.push(recipe.appliance);
			}
		}
	});

	// Recherche des appareils via l'input appareil et la créattion de la liste

	let cloneAppliancesArray = appliancesArray.slice();
	const applianceInput = document.getElementById("appareils-input");

	if (applianceInput.value.length > 2) {
		cloneAppliancesArray = searchApplianceItem(cloneAppliancesArray, applianceInput);
	}

	const appliancesList = document.querySelector(".filter-appareils_list");
	appliancesList.innerHTML = "";

	cloneAppliancesArray.forEach(name => {
	
		const item = createAppareilItem(name, applianceTags);
		appliancesList.appendChild(item);
	});	
}

// Création des éléments de la liste du filtre Appareils

function createAppareilItem(name, appareilArray) {

	const item = document.createElement("li");
	item.className = "appareil-items";
	item.textContent = name;
  
	function itemClick() {
	
		if (!appareilArray.includes(name)) {
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

// Création de la liste du filtre Ustensiles

function createUstensilsList(recipes) {

	let ustensilsArray = [];

	recipes.forEach(recipe => {
		recipe.ustensils.forEach(ustensil => {
			const ustensilExists = ustensilsArray.filter(existingUstensil => existingUstensil.toLowerCase() === ustensil.toLowerCase()).length > 0;
	
			if (!ustensilExists) {
				const ustensilTagExists = ustensilTags.filter(existingTag => existingTag.toLowerCase() === ustensil.toLowerCase()).length > 0;
	
				if (!ustensilTagExists) {
					ustensilsArray.push(ustensil);
				}
			}
		});
	});

	// Recherche d'ingredients via l'input ingredient et la créattion de la liste
	
	let cloneUstensilsArray = ustensilsArray.slice();
	const ustensileInput = document.getElementById("ustensiles-input");

	if (ustensileInput.value.length > 2) {
		cloneUstensilsArray = searchUstensilItem(cloneUstensilsArray, ustensileInput);
	}

	const ustensilsList = document.querySelector(".filter-ustensiles_list");
	ustensilsList.innerHTML = "";

	cloneUstensilsArray.forEach( name => {
		const item = createUstensileItem(name, ustensilTags);
		ustensilsList.appendChild(item);
	});
}

// Création des éléments de la liste du filtre Ustensiles

function createUstensileItem(name, ustensileArray) {

	const item = document.createElement("li");
	item.className = "ustensile-items";
	item.textContent = name;
  
	function itemClick() {

		if (!ustensileArray.includes(name)) {
			createTag(name, "Ustensiles", ustensilTags);
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

	tagDiv.appendChild(tagText);
	tagDiv.appendChild(closeButton);
	tagsContainer.appendChild(tagDiv);
	
	taggedArray.push(name);

	filterRecipes();
}

// Suppression des tags

function removetag(array, name) {

	const index = array.indexOf(name);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

// Gestion des evenements filtres

function closeOtherFilters(filterElement) {
	const filterElements = document.querySelectorAll(".filter");

	filterElements.forEach(filter => {
		const arrowUp = filter.querySelector(".fa-angle-up");
		if (filter !== filterElement && filter.classList.contains("active") && arrowUp) {
			arrowUp.click();
		}
	});
}