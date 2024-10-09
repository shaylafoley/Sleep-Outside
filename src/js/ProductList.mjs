import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData(this.category); // Assuming getData() returns a JS object
      this.render(products);
    } catch (error) {
      console.error("Error fetching product data:", error);
      this.listElement.innerHTML =
        "<p class=\"error\">Failed to load products. Please try again later.</p>";
    }
  }

  render(products) {
    renderListWithTemplate(this.createProductCard, this.listElement, products, "afterbegin", true);
  }

  createProductCard(product) {
    return `
      <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}" aria-label="${product.Name}">
          <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
          <h3>${product.Name}</h3>
          <p>${product.DescriptionHtmlSimple}</p>
          <p>Price: $${product.ListPrice.toFixed(2)}</p>
        </a>
      </li>
    `;
  }
}