const form = document.querySelector("form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

// function to store new records on the localstorage
function storeRecord(record) {
  // adding record to localstorage
  let records = JSON.parse(localStorage.getItem("records"));

  if (records) {
    records.push(record);
  } else {
    records = [record];
  }
  localStorage.setItem("records", JSON.stringify(records));
}

// console.log(descriptionInput.textContent);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRecord = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
  };

  storeRecord(newRecord);
});
