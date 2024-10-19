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

    // Calculate and display the total price
    const totalPrice = this.calculateTotalPrice(products);
    this.displayTotalPrice(totalPrice);
  }

  // Create a cart item card similar to the product listing card
  createCartItemCard(product) {
    const card = document.createElement("li");
    card.classList.add("cart-item");

    // Determine if the minus button should be displayed
    const minusButton = product.quantity > 1 ? `
        <button class="quantity-decrease" data-id="${product.Id}">-</button>
    ` : '';

    card.innerHTML = `
            <img src="${product.Image}" alt="${product.Name}" />
            <h3>${product.Name}</h3>
            <p>Price: $${product.FinalPrice.toFixed(2)}</p>
            <p>Quantity: 
                ${minusButton}
                <span class="quantity">${product.quantity}</span>
                <button class="quantity-increase" data-id="${product.Id}">+</button>
            </p>
            <button class="remove-item" data-id="${product.Id}">Remove</button>
        `;

    // Add event listeners to quantity buttons
    if (product.quantity > 1) {
      card.querySelector(".quantity-decrease").addEventListener("click", () => {
        this.changeQuantity(product.Id, -1); // Decrease quantity
      });
    }
    card.querySelector(".quantity-increase").addEventListener("click", () => {
      this.changeQuantity(product.Id, 1); // Increase quantity
    });

    // Add event listener to the remove button
    card.querySelector(".remove-item").addEventListener("click", () => {
      this.removeItem(product.Id);
    });

    return card;
  }

  // Change the quantity of an item in the cart
  changeQuantity(productId, change) {
    const existingItem = this.cartItems.find(item => item.Id === productId);

    if (existingItem) {
      existingItem.quantity += change;

      // If the quantity is 0 or less, remove the item
      if (existingItem.quantity < 1) {
        this.removeItem(productId);
      } else {
        localStorage.setItem("so-cart", JSON.stringify(this.cartItems)); // Update local storage
        this.init(); // Re-render the cart
      }
    }
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
