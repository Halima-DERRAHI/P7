function createIngredientsFilter(ingredientsArray, ingredientTags) {

	const ingredientInput = document.getElementById("ingredients-input");
	const filterElement = document.querySelector(".filter-ingredients");

	if  (filterElement.textContent === "" || (ingredientInput.value == "")) {

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

	} else {
		
		ingredientInput.addEventListener("keyup",function (e) {

			if (ingredientInput.value.length >= 3) {
				e.stopPropagation();
				filterRecipes();
			}else {
				filterRecipes();
			}
		});

		const filteredList = document.querySelector(".filter-ingredients_list");
		const arrowUp = document.querySelector(".fa-angle-up");
		filteredList.innerHTML = "";

		for (let i = 0; i < ingredientsArray.length; i++) {

			const name = ingredientsArray[i];
			const item = createIngredientItem(name, ingredientTags, arrowUp);
			
			filteredList.appendChild(item);
		}

		filterElement.appendChild(filteredList);
	}
}

function createIngredientItem(name, ingredientArray, arrowUp) {

	const ingredientInput = document.getElementById("ingredients-input");
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
			arrowUp.click();
			createTag(name, "Ingredients", ingredientTags );

			if (ingredientInput.value !== "") {
				ingredientInput.value = "";
				filterRecipes();
			}
		}
	}
  
	item.addEventListener("click", clickHandler);
  
	return item;
}

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