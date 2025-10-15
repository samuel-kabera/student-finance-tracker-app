import { renderRecords, updateDashboard, updateRecord } from "./state.js";
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
const sortInput = document.querySelector("#records .sort input");
const searchInput = document.querySelector("#records input[type='text']");
const importButton = document.querySelector("#records #import");
const exportButton = document.querySelector("#records #export");

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

sortInput.addEventListener("change", (e) => {
  globalStore.isSorted = e.currentTarget.checked;
  renderRecords();
});

importButton.addEventListener("click", importRecords);
exportButton.addEventListener("click", exportRecords);
