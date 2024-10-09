export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

//   async init() {
//     try {
//       const list = await this.dataSource.getData(this.category);
//       this.render(list);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//       this.listElement.innerHTML =
//         "<p class=\"error\">Failed to load products. Please try again later.</p>";
//     }
//   }
async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.products = list; // Store fetched products
      this.render(this.products); // Render products initially

      // Add event listener to the sort dropdown
      const sortSelect = document.getElementById('sort-select');
      sortSelect.addEventListener('change', (event) => this.sortProducts(event.target.value));
    } catch (error) {
      console.error('Error fetching product data:', error);
      this.listElement.innerHTML =
        '<p class="error">Failed to load products. Please try again later.</p>';
    }
  }

  // Sort products based on the selected option
  sortProducts(sortBy) {
    let sortedProducts = [...this.products]; // Create a copy of the products array

    if (sortBy === 'name') {
      sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === 'price') {
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

    card.innerHTML = `
            <a href="/product_pages/index.html?product=${product.Id}" aria-label="${product.Name}">
                <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
                <h3>${product.Name}</h3>
                <p>${product.DescriptionHtmlSimple}</p>
                <p>Price: $${product.ListPrice.toFixed(2)}</p>
            </a>
        `;

    return card;
  }
}
