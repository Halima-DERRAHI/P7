function createFilter(filterName, originalArray, selectedArray) {

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
  
	function createFilterItem(text) {
		const filterItem = document.createElement("li");
		filterItem.textContent = text;
		filterItem.className = "filter-items";

		filterItem.addEventListener("click", () => {
			displaySelectedElement(text);
			arrowUp.click();
		});

		return filterItem;
	}
  
	function displaySelectedElement(text) {
		const selectedElementDiv = document.createElement("div");
		selectedElementDiv.className = `filter-${filterName.toLowerCase()}_items tags-items`;
	
		const selectedElementText = document.createElement("span");
		selectedElementText.textContent = text;
		const closeButton = document.createElement("i");
		closeButton.className = "fa-regular fa-circle-xmark";
		closeButton.style.cursor = "pointer";
	
		closeButton.addEventListener("click", () => {
			selectedElementDiv.remove();
			removeItem(selectedArray, text);
			originalArray.push(text);
			updateFilterList();
		});
  
		selectedElementDiv.appendChild(selectedElementText);
		selectedElementDiv.appendChild(closeButton);
		tagsContainer.appendChild(selectedElementDiv);
		selectedArray.push(text);
	
		removeItem(originalArray, text);
		updateFilterList();
	}
  
	function removeItem(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === item) {
				array.splice(i, 1);
				break;
			}
		}
	}
  
	function updateFilterList() {
		filterList.innerHTML = "";
  
		for (let i = 0; i < originalArray.length; i++) {
			filterList.appendChild(createFilterItem(originalArray[i]));
		}
	}
  
	updateFilterList();
  
	arrowDown.addEventListener("click", () => {
		title.style.display = "none";
		input.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterElement.classList.add("active");
		filterList.style.display = "grid";
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
}
  
function createIngredientsFilter() {
	const originalIngredients = ["sucre", "farine", "beurre"];
	let ingredients = originalIngredients.slice();
	let selectedIngredients = [];

	createFilter("Ingredients", ingredients, selectedIngredients);
}
  
function createAppareilsFilter() {
	const originalAppareils = ["four", "casserole", "poele", "four", "casserole", "poele", "four", "casserole", "poele", "four", "casserole", "poele"];
	let appareils = originalAppareils.slice();
	let selectedAppareils = [];
  
	createFilter("Appareils", appareils, selectedAppareils);
}

function createUstansilesFilter() {
	const originalUstansiles = ["fouet", "casserole", "poele"];
	let ustensiles = originalUstansiles.slice();
	let selectedUstensiles = [];
  
	createFilter("Ustensiles", ustensiles, selectedUstensiles);
}

/*function createIngredientsFilter() {
	const filterIngredients = document.querySelector(".filter-ingredients");
	filterIngredients.classList.add("select");

	const title = document.createElement("span");
	title.textContent = "Ingredients";
	filterIngredients.appendChild(title);
  
	const inputIngredients = document.createElement("input");
	inputIngredients.setAttribute("id", "ingredients-input");
	inputIngredients.style.display = "none";
	inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
	inputIngredients.setAttribute("autocomplete", "off");
	inputIngredients.className = "search-input";
	filterIngredients.appendChild(inputIngredients);
  
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
	filterIngredients.appendChild(iconDiv);

	const filterIngredientsList = document.createElement("ul");
	filterIngredientsList.style.display = "none";
	filterIngredientsList.className = "filter-ingredients_list";
	filterIngredients.appendChild(filterIngredientsList);

	arrowDown.addEventListener("click", () => {
		title.style.display = "none";
		inputIngredients.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterIngredients.classList.add("active");
	});

	arrowUp.addEventListener("click", () => {
		title.style.display = "block";
		inputIngredients.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterIngredients.classList.remove("active");
	});

	/*filterIngredients.addEventListener("focus", (event) => {
		if (!filterIngredients.contains(event.target)) {
			arrowUp.click();
		}
	});
}
  
function createAppareilsFilter() {
	const filterAppareils = document.querySelector(".filter-appareils");
	filterAppareils.classList.add("select");

	const title = document.createElement("span");
	title.textContent = "Appareils";
	filterAppareils.appendChild(title);
  
	const inputAppareils = document.createElement("input");
	inputAppareils.setAttribute("id", "appareils-input");
	inputAppareils.style.display = "none";
	inputAppareils.setAttribute("placeholder", "Rechercher un appareil");
	inputAppareils.setAttribute("autocomplete", "off");
	inputAppareils.className = "search-input";
	filterAppareils.appendChild(inputAppareils);
  
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
	filterAppareils.appendChild(iconDiv);

	const filterAppareilsList = document.createElement("ul");
	filterAppareilsList.style.display = "none";
	filterAppareilsList.className = "filter-appareils_list";
	filterAppareils.appendChild(filterAppareilsList);

	arrowDown.addEventListener("click", () => {
		title.style.display = "none";
		inputAppareils.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterAppareils.classList.add("active");
	});

	arrowUp.addEventListener("click", () => {
		title.style.display = "block";
		inputAppareils.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterAppareils.classList.remove("active");
	});
}
  
function createUstensilesFilter() {
	const filterUstensiles = document.querySelector(".filter-ustensiles");
	filterUstensiles.classList.add("select");

	const title = document.createElement("span");
	title.textContent = "Ustensiles";
	filterUstensiles.appendChild(title);
  
	const inputUstensiles = document.createElement("input");
	inputUstensiles.setAttribute("id", "ustensiles-input");
	inputUstensiles.style.display = "none";
	inputUstensiles.setAttribute("placeholder", "Rechercher un ingrédient");
	inputUstensiles.setAttribute("autocomplete", "off");
	inputUstensiles.className = "search-input";
	filterUstensiles.appendChild(inputUstensiles);
  
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
	filterUstensiles.appendChild(iconDiv);

	const filterUstensilesList = document.createElement("ul");
	filterUstensilesList.style.display = "none";
	filterUstensilesList.className = "filter-ustensiles_list";
	filterUstensiles.appendChild(filterUstensilesList);

	arrowDown.addEventListener("click", () => {
		title.style.display = "none";
		inputUstensiles.style.display = "block";
		arrowDown.style.display = "none";
		arrowUp.style.display = "block";
		filterUstensiles.classList.add("active");
	});

	arrowUp.addEventListener("click", () => {
		title.style.display = "block";
		inputUstensiles.style.display = "none";
		arrowDown.style.display = "block";
		arrowUp.style.display = "none";
		filterUstensiles.classList.remove("active");
	});
}
*/