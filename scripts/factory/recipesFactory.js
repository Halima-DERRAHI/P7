function recipesFactory(recipe) {

	const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;

	function recipeCardDOM() {
        
		const recipeCard = document.createElement("div");
		recipeCard.classList.add("recipe-card");
		const recipePicture = document.createElement("div");
		recipePicture.classList.add("recipe-picture");
		const recipePictureImg = document.createElement("img");
		recipePictureImg.setAttribute("src" , `assets/images/photos/${image}`);
		recipePicture.appendChild(recipePictureImg);
		recipeCard.appendChild(recipePicture);

		const recipeDescription = document.createElement("div");
		recipeDescription.classList.add("recipe-description");
		recipeCard.appendChild(recipeDescription);

		const recipeTitle = document.createElement("h2");
		recipeTitle.classList.add("recipe-title");
		recipeTitle.textContent = name;
		recipeDescription.appendChild(recipeTitle);

		const timeDiv = document.createElement("div");
		timeDiv.classList.add("time");

		const timeIcon = document.createElement("i");
		timeIcon.classList.add("fa-sharp", "fa-regular", "fa-clock");
		timeDiv.appendChild(timeIcon);

		const recipeTiming = document.createElement("span");
		recipeTiming.classList.add("recipe-timing");
		recipeTiming.textContent = time + " min";
		timeDiv.appendChild(recipeTiming);
		recipeDescription.appendChild(timeDiv);

		const recipeIngredients = document.createElement("ul");
		recipeIngredients.classList.add("recipe-ingredients");
		
		for (let i = 0; i < ingredients.length; i++) {

			const ingredient = document.createElement("li");

			const ingredientName = document.createElement("b");
			ingredientName.textContent = ingredients[i].ingredient;
			ingredient.appendChild(ingredientName);
			
			if (ingredients[i].quantity) {
				const ingredientQuantity = document.createElement("span");
				ingredientQuantity.classList.add("quantity");
				ingredientQuantity.textContent = ": " + ingredients[i].quantity;
				ingredient.appendChild(ingredientQuantity);
			}

			if (ingredients[i].unit) {
				const ingredientUnit = document.createElement("span");
				ingredientUnit.classList.add("unit");
				ingredientUnit.textContent = ingredients[i].unit;
				ingredient.appendChild(ingredientUnit);
			}

			recipeIngredients.appendChild(ingredient);
		}

		recipeDescription.appendChild(recipeIngredients);
		
		const recipeSteps = document.createElement("p");
		recipeSteps.classList.add("recipe-steps");
		recipeSteps.textContent = description;
		recipeDescription.appendChild(recipeSteps);

		return recipeCard;
	}
	return {name, recipeCardDOM};
}