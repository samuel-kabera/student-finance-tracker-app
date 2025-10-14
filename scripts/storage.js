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
