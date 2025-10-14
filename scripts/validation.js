// Function to validate the search input
function validateSearch(searchText) {
  // Check if search text is empty
  if (searchText.trim() === "") {
    return {
      isValid: false,
      message: "Please enter something to search",
    };
  }

  // Regex pattern to check for numbers
  let numberPattern = /[0-9]/;
  if (numberPattern.test(searchText)) {
    return {
      isValid: false,
      message: "Search cannot contain numbers",
    };
  }

  // Regex pattern to check for special characters
  let specialCharPattern = /[^a-zA-Z ]/;
  if (specialCharPattern.test(searchText)) {
    return {
      isValid: false,
      message: "Search cannot contain special characters",
    };
  }

  // If all checks pass
  return {
    isValid: true,
    message: "",
  };
}

export { validateSearch };
