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
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.forms[0]; // Get the form
  const chk_status = myForm.checkValidity(); // Check validity
  myForm.reportValidity(); // Trigger validity messages

  if (chk_status) {
    myCheckout.checkout(); // Proceed if valid
  }
});
