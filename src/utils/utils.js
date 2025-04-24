// Helper functions

import menuArray from "../data/menuArray.js";
import { updateCartDisplay } from "../views/view.js";

const modal = document.getElementById("modal");
const backdrop = document.getElementById("modal-backdrop");

export const cart = [];

export function handleAddItemClick(itemId) {
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

export function handleRemoveItemClick(itemId) {
  if (!itemId || isNaN(itemId)) {
    console.error("Invalid itemId!");
    return;
  }

  const itemIndex = findItemIndex(itemId);
  removeItemFromCart(itemIndex);
}

export function removeItemFromCart(itemIndex) {
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);

    console.log(`Item with id ${JSON.stringify(itemIndex)} removed from cart`);

    updateCartDisplay(cart);
  } else {
    console.error("Item not found in cart!");
  }
}

export function findItemIndex(itemId) {
  return cart.findIndex((item) => item.id === parseInt(itemId));
}

export function toggleModalVisibility(isVisible) {
  if (isVisible) {
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    backdrop.classList.add("visible");
  } else {
    modal.classList.add("hidden");
    modal.classList.remove("visible");
    backdrop.classList.remove("visible");
  }
}