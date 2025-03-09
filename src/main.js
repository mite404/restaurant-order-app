import menuArray from "./data/menuArray.js";
import User from "./models/User.js";
import { renderMenu } from "./views/view.js";
import {
  handleAddItemClick,
  handleRemoveItemClick,
  toggleModalVisibility,
} from "./utils/utils.js";

const menuContainer = document.getElementById("menu-container");
const paymentBtn = document.getElementById("paymentBtn");
const ccform = document.getElementById("paymentConsentForm");

// Add Item Event Listeners
// `removebtn` gets rendered on the page later, so document event listener is used
document.addEventListener("click", (e) => {
  if (e.target.dataset.addbtn) {
    console.log("`addbtn` EventListener attached");
    handleAddItemClick(e.target.dataset.addbtn);
  } else if (e.target.dataset.removebtn) {
    console.log("`handleRemoveItemClick` called");
    handleRemoveItemClick(e.target.dataset.removebtn);
  }
});

// Modal Event Listeners
// `modal-close-btn` gets rendered on the page later, so document event listener is used
document.addEventListener("click", (e) => {
  if (e.target.id === "completebtn") {
    console.log("`completebtn` EventListener attached");
    toggleModalVisibility(true);
  } else if (e.target.id === "modal-close-btn") {
    console.log("`modal-close-btn` EventListener attached");
    toggleModalVisibility(false);
  }
});

// Payment Consent Form Event Listeners
paymentBtn.addEventListener("click", (e) => {
  if (!ccform.reportValidity()) {
    e.preventDefault();
  } else {
    const name = document.getElementById("name-field").value;
    const cardNumber = document.getElementById("card-field").value;
    const cvv = document.getElementById("cvv-field").value;

    addCreditCard(name, cardNumber, cvv);
  }
});

// Credit Card input - numbers only
ccform.addEventListener("input", (e) => {
  const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric chars

  if (e.target.id === "card-field") {
    e.target.value = numericValue;
  } else if (e.target.id === "cvv-field") {
    e.target.value = numericValue;
    if (numericValue.length > 3) {
      e.target.value = numericValue;
    }
  }
});

function addCreditCard(name, cardNumber, cvv) {
  const newUser = new User(name, cardNumber, cvv);
  newUser.addUser();
}

// Initial render
menuContainer.innerHTML = renderMenu(menuArray);
