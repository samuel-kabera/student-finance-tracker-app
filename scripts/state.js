// Function to get all records from localStorage
function getRecords() {
  let records = localStorage.getItem("records");
  if (records) {
    return JSON.parse(records);
  } else {
    return [];
  }
}

// Function to show records in the table
function renderRecords() {
  let records = getRecords();
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

    // Amount
    let amount = document.createElement("p");
    amount.textContent = "$" + record.amount.toFixed(2);
    row.appendChild(amount);

    // Actions (Edit and Delete buttons)
    let actions = document.createElement("div");
    actions.className = "actions";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "delete";

    // Add click event to delete button
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

// Function to delete a record
function deleteRecord(index) {
  let records = getRecords();
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  renderRecords();
  updateDashboard();
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

  // Calculate total spent
  let totalSpent = 0;
  for (let i = 0; i < records.length; i++) {
    totalSpent = totalSpent + records[i].amount;
  }
  let totalSpentElement = document.querySelector(".total-spent .value");
  totalSpentElement.textContent = "$" + totalSpent.toFixed(2);

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

// Run when page loads
window.addEventListener("load", function () {
  renderRecords();
  updateDashboard();
});

export { renderRecords, updateDashboard };
