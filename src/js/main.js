import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();


const productData = new ProductData("tents");

async function loadProducts() {
  try {
    const products = await productData.getProducts();
    console.log(products); // Check if products are logged correctly

    const listElement = document.querySelector(".product-list"); // Ensure this selector matches your HTML structure

    const productListing = new ProductListing(
      "Tents",
      productData,
      listElement
    );
    await productListing.init();
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// loadProducts();

