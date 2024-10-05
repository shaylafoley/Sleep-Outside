import { loadHeaderFooter } from "./utils.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list"); // Ensure this selector matches your HTML structure

// Call the static method to load and render products
ProductListing.loadAndRenderProducts(listElement);
