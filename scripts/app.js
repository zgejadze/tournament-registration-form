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

// //// error popup ////////
const errorPopupElement = document.getElementById("error-popup");
const closePopupButtonElement = document.getElementById("close-popup");
const errorPopupMessageTitleElement = document.getElementById("error-message");
const errorPopupMessageTextElement = document.getElementById("error-text");

function closePopup() {
  errorPopupElement.style.display = "none";
}

function togglePopup() {
  errorPopupElement.style.display = "block";
}

// helper function to set popup text to different strings
function setPopupText(title, text) {
  const errorPopupMessageTitleElement =
    document.getElementById("error-message");
  const errorPopupMessageTextElement = document.getElementById("error-text");

  errorPopupMessageTitleElement.textContent = title;
  errorPopupMessageTextElement.textContent = text;
}
/////////

closePopupButtonElement.addEventListener("click", closePopup);

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

let nameIsValid;

function validateName(event) {
  const enteredText = event.target.value;

  if (!enteredText.trim() || enteredText.trim().length < 2) {
    nameInputElement.classList.remove("input-field-success");
    nameInputElement.classList.add("input-field-error");

    nameInputElement.addEventListener("focusout", togglePopup);

    nameIsValid = false;

    setPopupText("Invalid name", "Number must be at least 2 characters long");
  } else {
    nameInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );
    nameInputElement.removeEventListener("focusout", togglePopup);

    nameIsValid = true;
  }
}

nameInputElement.addEventListener("input", validateName);

//////////////////////////
// validate email field //
//////////////////////////

const emailInputElement = document.getElementById("email");

let emailIsValid;

function validateEmail(event) {
  const enteredText = event.target.value;
  if (enteredText.trim().length < 11 || !enteredText.endsWith("@redberry.ge")) {
    emailInputElement.classList.remove("input-field-success");
    emailInputElement.classList.add("input-field-error");

    emailInputElement.addEventListener("focusout", togglePopup);
    setPopupText("Invalid E-mail", "E-mail must be end with @redberry.ge");

    emailIsValid = false;
  } else {
    emailInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );

    emailInputElement.removeEventListener("focusout", togglePopup);
    emailIsValid = true;
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

    phoneInputElement.addEventListener("focusout", togglePopup);
    setPopupText("Invalid phone Number", "name must be 9 digits long");
  } else if (enteredNumber.toString().length > 8) {
    phoneInputElement.value = enteredNumber.toString().slice(0, 9);
    phoneInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );

    phoneInputElement.removeEventListener("focusout", togglePopup);
  }
}

phoneInputElement.addEventListener("input", validatePhone);

//////////////////////////
// validate date field  //
//////////////////////////

const dateInputElement = document.getElementById("date_of_birth");

dateInputElement.max = new Date().toLocaleDateString("en-ca");

function validateDate(event) {
  const enteredDate = event.target.value;
  if (!enteredDate) {
    event.target.type = "text";

    dateInputElement.addEventListener("focusout", togglePopup);
    setPopupText("Invalid date", "Please select proper date");
  } else if (!event.target.validity.valid) {
    dateInputElement.classList.add("input-field-error");
  } else {
    dateInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );

    dateInputElement.removeEventListener("focusout", togglePopup);
  }
}
dateInputElement.addEventListener("focusout", validateDate);

///////////////////////////////////////////////////////////////
/////////// storing entered input in localstorage  ////////////
///////////////////////////////////////////////////////////////

const nextPageButtonElement =
  document.getElementById("form-controll").children[1];

function goToSecondPage() {
  //  1. update second tab indexe
  //  2. update theme image
  //  3. update quote
  //  4. update form title
  //  5. remove old inputs and initiate new inputs
  //  6. change btn to done
}

nextPageButtonElement.addEventListener("click", goToSecondPage);
