import { getData } from "./productData.mjs";
import {renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
  let discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
  console.log(discountAmount);
  let discountPrice = Math.round(discountAmount * 100)/100;
  
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    <p class="product-card__originalprice"><em>$${discountPrice} off!</em></p></a>
  </li>`;
}             

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await getData(category);

  const filteredTents = products.filter(product => product.Name.includes("Tent")).slice(0, 4);

  renderListWithTemplate(productCardTemplate, el, filteredTents);
}