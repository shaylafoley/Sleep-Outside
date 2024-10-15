import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

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

    // Initialize the checkout process
    const myCheckout = new CheckoutProcess("cartItems", "#checkoutOutput"); // Adjust parameters as necessary
    myCheckout.init(); // Call init to set up initial values

    // Add event listener to the checkout form
    const form = document.forms["checkout"]; // Ensure your form has the correct name attribute
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent the default form submission behavior

            const chk_status = form.checkValidity(); // Check validity
            form.reportValidity(); // Trigger validity messages

            if (chk_status) {
                myCheckout.checkout(); // Proceed if valid
            }
        });
    } else {
        console.error("Checkout form not found");
    }
});
