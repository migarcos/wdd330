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

  function addComment() {
    const commentInput = document.getElementById("commentText");
    const commentText = commentInput.value;
    const commentAuthor = document.getElementById("commentAuthor").value;
    if (commentText) {
      const commentsData = getComments();
      commentsData.push({ author: commentAuthor, text: commentText });
      setComments(commentsData);
  
      commentInput.value = "";
      document.getElementById("commentAuthor").value = "";
      displayComments();
    }
  }
  
  function displayComments() {
    const commentsList = document.querySelector(".list");
    commentsList.innerHTML = "";
  
    const commentsData = getComments();
  
    commentsData.forEach((comment) => {
      const commentHTML = `
              <div class="user">
                  <div class="user-meta">
                      <div class="name">${comment.author}</div>
                      <div class="day">Just now</div>
                  </div>
                  <div class="comment-post">${comment.text}</div>
              </div>
          `;
  
      commentsList.innerHTML += commentHTML;
    });
  }
  
  function getComments() {
    const comments = localStorage.getItem("comments");
  
    return comments ? JSON.parse(comments) : [];
  }
  
  function setComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    displayComments();
  
    const addCommentButton = document.querySelector(".comment-submit");
    if (addCommentButton) {
      addCommentButton.addEventListener("click", addComment);
    }
  });