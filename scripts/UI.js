import {
  editingIndex,
  isEditing,
  renderRecords,
  updateDashboard,
  updateRecord,
} from "./state.js";
import { storeRecord } from "./storage.js";

const form = document.querySelector("form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newRecord = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
  };

  // Check if we're editing or adding
  if (isEditing) {
    updateRecord(editingIndex, newRecord);
  } else {
    storeRecord(newRecord);
    renderRecords();
    updateDashboard();
  }

  // Clear form
  form.reset();
});
