import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { findProductById } from "./productData.mjs";

const productId = getParam("product");
productDetails(productId);
console.log(findProductById(productId));

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
    existingProduct.Quantity += 0;
  } else {
    product.Quantity = 0;

    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
}
async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
