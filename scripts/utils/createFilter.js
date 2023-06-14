// Création du filtre Ingrédients

function createIngredientsFilter(ingredientsArray, ingredientTags) {

	const ingredientInput = document.getElementById("ingredients-input");
	const filterElement = document.querySelector(".filter-ingredients");

	if  (filterElement.textContent === "") {

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

		// Gestion des evenements du champ de recherche du filtre

		input.addEventListener("keyup",function () {
			if (input.value.length >= 3) {
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
	
		// Création de la liste du filtre

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
			input.textContent = "";
			arrowDown.style.display = "block";
			arrowUp.style.display = "none";
			filterElement.classList.remove("active");
			filterList.style.display = "none";
			filterRecipes();
		});

	} else {

		// Mise à jour des recettes filtrés

		ingredientInput.addEventListener("keyup",function () {
			if ( ingredientInput.value.length > 0 ) {
				filterRecipes();
			}
		});

		// Mise à jour des elements de la liste des Ingrédients

		const filteredList = document.querySelector(".filter-ingredients_list");
		const arrowUp = document.querySelector(".fa-angle-up.ingredients");
		filteredList.innerHTML = "";

		for (let i = 0; i < ingredientsArray.length; i++) {

			const name = ingredientsArray[i];
			const item = createIngredientItem(name, ingredientTags, arrowUp);
			
			filteredList.appendChild(item);
		}

		filterElement.appendChild(filteredList);
	}
}

// Création des elements de la liste du filtre Ingrédient

function createIngredientItem(name, ingredientArray, arrowUp) {

	const item = document.createElement("li");
	item.className = "ingredient-items";
	item.textContent = name;
  
	// Gestion du click de l'element

	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < ingredientArray.length; i++) {
			if (ingredientArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
	
		if (!isNameIncluded) {
			arrowUp.click();
			createTag(name, "Ingredients", ingredientTags );
		}
	}
  
	item.addEventListener("click", itemClick);
  
	return item;
}

// Création du filtre Appareils

function createAppliancesFilter(applianceArray, applianceTags) {

	const filterElement = document.querySelector(".filter-appareils");
	const applianceInput = document.getElementById("appareils-input");

	if (filterElement.textContent === "") {
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

		input.addEventListener("input", function () {
			if (input.value.length >= 3) {
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

		for (let i = 0; i < applianceArray.length; i++) {
			const name = applianceArray[i];
			const item = createAppareilItem(name, applianceTags, arrowUp);
			filterList.appendChild(item);
		}

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
			input.textContent = "";
			arrowDown.style.display = "block";
			arrowUp.style.display = "none";
			filterElement.classList.remove("active");
			filterList.style.display = "none";
		});

	} else {
		applianceInput.addEventListener("keyup", function () {

			if ( applianceInput.value.length > 0 ) {
				filterRecipes();
			}
		});

		const filteredList = document.querySelector(".filter-appareils_list");
		const arrowUp = document.querySelector(".fa-angle-up.appareils");
		filteredList.innerHTML = "";

		for (let i = 0; i < applianceArray.length; i++) {
			const name = applianceArray[i];
			const item = createAppareilItem(name, applianceTags, arrowUp);
			filteredList.appendChild(item);
		}

		filterElement.appendChild(filteredList);
	}
}

// Création des elements de la liste du filtre Appareils

function createAppareilItem(name, appareilArray, arrowUp) {

	const item = document.createElement("li");
	item.className = "appareil-items";
	item.textContent = name;
  
	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < appareilArray.length; i++) {
			if (appareilArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}
  
		if (!isNameIncluded) {
			arrowUp.click();
			createTag(name, "Appareils", applianceTags);
		}
	}
  
	item.addEventListener("click", itemClick);
  
	return item;
}

// Création du filtre Ustensiles

function createUstensilsFilter(ustensilsArray, ustensilTags) {

	const filterElement = document.querySelector(".filter-ustensiles");
	const ustensilInput = document.getElementById("ustensiles-input");

	if ( filterElement.textContent === "" ) {
		filterElement.innerHTML = "";
		filterElement.classList.add("select");
		filterElement.classList.add("filter");

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

		input.addEventListener("keyup", function () {
			if (input.value.length >= 3) {
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

		for (let i = 0; i < ustensilsArray.length; i++) {
			const name = ustensilsArray[i];
			const item = createUstensileItem(name, ustensilTags, arrowUp);
			filterList.appendChild(item);
		}

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
			input.textContent = "";
			arrowDown.style.display = "block";
			arrowUp.style.display = "none";
			filterElement.classList.remove("active");
			filterList.style.display = "none";
			filterRecipes();
		});
	} else {
		ustensilInput.addEventListener("keyup", function () {
			if ( ustensilInput.value.length > 0) {
				filterRecipes();
			}
		});

		const filteredList = document.querySelector(".filter-ustensiles_list");
		const arrowUp = document.querySelector(".fa-angle-up.ustensiles");
		filteredList.innerHTML = "";

		for (let i = 0; i < ustensilsArray.length; i++) {
			const name = ustensilsArray[i];
			const item = createUstensileItem(name, ustensilTags, arrowUp);
			filteredList.appendChild(item);
		}
		filterElement.appendChild(filteredList);
	}
}

// Création des elements de la liste du filtre Ustensiles

function createUstensileItem(name, ustensileArray, arrowUp) {

	const item = document.createElement("li");
	item.className = "ustensile-items";
	item.textContent = name;
  
	function itemClick() {
		let isNameIncluded = false;
		for (let i = 0; i < ustensileArray.length; i++) {
			if (ustensileArray[i] === name) {
				isNameIncluded = true;
				break;
			}
		}

		if (!isNameIncluded) {
			arrowUp.click();
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