// update tab indicator when user starts to fill forms

const tabsIndexListElement = document.getElementById("tabs-list");
const inputFieldsElements = document.querySelectorAll(
  "#personal-information input"
);

function addIndicatorActiveClass() {
  tabsIndexListElement.firstElementChild.firstElementChild.classList.add(
    "active"
  );
}

for (const input of inputFieldsElements) {
  input.addEventListener("change", addIndicatorActiveClass);
}

////////////////////////  validation for input fields ///////////////////////////

// prevents default for form
const formElement = document.getElementById("personal-information");
function preventDefault(event) {
  event.preventDefault();
}
formElement.addEventListener("submit", preventDefault);

/////////////////////////
// validate name field //
/////////////////////////
const nameInputElement = document.getElementById("name");

function validateName() {
  const enteredText = event.target.value;

  if (!enteredText.trim() || enteredText.trim().length < 2) {
    nameInputElement.classList.remove("input-field-success");
    nameInputElement.classList.add("input-field-error");
  } else {
    nameInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );
  }
}

nameInputElement.addEventListener("input", validateName);

//////////////////////////
// validate email field //
//////////////////////////

const emailInputElement = document.getElementById("email");

function validateEmail(event) {
  const enteredText = event.target.value;
  if (enteredText.trim().length < 11 || !enteredText.endsWith("@redberry.ge")) {
    emailInputElement.classList.remove("input-field-success");
    emailInputElement.classList.add("input-field-error");
  } else {
    emailInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );
  }
}

emailInputElement.addEventListener("input", validateEmail);

//////////////////////////
// validate phone field //
//////////////////////////

const phoneInputElement = document.getElementById("phone");



function validatePhone(event) {
  const enteredNumber = event.target.value;

  if (enteredNumber.toString().length < 9) {
    phoneInputElement.classList.remove("input-field-success");
    phoneInputElement.classList.add("input-field-error");
  } else if (enteredNumber.toString().length > 8) {
    phoneInputElement.value = enteredNumber.toString().slice(0, 9);
    phoneInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );
  }
}

phoneInputElement.addEventListener("input", validatePhone);

//////////////////////////
// validate date field  //
//////////////////////////

const dateInputElement = document.getElementById("date_of_birth");

dateInputElement.max = new Date().toLocaleDateString("en-ca");



function openPicker(event) {
    dateInputElement.datepicker.show();
  }


function validateDate(event) {
  const enteredDate = event.target.value;
  if (!enteredDate) {
    event.target.type = "text";
  }
  if (event.target.validity.valid) {
    dateInputElement.classList.add("input-field-success");
  }
}

dateInputElement.addEventListener("focusout", validateDate);
dateInputElement.addEventListener("click", openPicker);


