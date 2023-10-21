import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <span data-id="${item.Id}" class="remove-item">X</span>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__details">
      <div class="cost">$${item.FinalPrice.toFixed(2)}</div>
      <div class="quantity">Qty: ${item.Quantity}</div>
    </div>
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
    addPrice();
    countItems();
  }

  function increaseQuantity(index) {
    const cartItems = getLocalStorage("so-cart");
    const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];
    if (index >= 0 && index < cartItemsArray.length) {
      cartItemsArray[index].Quantity++;
      saveCart(cartItemsArray);
      renderCartContents();
      addPrice();
      countItems();
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
      addPrice();
      countItems();
    }
  }

  function saveCart(cartItems) {
    // Save the updated cart items to local storage
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    addPrice();
    countItems();
  }

  function removeItemFromCart(productId) {
    const cartItems = getLocalStorage("so-cart");
    const updatedCart = cartItems.filter((item) => item.Id !== productId);
    saveCart(updatedCart);
    renderCartContents();
    addPrice();
    countItems();
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const productId = event.target.getAttribute("data-id");
      removeItemFromCart(productId);
    }
  });

  function addPrice() {
    const cartItems = getLocalStorage("so-cart");
    const total = cartItems.reduce(
      (acc, item) => acc + item.FinalPrice * item.Quantity,
      0
    );
    document.querySelector(".cart-price").textContent = total.toFixed(2);
  }

  function countItems() {
    const cartItems2 = getLocalStorage("so-cart");
    // Calculate the total item count
    const itemCount = cartItems2.reduce((acc, item) => acc + item.Quantity, 0);
    document.querySelector(".item-count").textContent = itemCount;
  }

  function addToCart(item) {
    const cartItems = getLocalStorage("so-cart");
    const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];
    // Check if the item is already in the cart
    const existingItem = cartItemsArray.find(
      (cartItem) => cartItem.Id === item.Id
    );
    if (existingItem) {
      // Item already exists in the cart, increment its quantity
      existingItem.Quantity++;
    } else {
      // Item is not in the cart, add it
      item.Quantity = 1;
      cartItemsArray.push(item);
    }
    saveCart(cartItemsArray);
    renderCartContents();
    addPrice();
    countItems();
  }

  renderCartContents();
  addPrice();
  countItems();
}
