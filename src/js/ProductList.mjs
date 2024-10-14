import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.products = list; // Store fetched products

      // Check if listElement exists
      if (this.listElement) {
        this.render(this.products); // Render products initially

        // Add event listener to the sort dropdown
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (event) => this.sortProducts(event.target.value));
      } else {
        console.error("List element not found.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      // Ensure listElement is defined before using it
      if (this.listElement) {
        this.listElement.innerHTML =
          '<p class="error">Failed to load products. Please try again later.</p>';
      }
    }
  }
  
  // Sort products based on the selected option
  sortProducts(sortBy) {
    let sortedProducts = [...this.products]; // Create a copy of the products array

    if (sortBy === "name") {
      sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "price") {
      sortedProducts.sort((a, b) => a.ListPrice - b.ListPrice);
    }

    // Re-render products after sorting
    this.render(sortedProducts);
  }

  render(products) {
    this.listElement.innerHTML = ""; // Clear existing content
    products.forEach((product) => {
      const productCard = this.createProductCard(product);
      this.listElement.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const card = document.createElement("li");
    card.classList.add("product-card");
    card.innerHTML = productCardTemplate(product); // Use the template function
    return card;
  }
}
