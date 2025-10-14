import { getRecords, renderRecords } from "./state.js";
import { validateSearch } from "./validation.js";

// Function to search records
function searchRecords(searchText) {
  let records = getRecords();
  let results = [];

  // Convert search text to lowercase inorder to perform case-insensitive search
  let searchLower = searchText.toLowerCase();

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

// Function to display search results
function displaySearchResults(results) {
  renderRecords(results);
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
    let searchText = searchInput.value;

    // Hide error message
    errorMessage.style.display = "none";

    // If search is empty, show all records
    if (searchText === "") {
      // Import and call renderRecords from state.js
      window.location.reload();
      return;
    }

    // Validate search input
    let validation = validateSearch(searchText);

    if (!validation.isValid) {
      errorMessage.textContent = validation.message;
      errorMessage.style.display = "block";
      errorMessage.style.marginTop = "10px";
      return;
    }

    // Search and display results
    let results = searchRecords(searchText);
    displaySearchResults(results);
  });
}

// Initialize search on page load
window.addEventListener("load", function () {
  setupSearch();
});

export { displaySearchResults, searchRecords };
