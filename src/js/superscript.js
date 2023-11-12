import { getLocalStorage } from "./utils.mjs";

function superscript() {
  let cartItems = getLocalStorage("so-cart");

  // Calculate the total item count
  let totalItems = cartItems.reduce((count, item) => count + item.Quantity, 0);
  let totsItem = totalItems;
  let supscript = document.querySelector(".cart-items-qty");
  supscript.textContent = totsItem;
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(superscript, 500);
});
