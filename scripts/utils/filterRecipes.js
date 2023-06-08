let filteredRecipes = [];

async function createFilters(recipes) {

	let selectedIngredients = [];
	let selectedAppliances = [];
	let selectedUstensils = [];

	// Récupération des données pour le contenu des filtres

	function filtersContent(recipes) {

		let ingredientsArray = [];
		let appareilsArray = [];
		let ustensilesArray = [];
		
		for (let i = 0; i < recipes.length; i++) {
			const recipe = recipes[i];
			
			for (let j = 0; j < recipe.ingredients.length; j++) {
				const ingredient = recipe.ingredients[j].ingredient;
				
				if (!ingredientsArray.includes(ingredient)) {
					ingredientsArray.push(ingredient);
				}
			}
			
			if (!appareilsArray.includes(recipe.appliance)) {
				appareilsArray.push(recipe.appliance);
			}
			
			for (let j = 0; j < recipe.ustensils.length; j++) {
				const ustensil = recipe.ustensils[j];
			
				if (!ustensilesArray.includes(ustensil)) {
					ustensilesArray.push(ustensil);
				}
			}
		}
		
		return {
			ingredientsArray: ingredientsArray,
			appareilsArray: appareilsArray,
			ustensilesArray: ustensilesArray
		};
	}

	const {ingredientsArray,appareilsArray, ustensilesArray} = filtersContent(recipes);

	// Création des filtres
	
	createFilter("Ingredients", ingredientsArray, selectedIngredients);
	createFilter("Appareils", appareilsArray, selectedAppliances);
	createFilter("Ustensiles", ustensilesArray, selectedUstensils);


	// Création et gestion des filtres

	function createFilter(filterName, originalArray, taggedArray) {

		const filterElement = document.querySelector(`.filter-${filterName.toLowerCase()}`);
		filterElement.classList.add("select");
		filterElement.classList.add("filter");

		const title = document.createElement("span");
		title.textContent = filterName;
		filterElement.appendChild(title);

		const input = document.createElement("input");
		const inputId = `${filterName.toLowerCase()}-input`;
		input.setAttribute("id", inputId);
		input.style.display = "none";
		input.setAttribute("placeholder", `Rechercher un ${filterName.toLowerCase()}`);
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
		const listClass = `filter-${filterName.toLowerCase()}_list`;
		filterList.style.display = "none";
		filterList.className = listClass + " filter-list";
		filterElement.appendChild(filterList);

		const tagsContainer = document.querySelector(`.${filterName.toLowerCase()}-tags_container`);
		tagsContainer.classList.add("tags-container");

		// Création des elements des listes

		function createFilterItem(name) {
			const item = document.createElement("li");
			item.className = "filter-items";
			item.textContent = name;
		
			item.addEventListener("click", () => {
				if (!taggedArray.includes(name)) {
					taggedArray.push(name);
					displayTag(name);
					//filterFunction();
					arrowUp.click();
				}
			});
		
			return item;
		}

		// Suppression des l'element séléctionné de la liste

		function removeItem(array, item) {
			for (let i = 0; i < array.length; i++) {
				if (array[i] === item) {
					array.splice(i, 1);
					break;
				}
			}
		}

		// Affichage et mise à jour des listes

		function updateFilterList() {
			filterList.innerHTML = "";

			for (let i = 0; i < originalArray.length; i++) {
				filterList.appendChild(createFilterItem(originalArray[i]));
			}
		}

		function updateDisplayedRecipes(){

			if (filterName === "Appareils") {
				filteredRecipes = filterAppareils(recipes, taggedArray);
			}
			if (filterName === "Ingredients") {
				filteredRecipes = filterIngredients(recipes, taggedArray);
			}
			if (filterName === "Ustensiles") {
				filteredRecipes = filterUstensiles(recipes, taggedArray);
			}
			
			displayRecipes(filteredRecipes);

		}

		updateFilterList();
		updateDisplayedRecipes();

		// Affichage et gestion des tags

		function displayTag(text) {
			const tagDiv = document.createElement("div");
			tagDiv.className = `filter-${filterName.toLowerCase()}_items tags-items`;

			const tagText = document.createElement("span");
			tagText.textContent = text;

			const closeButton = document.createElement("i");
			closeButton.className = "fa-regular fa-circle-xmark";
			closeButton.style.cursor = "pointer";

			closeButton.addEventListener("click", () => {
				tagDiv.remove();
				removeItem(taggedArray, text);
				originalArray.push(text);
				updateFilterList();
				updateDisplayedRecipes();
			});

			tagDiv.appendChild(tagText);
			tagDiv.appendChild(closeButton);
			tagsContainer.appendChild(tagDiv);

			removeItem(originalArray, text);
			updateFilterList();
			updateDisplayedRecipes();
		}

		// Gestion des evenements des  fleches

		arrowDown.addEventListener("click", () => {
			title.style.display = "none";
			input.style.display = "block";
			arrowDown.style.display = "none";
			arrowUp.style.display = "block";
			filterElement.classList.add("active");
			filterList.style.display = "flex";
			closeOtherFilters();
		});

		arrowUp.addEventListener("click", () => {
			title.style.display = "block";
			input.style.display = "none";
			arrowDown.style.display = "block";
			arrowUp.style.display = "none";
			filterElement.classList.remove("active");
			filterList.style.display = "none";
		});

		// Gestion des evenements filtres

		function closeOtherFilters() {
			const filterElements = document.querySelectorAll(".filter");
			for (let i = 0; i < filterElements.length; i++) {
				const filter = filterElements[i];
				const arrowUp = filter.querySelector(".fa-angle-up");
				if (filter !== filterElement && arrowUp && filter.classList.contains("active")) {
					arrowUp.click();
				}
			}
		}

		console.log(taggedArray);
		return { originalArray, taggedArray };
	}

	// Filtre des recettes

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
		
		console.log(filteredRecipes);
	
		return filteredRecipes;
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
					if (ustensiles.includes(ustensil)) {
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

	if (filteredRecipes.length === 0) {
		filteredRecipes = recipes;
	} 
	filtersContent(filteredRecipes);

	return filteredRecipes;
}