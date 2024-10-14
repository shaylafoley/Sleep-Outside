import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Initialize dataSource for "tents" category
const dataSource = new ExternalServices("tents");

// Function to add product to cart
function addProductToCart(product) {
    // Get the current cart from localStorage or create an empty array if no cart exists
    let cart = getLocalStorage("so-cart") || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
        // If the product is already in the cart, increment its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is new to the cart, add it with an initial quantity of 1
        product.quantity = 1;
        cart.push(product);
    }

    // Update localStorage with the modified cart
    setLocalStorage("so-cart", cart);
    alert(`${product.Name} added to cart`);
}

// Event handler for adding products to cart
async function addToCartHandler(e) {
    // Prevent default action for the button click
    e.preventDefault();

    // Get the product ID from the button's data-id attribute
    const productId = e.target.dataset.id;

    try {
        // Fetch the product dynamically based on the ID
        const product = await dataSource.findProductById(productId);
        if (product) {
            addProductToCart(product);
        } else {
            console.error("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

// Function to initialize event listeners
function init() {
    // Load header and footer
    loadHeaderFooter();

    // Add event listener to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".addToCart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCartHandler);
    });
}

// Initialize the product page
init();
