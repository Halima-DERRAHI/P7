const selectElements = document.querySelectorAll(".select");

selectElements.forEach((selectElement) => {
	selectElement.addEventListener("click", () => {
		selectElement.classList.add("active");
	});
});
