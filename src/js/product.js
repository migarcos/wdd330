import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { findProductById } from "./externalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);

if (!getLocalStorage("so-cart")) {
  setLocalStorage("so-cart", []);
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const existingProduct = cart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    existingProduct.Quantity += 1;
  } else {
    product.Quantity = 1;

    cart.push(product);
  }

  setLocalStorage("so-cart", cart);  
}

async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

let cartButton = document.querySelector(".product-detail__add");
let cartIcon = document.querySelector(".cart-icon");

function cartanimation() {
  cartIcon.classList.add("animation");
  setTimeout(() => {
    cartIcon.classList.remove("animation");
  }, 3000);
}
cartButton.addEventListener("click", cartanimation);

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);