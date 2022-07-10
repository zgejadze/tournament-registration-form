// update tab indicator when user starts to fill forms

const tabsIndexListElement = document.getElementById("tabs-list");
const inputFieldsElements = document.querySelectorAll(
  "#personal-information input"
);
let formsData; // will be updated later
const storedData = JSON.parse(localStorage.getItem('formsData'))


const personalInformationFormElement = document.getElementById(
    "personal-information"
  );

function addIndicatorActiveClass() {
  tabsIndexListElement.firstElementChild.firstElementChild.classList.add(
    "active"
  );
}

for (const input of inputFieldsElements) {
  input.addEventListener("change", addIndicatorActiveClass);
}




/// check if data exists already and prefill data
const nameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const phoneInputElement = document.getElementById("phone");
const dateInputElement = document.getElementById("date_of_birth");

if(localStorage.getItem('formsData')){
    nameInputElement.value = storedData.name
    emailInputElement.value = storedData.email
    phoneInputElement.value = storedData.phone
    dateInputElement.value = storedData['date_of_birth']
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

//create entered user data object

let userData = {};

/////////////////////////
// validate name field //
/////////////////////////

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


let phoneIsValid;
function validatePhone(event) {
  const enteredNumber = event.target.value;

  if (enteredNumber.toString().length < 9) {
    phoneInputElement.classList.remove("input-field-success");
    phoneInputElement.classList.add("input-field-error");

    phoneIsValid = false;
    phoneInputElement.addEventListener("focusout", togglePopup);
    setPopupText("Invalid phone Number", "name must be 9 digits long");
  } else if (enteredNumber.toString().length > 8) {
    phoneInputElement.value = enteredNumber.toString().slice(0, 9);
    phoneInputElement.classList.replace(
      "input-field-error",
      "input-field-success"
    );

    phoneIsValid = true;
    phoneInputElement.removeEventListener("focusout", togglePopup);
  }
}

phoneInputElement.addEventListener("input", validatePhone);

//////////////////////////
// validate date field  //
//////////////////////////


dateInputElement.max = new Date().toLocaleDateString("en-ca");

let dateIsValid;

function validateDate(event) {
  const enteredDate = event.target.value;
  if (!enteredDate) {
    event.target.type = "text";

    dateInputElement.addEventListener("focusout", togglePopup);
    setPopupText("Invalid date", "Please select proper date");
    dateIsValid = false;
  } else if (!event.target.validity.valid) {
    dateInputElement.classList.add("input-field-error");
    dateIsValid = false;
  } else {
    dateInputElement.classList.remove("input-field-error");
    dateInputElement.classList.add("input-field-success");

    dateInputElement.removeEventListener("focusout", togglePopup);
    dateIsValid = true;
  }
}
dateInputElement.addEventListener("focusout", validateDate);

/////////// storing entered input in localstorage  ////////////
// validates every input
function validateForm() {
  if (nameIsValid && emailIsValid && phoneIsValid && dateIsValid) {
    const firstTabIndexElement = document.getElementById("first-tab");
    firstTabIndexElement.classList.replace('active', 'success')

    formsData = {
        'name': nameInputElement.value,
        'email': emailInputElement.value,
        'phone': phoneInputElement.value,
        'date_of_birth': dateInputElement.value
    }
     
    localStorage.setItem('formsData', JSON.stringify(formsData))
    
    return true;
  } else {
    return false;
  }
}




/////// next button /////////
const nextPageButtonElement =
  document.getElementById("form-controll").children[1];
const backPageButtonElement = nextPageButtonElement.previousElementSibling;

function goToSecondPage(event) {
  if (validateForm() || localStorage.getItem('formsData')) {
    //  1. update tab indexes
    const secondTabIndexElement = document.getElementById("second-tab");
    const firstTabIndexElement = document.getElementById("first-tab");
    firstTabIndexElement.textContent = ''
    
    secondTabIndexElement.classList.remove("inactive");
    //  2. update theme image
    const themeSideElement = document.getElementById("theme-side");
    themeSideElement.style.backgroundImage = "url('/images/pink.jpg')";
    //  3. update quote
    const quoteElement = document.getElementById("quote").firstElementChild;
    const qupteAuthorElement = quoteElement.nextElementSibling;

    quoteElement.textContent =
      "“Many have become chess masters; no one has become the master of chess.”";
    qupteAuthorElement.textContent = "- Siegbert Tarrasch";
    //  4. update form title
    const formTileElement = document.querySelector(".form-title h4");
    formTileElement.textContent = "Chess experience";

    //  5. remove old inputs and initiate new inputs
    personalInformationFormElement.innerHTML = "";

    //  6. change buttons

    event.target.textContent = "Done";
    backPageButtonElement.href = "/personal-information.html";


    // 7 add new forms elements
    const selectExperienceDropdownElement = document.createElement('select')
    selectExperienceDropdownElement.classList.add('experience-selector')
    
    const levels = ['begginer', "intermediate", 'professional']
    let selectOptionElement
    for(const level of levels){
        selectOptionElement = document.createElement('option')
        selectOptionElement.textContent = level
        selectOptionElement.classList.add('experience-itemss')
        selectExperienceDropdownElement.appendChild(selectOptionElement)
    }

    formElement.appendChild(selectExperienceDropdownElement)
  }
}

nextPageButtonElement.addEventListener("click", goToSecondPage);
