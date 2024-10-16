import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    console.log("Items in cart:", this.list); // Log the cart items
    if(this.list.length === 0) {
      console.log("Cart is empty");
      console.log(this.outputSelector);
      document.querySelector(this.outputSelector).innerHTML = "<p>Your cart is empty.</p>";
    }
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );

    // Update number of items in cart
    itemNumElement.innerText = this.list.length;

    // Calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    // Ensure correct formatting to two decimal places
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);

    // Call to calculate order total
    this.calculateOrdertotal();
  }

  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }

  async checkout() {
    const formElement = document.forms["checkout"]; 
    // Check form validity
    if (!formElement.checkValidity()) {
      formElement.reportValidity(); // Show validation errors
      return; // Stop if the form is not valid
    }

    const json = formDataToJSON(formElement);
    // Add totals and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);

    try {
      // Submit the order
      const res = await services.checkout(json);

      if (!res.ok) { // Check for a successful response
        throw new Error("Network response was not ok");
      }

      const responseData = await res.json(); // Assuming your API returns JSON
      console.log("Order submitted successfully:", responseData);

      // Clear the cart
      localStorage.removeItem("cartItems");

      // Redirect to the success page
      window.location.href = "/checkout/success.html";
    } catch (err) {
      console.error("Checkout error:", err);
      // Display a custom error message
      alert("An error occurred during checkout. Please try again."); // Replace alertMessage with a simple alert for testing
    }
  }
}