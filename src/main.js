import { menuArray } from "./data/data.js";

const menuContainer = document.getElementById("menu-container");
const completeOrderBtn = document.getElementById("completebtn");
const modal = document.getElementById("modal");
const backdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("modal-close-btn");
const cart = [];

function renderMenu(menuArray) {
  let menuHTML =
    menuArray
      .map((menuItem) => `
      <div class="menu-item-row">
        <div class="column left">
          <p class="emoji">${menuItem.emoji}</p>
        </div>
        <div class="column center">
          <h3 class="menu h1"><em>${menuItem.name}</em></h3>
          <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
          <p class="price"><em>$${menuItem.price}</em></p>
        </div>
        <div class="column right">
          <button id="addbtn" data-addbtn="${menuItem.id}">+</button>
        </div>
      </div>
    `,
      )
      .join("<hr>") + `<hr>`;

  return menuHTML;
}

function updateCartDisplay(cart) {
  let cartHTML = "";

  if (cart.length > 0) {
    cart.forEach((item) => {
      cartHTML += `
        <div class="cart-item-row">
          <div class="column left">
            <p class="emoji">${item.emoji}</p>
          </div>
          <div class="column center">
            <h3 class="menu h1"><em>${item.name}</em></h3>
            <a href="#"><i class="fa-regular fa-trash-can" id="removebtn" data-removebtn="${item.id}"></i></a>
          </div>
          <div class="column right">
            <p>$${item.price}</p>
          </div>
        </div>
      `;
    });

    cartHTML += `
      <hr>  
      <div class="total-container">
        <div class="total-price-text">
          <p>Total Price:</p>
        </div>
        <div class="total-price">
          <p>$${cart.reduce((total, item) => total + item.price, 0)}</p>
        </div>
      </div>
      <div id="completebtn-container">
      <button class="button" id="completebtn" data-completebtn="completebtn">Complete Order</button>
      </div>
      `;

    document.querySelector(".order").innerHTML = cartHTML;
  } else {
    document.querySelector(".order").innerHTML = "<p>Your cart is empty.</p>";
  }
}

// Event listeners
document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.dataset.addbtn) {

    console.log("`addbtn` EventListener attached");
    handleAddItemClick(target.dataset.addbtn);

  } else if (target.dataset.removebtn) {

    console.log("`handleRemoveItemClick` called");
    handleRemoveItemClick(target.dataset.removebtn);

  } else if (target.id === "completebtn") {

    console.log("`completebtn` EventListener attached");
    handleCompleteBtnClick();

  } else if (target.id === "modal-close-btn") {

    console.log("`modal-close-btn` EventListener attached");
    handleCloseModalBtnClick();
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

document
  .getElementById("paymentConsent")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cvv = document.getElementById("cvv").value;
  });

function handleAddItemClick(itemId) {
  if (!itemId || isNaN(itemId)) {
    console.error("Invalid itemId!");
    return;
  }

  const targetItemObj = menuArray.find((item) => item.id === parseInt(itemId));

  if (!targetItemObj) {
    console.error("Item not found!");
    return;
  }

  cart.push(targetItemObj);
  console.log(`cart now has ${JSON.stringify(targetItemObj)}`);

  updateCartDisplay(cart); // Pass the cart array and it's contents to function
}

function handleRemoveItemClick(itemId) {
  if (!itemId || isNaN(itemId)) {
    console.error("Invalid itemId!");
    return;
  }

  const itemIndex = findItemIndex(itemId);
  removeItemFromCart(itemIndex);
}

function removeItemFromCart(itemIndex) {
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);

    console.log(`Item with id ${JSON.stringify(itemIndex)} removed from cart`);

    updateCartDisplay(cart);
  } else {
    console.error("Item not found in cart!");
  }
}

function findItemIndex(itemId) {
  return cart.findIndex((item) => item.id === parseInt(itemId));
}

// Initial render
menuContainer.innerHTML = renderMenu(menuArray);
