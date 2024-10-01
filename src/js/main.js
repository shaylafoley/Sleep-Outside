import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list"); //Select the element of the list

const listing = new ProductListing(
  "tents",
  dataSource,
productListElement
);

productListing.init();