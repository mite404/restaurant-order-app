// Handling all rendering of the view layer

export function renderMenu(menuArray) {
  return (
      menuArray
      .map(
          (menuItem) => `
      <div class="menu-item-row">
        <div class="column left">
          <p class="emoji">${menuItem.emoji}</p>
        </div>
        <div class="column center">
          <h3 class="menu h3"><em>${menuItem.name}</em></h3>
          <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
          <p class="price"><em>$${menuItem.price}</em></p>
        </div>
        <div class="column right">
          <button id="addbtn" data-addbtn="${menuItem.id}">+</button>
        </div>
      </div>
    `,
      )
      .join("<hr>") + `<hr>`
  );
}

export function updateCartDisplay(cart) {
  let cartHTML = "";

  if (cart.length > 0) {
    cart.forEach((item) => {
      cartHTML += `
        <div class="cart-item-row">
          <div class="column left">
            <p id="emoji">${item.emoji}</p>
          </div>
          <div class="column center">
            <h3 class="order h3"><em>${item.name}</em></h3>
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