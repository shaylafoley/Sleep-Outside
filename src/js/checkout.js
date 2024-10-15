import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load the header and footer
loadHeaderFooter();

// Create an instance of CheckoutProcess
const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

// Add event listener to calculate the order total when the zip code input loses focus
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// Add event listener for the Place Order button
const checkoutForm = document.querySelector("#checkout-form");

// Use the form's submit event for better handling
checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  if (checkoutForm.checkValidity()) { // Check validity
    try {
      await myCheckout.checkout(); // Proceed if valid
      // Optionally, redirect to a success page or display a success message
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Optionally, display an error message to the user
      alert("There was an error placing your order. Please try again.");
    }
  } else {
    checkoutForm.reportValidity(); // Trigger validity messages if invalid
  }
});
