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
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registrationModal');
    const closeButton = document.querySelector('.close-button');
    const registerButton = document.getElementById('registerButton');

    // Show modal if user is visiting for the first time
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        modal.style.display = 'block';
    }

    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Redirect to registration page on button click
    registerButton.addEventListener('click', () => {
        window.location.href = 'registration.html';
    });
});

// loadProducts();

