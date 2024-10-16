import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    
    return `<section class="product-detail"> 
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        let cartContents = getLocalStorage("so-cart") || []; // Fetch existing cart or initialize
        cartContents.push(this.product); // Add product to the cart
        setLocalStorage("so-cart", cartContents); // Save updated cart
        console.log(`${this.product.NameWithoutBrand} added to cart.`);

        // Show confirmation message
        this.showCartMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    showCartMessage(message) {
        // Create a message element
        const messageElement = document.createElement("div");
        messageElement.className = "cart-message"; // Assign a class for styling (you can add styles in CSS)
        messageElement.textContent = message;
        
        // Insert message into the main area or wherever you want it to appear
        const mainElement = document.querySelector("main");
        mainElement.insertAdjacentElement("afterbegin", messageElement);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
}
