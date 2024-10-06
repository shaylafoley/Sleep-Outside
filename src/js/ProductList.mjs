export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.render(list);
    } catch (error) {
      console.error("Error fetching product data:", error);
      this.listElement.innerHTML =
        "<p class=\"error\">Failed to load products. Please try again later.</p>";
    }
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
