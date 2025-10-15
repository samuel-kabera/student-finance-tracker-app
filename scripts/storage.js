// Object to carry global state variables
export const globalStore = {
  isEditing: false,
  isSorted: false,
  isSearchValid: false,
  searchText: "",
  editingIndex: -1,
  currency: "usd",
};

export function storeRecord(record) {
  // adding record to localstorage
  let records = JSON.parse(localStorage.getItem("records"));

  if (records) {
    records.push(record);
  } else {
    records = [record];
  }
  localStorage.setItem("records", JSON.stringify(records));
}

// Function to export records to JSON file
export function exportRecords() {
  // Get records from localStorage
  let records = localStorage.getItem("records");

  if (!records || records === "[]") {
    alert("No records to export!");
    return;
  }

  // Create a blob (file content) from the records
  let blob = new Blob([records], { type: "application/json" });

  // Create a download link
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set filename with current date
  let today = new Date();
  let dateString =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  link.download = "transactions-" + dateString + ".json";

  // Trigger download
  link.click();

  alert("Records exported successfully!");
}

// Function to import records from JSON file
export function importRecords() {
  // Create a file input element
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";

  // Handle file selection
  fileInput.addEventListener("change", function (event) {
    let file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if file is JSON
    if (!file.name.endsWith(".json")) {
      alert("Please select a JSON file!");
      return;
    }

    // Read the file
    let reader = new FileReader();

    reader.onload = function (e) {
      try {
        let fileContent = e.target.result;
        let importedRecords = JSON.parse(fileContent);

        // Check if it's an array
        if (!Array.isArray(importedRecords)) {
          alert("Invalid file format! Expected an array of records.");
          return;
        }

        // Merge with existing records
        let existingRecords = localStorage.getItem("records");
        let currentRecords = existingRecords ? JSON.parse(existingRecords) : [];

        let mergedRecords = currentRecords.concat(importedRecords);
        localStorage.setItem("records", JSON.stringify(mergedRecords));

        alert("Records imported successfully!");

        // Reload page to show new records
        window.location.reload();
      } catch (error) {
        alert("Error reading file! Make sure it's a valid JSON file.");
      }
    };

    reader.readAsText(file);
  });

  // Trigger file selection
  fileInput.click();
}
