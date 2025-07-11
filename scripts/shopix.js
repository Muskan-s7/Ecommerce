import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid); //creating function,since after reaching to send() the next is executing(let productsHTML..)

function renderProductsGrid() {
  let productsHTML = ""; //Accumulator pattern-each time we loop through an array we are adding to the result(here-productHTML)

  //Gets Search Query from  the URL
  const url = new URL(window.location.href); //to create a URL object for the current page
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  //if a search exists in the URL parameter
  //filter the products that match the search
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML =
      productsHTML +
      `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML() /*polymorpism*/}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button 
            button-primary js-add-to-cart" data-product-id="${
              product.id /*attaching product-id with the button*/
            }">
              Add to Cart
            </button>
          </div>
     `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  calculateCartQuantity();

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId; //productId attached with the button
      //selects quantity from select options
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
      //shows added when clicking add-to-cart
      const added = document.querySelector(`.js-added-to-cart-${productId}`);
      added.classList.add("is-added-to-cart");

      addToCart(productId, quantity);

      calculateCartQuantity();

      //removes added after 1sec
      setTimeout(() => {
        added.classList.remove("is-added-to-cart");
      }, 1000);
    });
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `shopix.html?search=${search}`; //As we r calling renderProductsGrid with loadProducts(runs renderProductsGrid when page loads)
    //page loads when search changes
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchTerm = document.querySelector(".js-search-bar").value;
        window.location.href = `shopix.html?search=${searchTerm}`;
      }
    });
}
