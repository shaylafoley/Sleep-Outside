import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const productData = new ExternalServices("tents");

async function loadProducts() {
  try {
    const products = await productData.getProducts();
    console.log(products); // Check if products are logged correctly

    const listElement = document.querySelector(".product-list"); // Ensure this selector matches your HTML structure

    const productListing = new ProductListing("Tents", productData, listElement);
    await productListing.init();
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Add DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  loadProducts(); // Call loadProducts after the DOM is ready
});
