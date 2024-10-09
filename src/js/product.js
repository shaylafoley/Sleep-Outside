// import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");
// const product = {
//   Id: product.Id, // Get actual product id dynamically
//   Name: product.Name,
//   FinalPrice: product.FinalPrice,
//   Image: product.Image,
// };

// // Função para adicionar o produto ao carrinho
// function addProductToCart(product) {
//   // Obtém o carrinho atual do localStorage, ou um array vazio se não houver produtos ainda
//   let cart = getLocalStorage("so-cart") || [];

//   // Verifica se o produto já está no carrinho
//   const existingProduct = cart.find((item) => item.Id === product.Id);

//   if (existingProduct) {
//     // Se o produto já estiver no carrinho, incrementa a quantidade
//     existingProduct.quantity += 1;
//   } else {
//     // Se o produto ainda não estiver no carrinho, adiciona o novo produto
//     product.quantity = 1; // Inicializa a quantidade do produto no carrinho
//     cart.push(product);
//   }

//   // Atualiza o localStorage com o novo carrinho
//   setLocalStorage("so-cart", cart);
//   alert(`${product.Name} add to card`);
// }

// // M// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler() {

//   addProductToCart(product);
// });

import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Initialize dataSource for "tents" category
const dataSource = new ProductData("tents");

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

  // Update localStorage with the modifie d cart
  setLocalStorage("so-cart", cart);
  alert(`${product.Name} added to cart`);
}

// Event handler for adding products to cart
async function addToCartHandler(e) {
  // Get the product ID from the button's data-id attribute
  const productId = e.target.dataset.id;

  // Fetch the product dynamically based on the ID
  const product = await dataSource.findProductById(productId);
  if (product) {
    addProductToCart(product);
  } else {
    console.error("Product not found");
  }
}
// Add the product to cart

// Add event listener to "Add to Cart" button
// const addToCartButtons = document.querySelectorAll(".addToCart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
});
