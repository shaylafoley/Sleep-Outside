import { getLocalStorage } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];  // Handle null case by using an empty array
//   if (cartItems.length === 0) {
//     // If there are no items in the cart, show a message
//     document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
//   } else {
//     // Otherwise, render the cart items
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   }
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;
//   return newItem;
// }

// // Call the function to render the cart contents when the page loads
// renderCartContents();

export default class Cart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = this.getCartItems(); // Get cart items from local storage
  }

  // Initialize the cart rendering process
  init() {
    if (this.cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      this.render(this.cartItems);
    }
  }

  // Retrieve cart items from local storage
  getCartItems() {
    return JSON.parse(localStorage.getItem("so-cart")) || [];
  }

  // Render the cart items
  render(products) {
    this.listElement.innerHTML = ""; // Clear the existing content
    products.forEach((product) => {
      const productCard = this.createCartItemCard(product);
      this.listElement.appendChild(productCard);
    });

    // Optionally, you can calculate and display the total price
    const totalPrice = this.calculateTotalPrice(products);
    this.displayTotalPrice(totalPrice);
  }

  // Create a cart item card similar to the product listing card
  createCartItemCard(product) {
    const card = document.createElement("li");
    card.classList.add("cart-item");

    card.innerHTML = `
            <img src="${product.Image}" alt="${product.Name}" />
            <h3>${product.Name}</h3>
            <p>Price: $${product.FinalPrice.toFixed(2)}</p>
            <p>Quantity: ${product.quantity}</p>
            <button class="remove-item" data-id="${product.Id}">Remove</button>
        `;

    // Add event listener to the remove button
    card.querySelector(".remove-item").addEventListener("click", () => {
      this.removeItem(product.Id);
    });

    return card;
  }

  // Calculate the total price of the cart items
  calculateTotalPrice(products) {
    return products.reduce(
      (total, product) => total + product.FinalPrice * product.quantity,
      0,
    );
  }

  // Display the total price
  displayTotalPrice(totalPrice) {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
    this.listElement.appendChild(totalPriceElement);
  }

  // Remove item from the cart
  removeItem(productId) {
    this.cartItems = this.cartItems.filter((item) => item.Id !== productId);
    localStorage.setItem("so-cart", JSON.stringify(this.cartItems)); // Update local storage
    this.init(); // Re-render the cart
  }
}

// Usage in cart.js
const cartListElement = document.querySelector("#cart-list");
const cart = new Cart(cartListElement);
cart.init();
