import { filterRecordsBySearch } from "./search.js";
import { globalStore } from "./storage.js";
import { updateSearchInput } from "./UI.js";

// Currency conversion rates (USD as base)
const CURRENCY_RATES = {
  usd: 1,
  rwf: 1300, // 1 USD = 1300 RWF (approximate)
};

// Function to convert amount between currencies
function convertCurrency(amount, fromCurrency, toCurrency) {
  // Convert to USD first (base currency)
  let amountInUSD = amount / CURRENCY_RATES[fromCurrency];

  // Then convert to target currency
  let convertedAmount = amountInUSD * CURRENCY_RATES[toCurrency];

  return convertedAmount;
}

// Function to format currency based on type
function formatCurrency(amount) {
  if (globalStore.currency === "usd") {
    return "$" + amount.toFixed(2);
  } else if (globalStore.currency === "rwf") {
    return "RWF " + amount.toFixed(0);
  }
  return "$" + amount.toFixed(2); // fallback
}

// Function to get all records from localStorage
function getRecords() {
  let records = localStorage.getItem("records");

  if (records) {
    let recordsArray = JSON.parse(records);

    // sort records
    if (globalStore.isSorted) {
      recordsArray.sort((a, b) => a.amount - b.amount);
    }

    // search records
    recordsArray = filterRecordsBySearch(recordsArray);

    return recordsArray;
  } else {
    return [];
  }
}

// Function to show records in the table
function renderRecords() {
  const records = getRecords();
  let table = document.querySelector("#records .table");

  // Clear everything except the header
  let header = table.querySelector(".header");
  table.innerHTML = "";
  table.appendChild(header);

  // Check if there are no records
  if (records.length === 0) {
    let noRecords = document.createElement("div");
    noRecords.textContent = "No transactions yet. Add your first transaction!";
    noRecords.style.textAlign = "center";
    noRecords.style.padding = "20px";
    noRecords.style.color = "#737373";
    table.appendChild(noRecords);
    return;
  }

  // Loop through records and display them
  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    let row = document.createElement("div");
    row.classList.add("record");

    // Category
    let category = document.createElement("p");
    category.textContent = record.category;
    row.appendChild(category);

    // Description
    let description = document.createElement("p");
    description.textContent = record.description;
    row.appendChild(description);

    // Amount - convert from USD to selected currency
    let amount = document.createElement("p");
    let convertedAmount = convertCurrency(
      record.amount,
      "usd",
      globalStore.currency
    );
    amount.textContent = formatCurrency(convertedAmount);
    row.appendChild(amount);

    // Edit and Delete buttons
    let actions = document.createElement("div");
    actions.className = "actions";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit";

    // edit event
    editBtn.addEventListener("click", function () {
      editRecord(i);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "delete";

    // delete event
    deleteBtn.addEventListener("click", function () {
      let confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
      );
      if (confirmDelete) {
        deleteRecord(i);
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    row.appendChild(actions);
    table.appendChild(row);
  }
}

// Function to edit a record
function editRecord(index) {
  let records = getRecords();
  let record = records[index];

  // Set editing mode
  globalStore.isEditing = true;
  globalStore.editingIndex = index;

  // Fill the form with record data
  let descriptionInput = document.querySelector("#description");
  let amountInput = document.querySelector("#amount");
  let categoryInput = document.querySelector("#category");
  let dateInput = document.querySelector("#date");

  descriptionInput.value = record.description;
  amountInput.value = record.amount;
  categoryInput.value = record.category;
  dateInput.value = record.date;

  // Change button text
  let submitButton = document.querySelector("form button[type='submit']");
  submitButton.textContent = "Update Transaction";

  // Scroll to form
  let formSection = document.querySelector("form").parentElement;
  formSection.scrollIntoView({ behavior: "smooth" });
}

// Function to update a record
function updateRecord(index, updatedRecord) {
  let records = getRecords();
  records[index] = updatedRecord;
  localStorage.setItem("records", JSON.stringify(records));

  // Reset editing mode
  globalStore.isEditing = false;
  globalStore.editingIndex = -1;

  // Change button text back
  let submitButton = document.querySelector("form button[type='submit']");
  submitButton.textContent = "Add Transaction";

  renderRecords();
  updateDashboard();
}

// Function to delete a record
function deleteRecord(index) {
  let records = getRecords();
  const recordToDelete = records[index];

  // get remaining records without search filtering
  globalStore.searchText = "";
  records = getRecords();
  const removableIndex = records.findIndex(
    (record) =>
      record.description === recordToDelete.description &&
      record.category == recordToDelete.category &&
      record.date == recordToDelete.date
  );
  records.splice(removableIndex, 1);

  // update UI and local storage
  localStorage.setItem("records", JSON.stringify(records));
  renderRecords();
  updateDashboard();
  updateSearchInput();
}

// Function to update dashboard numbers
function updateDashboard() {
  let records = getRecords();

  // Update total transactions
  let totalTransactions = records.length;
  let totalTransactionsElement = document.querySelector(
    ".total-transactions .value"
  );
  totalTransactionsElement.textContent = totalTransactions;

  // Calculate total spent (in USD, then convert)
  let totalSpent = 0;
  for (let i = 0; i < records.length; i++) {
    totalSpent = totalSpent + records[i].amount;
  }

  // Convert to selected currency
  let convertedTotal = convertCurrency(totalSpent, "usd", globalStore.currency);
  let totalSpentElement = document.querySelector(".total-spent .value");
  totalSpentElement.textContent = formatCurrency(convertedTotal);

  // Find leading category
  if (records.length === 0) {
    let leadingCategoryElement = document.querySelector(
      ".top-transaction .value"
    );
    leadingCategoryElement.textContent = "-";
  } else {
    // Count spending per category
    let categorySpending = {};

    for (let i = 0; i < records.length; i++) {
      let category = records[i].category.toLowerCase();
      if (categorySpending[category]) {
        categorySpending[category] =
          categorySpending[category] + records[i].amount;
      } else {
        categorySpending[category] = records[i].amount;
      }
    }

    // Find the category with most spending
    let topCategory = "";
    let maxSpending = 0;

    for (let category in categorySpending) {
      if (categorySpending[category] > maxSpending) {
        maxSpending = categorySpending[category];
        topCategory = category;
      }
    }

    // Capitalize first letter
    topCategory = topCategory.charAt(0).toUpperCase() + topCategory.slice(1);

    let leadingCategoryElement = document.querySelector(
      ".top-transaction .value"
    );
    leadingCategoryElement.textContent = topCategory;
  }
}

// Function to handle currency change
function changeCurrency(newCurrency) {
  globalStore.currency = newCurrency;
  renderRecords();
  updateDashboard();
}

// Run when page loads
window.addEventListener("load", function () {
  renderRecords();
  updateDashboard();
});

export {
  changeCurrency,
  getRecords,
  renderRecords,
  updateDashboard,
  updateRecord,
};
