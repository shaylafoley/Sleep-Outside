import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get the category parameter from the URL
const category = getParams("category");

// Create an instance of the ProductData class
const dataSource = new ProductData();

// Get the element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class, passing the necessary data
const myList = new ProductList(category, dataSource, listElement);

// Initialize the product list
document.addEventListener("DOMContentLoaded", () => {
    myList.init();
});