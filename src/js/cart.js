import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: <span class="quantity">${
      item.Quantity
    }</span></p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)} per item</p>
    <p class="cart-card__total-price">$${(
      item.FinalPrice * item.Quantity
    ).toFixed(2)} total</p>
    <button class="decrease-quantity">-</button>
    <button class="increase-quantity">+</button>
  </li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];

  const htmlItems = cartItemsArray.map((item) => cartItemTemplate(item));

  const productList = document.querySelector(".product-list");
  productList.innerHTML = htmlItems.join("");

  // Add event listeners for increase and decrease buttons
  const increaseButtons = productList.querySelectorAll(".increase-quantity");
  const decreaseButtons = productList.querySelectorAll(".decrease-quantity");

  increaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => increaseQuantity(index));
  });

  decreaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => decreaseQuantity(index));
  });
}

function increaseQuantity(index) {
  const cartItems = getLocalStorage("so-cart");
  const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];

  if (index >= 0 && index < cartItemsArray.length) {
    cartItemsArray[index].Quantity++;
    saveCart(cartItemsArray);
    renderCartContents();
  }
}

function decreaseQuantity(index) {
  const cartItems = getLocalStorage("so-cart");
  const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];

  if (index >= 0 && index < cartItemsArray.length) {
    if (cartItemsArray[index].Quantity > 1) {
      cartItemsArray[index].Quantity--;
      saveCart(cartItemsArray);
    } else {
      // Remove the item from the cart if the quantity is less than 1
      cartItemsArray.splice(index, 1);
      saveCart(cartItemsArray);
    }
    renderCartContents();
  }
}

function saveCart(cartItems) {
  // Save the updated cart items to local storage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

renderCartContents();