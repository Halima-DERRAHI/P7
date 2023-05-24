async function getRecipes() {

	const reponse = await fetch("data/recipes.json");
	const recipes = await reponse.json();

	return recipes;
}
