import {
  changeCurrency,
  renderRecords,
  updateDashboard,
  updateRecord,
} from "./state.js";
import {
  exportRecords,
  globalStore,
  importRecords,
  storeRecord,
} from "./storage.js";

const form = document.querySelector("form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const sortFieldSelect = document.querySelector("#sortField");
const searchInput = document.querySelector("#records input[type='text']");
const importButton = document.querySelector("#records #import");
const exportButton = document.querySelector("#records #export");
const currencyRadios = document.querySelectorAll("input[name='currency']");
const deleteAllButton = document.querySelector(".delete-all button");

export function updateSearchInput() {
  searchInput.value = globalStore.searchText;
  console.log(globalStore.searchText);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newRecord = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
  };

  // Check if we're editing or adding
  if (globalStore.isEditing) {
    updateRecord(globalStore.editingIndex, newRecord);
  } else {
    storeRecord(newRecord);
    renderRecords();
    updateDashboard();
  }

  // Clear form
  form.reset();
});

// Sort field dropdown event listener
sortFieldSelect.addEventListener("change", (e) => {
  globalStore.activeSortField = e.target.value;
  renderRecords();
});

// Currency change event listeners
currencyRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      changeCurrency(e.target.value);
    }
  });
});

deleteAllButton.addEventListener("click", () => {
  const shouldDelete = confirm(
    "This action will delete all stored transaction. It can't be undone"
  );

  if (shouldDelete) {
    // clear localstorage
    localStorage.clear();
    renderRecords();
    updateDashboard();
  }
});

importButton.addEventListener("click", importRecords);
exportButton.addEventListener("click", exportRecords);
