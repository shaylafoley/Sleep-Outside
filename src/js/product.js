import ProductData from "./ProductData.mjs";
import { setLocalStorage, getParams, getLocalStorage } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

function addProductToCart(selectedProduct) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Add new product to cart
  cartItems.push(selectedProduct);

  // Save back to local storage
  setLocalStorage("so-cart", cartItems);

  renderCart();
}

function removeProductFromCart(idToRemove) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter((item) => item.id !== idToRemove);

  // Save updated cart back to local storage
  setLocalStorage("so-cart", updatedCart);

  // Re-render cart after removing
  renderCart();
}

function renderCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartContainer = document.getElementById(".product-list");

  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <span data-id="${item.id}" class="remove-item">X</span>
    `;
    cartContainer.appendChild(cartItemElement);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const eventId = e.target.getAttribute("data-id");
      removeProductFromCart(eventId);
    });
  });
}

//function addProductToCart(product) {
//  setLocalStorage("so-cart", product);
//}
// add to cart button event handler
async function addToCartHandler(e) {
  const selectedProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(selectedProduct);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

renderCart();
