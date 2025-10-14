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
    deleteBtn.setAttribute("data-index", i);

    // Add click event to delete button
    deleteBtn.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      let confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
      );
      if (confirmDelete) {
        deleteRecord(index);
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    row.appendChild(actions);

    table.appendChild(row);
  }
}
