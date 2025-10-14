import { renderRecords } from "./state.js";
import { globalStore } from "./storage.js";
import { validateSearch } from "./validation.js";

// Function to filter records by search text
function filterRecordsBySearch(records) {
  let results = [];

  // Convert search text to lowercase inorder to perform case-insensitive search
  let searchLower = globalStore.searchText.toLowerCase();

  // Loop through all records
  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    // Check if search text matches category or description
    let categoryLower = record.category.toLowerCase();
    let descriptionLower = record.description.toLowerCase();

    if (
      categoryLower.includes(searchLower) ||
      descriptionLower.includes(searchLower)
    ) {
      results.push(record);
    }
  }

  return results;
}

function setupSearch() {
  let searchInput = document.querySelector("#records input[type='text']");
  let errorMessage = document.createElement("p");
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "0.9rem";
  errorMessage.style.display = "none";

  // Add error message after search input
  searchInput.parentElement.appendChild(errorMessage);

  searchInput.addEventListener("input", function () {
    globalStore.searchText = searchInput.value;

    // Hide error message
    errorMessage.style.display = "none";

    // If search is empty, show all records
    if (globalStore.searchText === "") {
      renderRecords();
      return;
    }

    // Validate search input
    let validation = validateSearch(globalStore.searchText);
    globalStore.isSearchValid = validation.isValid;

    if (!validation.isValid) {
      errorMessage.textContent = validation.message;
      errorMessage.style.display = "block";
      errorMessage.style.marginTop = "10px";
      return;
    }

    // Search and display results
    renderRecords();
  });
}

// Initialize search on page load
window.addEventListener("load", function () {
  setupSearch();
});

export { filterRecordsBySearch };
