import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import ExternalServices from './ExternalServices.mjs'; // Import ExternalServices
import ProductDetails from './ProductDetails.mjs'; // Import ProductDetails

document.addEventListener("DOMContentLoaded", async () => {
    const productId = new URLSearchParams(window.location.search).get("product"); // Get product ID from URL

    // Log the productId to see what is retrieved from the URL
    console.log("Product ID from URL:", productId);

    // Check if productId is found
    if (!productId) {
        console.error("Error: No product ID found in the URL.");
        // Optionally, redirect to a different page or display a message to the user
        // window.location.href = '/error.html'; // Uncomment this line to redirect to an error page
        return; // Stop further execution
    }

    const dataSource = new ExternalServices(); // Initialize data source

    const productDetails = new ProductDetails(productId, dataSource); // Create instance of ProductDetails
    await productDetails.init(); // Fetch and render product details
});
