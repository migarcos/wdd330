import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <span data-id="${item.Id}" class="remove-item">X</span>
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

  // Add event listeners for X icons (remove items)
  const removeIcons = productList.querySelectorAll(".remove-item");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const productId = icon.getAttribute("data-id");
      removeItemFromCart(productId);
    });
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

function removeItemFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter((item) => item.Id !== productId);
  saveCart(updatedCart);
  renderCartContents();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const productId = event.target.getAttribute("data-id");
    removeItemFromCart(productId);
  }
});

renderCartContents();
