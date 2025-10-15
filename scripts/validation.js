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

// Function to validate description form input
function validateDescription(description) {
  // Check if empty
  if (description.trim() === "") {
    return {
      isValid: false,
      message: "Description is required",
    };
  }

  // Check for leading or trailing spaces
  let noSpacesPattern = /^\S(?:.*\S)?$/;
  if (!noSpacesPattern.test(description)) {
    return {
      isValid: false,
      message: "Description must not have leading or trailing spaces",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}

// Function to validate amount form input
function validateAmount(amount) {
  // Check if empty
  if (amount.trim() === "") {
    return {
      isValid: false,
      message: "Amount is required",
    };
  }

  // Regex pattern for only numbers with 2 decimal places
  let amountPattern = /^\d+([.]\d{1,2})?$/;
  if (!amountPattern.test(amount)) {
    return {
      isValid: false,
      message:
        "Amount must be a number with up to two decimal places (e.g., 100 or 100.50)",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}

// Function to validate category
function validateCategory(category) {
  // Check if empty
  if (category.trim() === "") {
    return {
      isValid: false,
      message: "Category is required",
    };
  }

  // Regex pattern for text with only letters, spaces, and hyphens)
  let categoryPattern = /^[A-Za-z]+(?:[- ][A-Za-z]+)*$/;
  if (!categoryPattern.test(category)) {
    return {
      isValid: false,
      message: "Category can only contain letters, spaces, and hyphens",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}

// Function to validate date
function validateDate(date) {
  // Check if empty
  if (date.trim() === "") {
    return {
      isValid: false,
      message: "Date is required",
    };
  }

  // Regex pattern for valid date
  let datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!datePattern.test(date)) {
    return {
      isValid: false,
      message: "Date must be in YYYY-MM-DD format (e.g., 2025-06-17)",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}

// Function to show error message
function showError(input, message) {
  // Check if error message already exists
  let errorElement = input.parentElement.querySelector(".error-message");

  if (!errorElement) {
    // Create error message if it didn't exist
    errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.fontSize = "0.9rem";
    errorElement.style.marginTop = "5px";
    input.parentElement.appendChild(errorElement);
  }

  errorElement.textContent = message;
  errorElement.style.display = "block";
  input.style.borderColor = "red";
}

// Function to hide error message
function hideError(input) {
  let errorElement = input.parentElement.querySelector(".error-message");

  if (errorElement) {
    errorElement.style.display = "none";
  }

  input.style.borderColor = "#d4d4d4";
}

function setupFormValidation() {
  let descriptionInput = document.querySelector("#description");
  let amountInput = document.querySelector("#amount");
  let categoryInput = document.querySelector("#category");
  let dateInput = document.querySelector("#date");

  // Validate description on input
  descriptionInput.addEventListener("input", function () {
    let value = descriptionInput.value;
    let validation = validateDescription(value);

    if (!validation.isValid) {
      showError(descriptionInput, validation.message);
    } else {
      hideError(descriptionInput);
    }
  });

  // Validate amount on input
  amountInput.addEventListener("input", function () {
    let value = amountInput.value;
    let validation = validateAmount(value);

    if (!validation.isValid) {
      showError(amountInput, validation.message);
    } else {
      hideError(amountInput);
    }
  });

  // Validate category on input
  categoryInput.addEventListener("input", function () {
    let value = categoryInput.value;
    let validation = validateCategory(value);

    if (!validation.isValid) {
      showError(categoryInput, validation.message);
    } else {
      hideError(categoryInput);
    }
  });

  // Validate date on input
  dateInput.addEventListener("input", function () {
    let value = dateInput.value;
    let validation = validateDate(value);

    if (!validation.isValid) {
      showError(dateInput, validation.message);
    } else {
      hideError(dateInput);
    }
  });
}

// Initialize form validation on page load
window.addEventListener("load", function () {
  setupFormValidation();
});

export { validateSearch };
