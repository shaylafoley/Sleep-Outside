// src/js/product-listing.js
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get the category from URL parameters
const category = getParams("category");

// Create an instance of ExternalServices with the API URL
const dataSource = new ExternalServices("http://server-nodejs.cit.byui.edu:3000/products"); // Adjust to your product endpoint

// Get the element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const myList = new ProductList(category, dataSource, listElement);

// Initialize the product list to show products
myList.init().catch(error => {
    console.error("Error initializing product list:", error);
    listElement.innerHTML = "<p class='error'>Failed to load products. Please try again later.</p>";
});
