import menuArray from "./data/menuArray.js";
import User from "./models/User.js";
import { renderMenu } from "./views/view.js";
import { handleAddItemClick, handleRemoveItemClick, cart } from "./utils/utils.js";

const menuContainer = document.getElementById("menu-container");
const modal = document.getElementById("modal");
const backdrop = document.getElementById("modal-backdrop");
const form = document.getElementById("paymentConsentForm")

// Event Listeners
document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.dataset.addbtn) {
    console.log("`addbtn` EventListener attached");
    handleAddItemClick(target.dataset.addbtn);

  } else if (target.dataset.removebtn) {
    console.log("`handleRemoveItemClick` called");
    handleRemoveItemClick(target.dataset.removebtn);

  // Modal Event Listeners
  } else if (target.id === "completebtn") {
    console.log("`completebtn` EventListener attached");
    handleCompleteBtnClick();

  } else if (target.id === "modal-close-btn") {
    console.log("`modal-close-btn` EventListener attached");
    handleCloseModalBtnClick();

  // Payment Consent Form Event Listeners
  } else if (target.id === "paymentBtn") {
    if (!form.reportValidity()) {
      e.preventDefault();
    } else {
      const name = document.getElementById("name-field").value;
      const cardNumber = document.getElementById("card-field").value;
      const cvv = document.getElementById("cvv-field").value;

      addCreditCard(name, cardNumber, cvv);
    }
  }
});


// Credit Card input - numbers only
document.addEventListener("input", function (e) {
  const target = e.target;

  if (target.id === "card-field") {
    let value = target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add spaces every 4 digits
    target.value = value;

  } else if (target.id === "cvv-field") {
    let value = target.value.replace(/\D/g, "");
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    target.value = value;
  }
});

function handleCompleteBtnClick() {
  const shouldShowModal = true;

  if (shouldShowModal) {
    console.log("#modal rendered!");
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    backdrop.classList.add("visible");
  }
}

function handleCloseModalBtnClick() {
  modal.classList.add("hidden");
  modal.classList.remove("visible");
  backdrop.classList.remove("visible");
}

function addCreditCard(name, cardNumber, cvv) {
  const newUser = new User(name, cardNumber, cvv);
  newUser.addUser();
}

// Initial render
menuContainer.innerHTML = renderMenu(menuArray);
