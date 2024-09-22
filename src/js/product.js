import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
function addProductToCart(product) {
  let cartItems = setLocalStorage("so-cart") || [];

  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Add new product to cart
  cartItems.push(product);

  // Save back to local storage
  setLocalStorage("so-cart", cartItems);
}

//function addProductToCart(product) {
//  setLocalStorage("so-cart", product);
//}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
