import { renderRecords, updateDashboard } from "./state.js";
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

  storeRecord(newRecord);

  // Clear form
  form.reset();

  // Update UI
  renderRecords();
  updateDashboard();
});
