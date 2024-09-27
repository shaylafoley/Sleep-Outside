import ProductData from "./ProductData.mjs";
import { setLocalStorage, getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(selectedProduct) {
  let cartItems = setLocalStorage("so-cart") || [];

  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Add new product to cart
  cartItems.push(selectedProduct);

  // Save back to local storage
  setLocalStorage("so-cart", cartItems);
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
