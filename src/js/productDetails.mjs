import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  const currentCart = getLocalStorage("so-cart") || [];

  const existingProduct = currentCart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    existingProduct.Quantity += 1;
  } else {
    product.Quantity = 1;
    currentCart.push(product);
  }

  setLocalStorage("so-cart", currentCart);
}

function renderProductDetails() {
  let discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
  console.log(discountAmount);
  let discountPrice = Math.round(discountAmount * 100)/100;
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productDiscountPrice").innerText = product.DiscountPrice;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;

}
