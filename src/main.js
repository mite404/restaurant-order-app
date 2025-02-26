import { menuArray } from "./data/data.js";

const menuContainer = document.getElementById("menu-container");
const cart = [];


function getMenu(menuArray) {
  let menuHTML = "";

  menuArray.forEach((menuItem) => {
    menuHTML += `
      <div class="menu-item-row">
        <div class="column left">
          <p id="emoji">${menuItem.emoji}</p>
        </div>
        <div class="column center">
          <h3 class="item-name">${menuItem.name}</h3>
          <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
          <p class="price">$${menuItem.price}</p>
        </div>
        <div class="column right">
          <button id="addbtn" data-addbtn="${menuItem.id}">+</button>
        </div>
      </div>
    `;
  });
  return menuHTML;
}


document.addEventListener("click", function (e) {
  if (e.target.dataset.addbtn) {
    console.log("`addItem` called");
    handleAddItemClick(e.target.dataset.addbtn);
  }
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

  updateCartDisplay(cart);  // Pass the cart array and it's contents to function
}


function updateCartDisplay(cart) {
  let cartHTML = "";

  if (cart.length > 0) {
    cart.forEach((item) => {

      cartHTML += `
      <div class="cart">
        <div class="column left">
          <p id="emoji">${item.emoji}</p>
          <button id="removebtn" data-removebtn="${item.id}">Remove Item</button>
        </div>
        <div class="column right">
          <p>$${item.price}</p>
        </div>
      </div>
    `;
    });


    cartHTML += `
    <h3>Your Order</h3>
    <hr>
    <div class="total-text">
      <p>Total Price: $${cart.reduce((total, item) => total + item.price, 0)}</p>
    </div>
    `;

    document.querySelector(".order").innerHTML = cartHTML;
  } else {
    document.querySelector(".order").innerHTML = "<p>Your cart is empty.</p>";
  }
}


document.addEventListener("click", function (e) {
  if (e.target.dataset.removebtn) {
    console.log("`handleRemoveItemClick` called");

    handleRemoveItemClick(e.target.dataset.removebtn);
  }
});


function findItemIndex(itemId) {
  return cart.findIndex((item) => item.id === parseInt(itemId));
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


function render(menu) {
  menuContainer.innerHTML = getMenu(menu);
}


render(menuArray); // Initial render
