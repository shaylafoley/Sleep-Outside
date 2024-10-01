import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Função para adicionar o produto ao carrinho
function addProductToCart(product) {
  // Obtém o carrinho atual do localStorage, ou um array vazio se não houver produtos ainda
  let cart = getLocalStorage("so-cart") || [];

  // Verifica se o produto já está no carrinho
  const existingProduct = cart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    // Se o produto já estiver no carrinho, incrementa a quantidade
    existingProduct.quantity += 1;
  } else {
    // Se o produto ainda não estiver no carrinho, adiciona o novo produto
    product.quantity = 1; // Inicializa a quantidade do produto no carrinho
    cart.push(product);
  }

  // Atualiza o localStorage com o novo carrinho
  setLocalStorage("so-cart", cart);
  alert(`${product.Name} add to card`);
}

// M// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
