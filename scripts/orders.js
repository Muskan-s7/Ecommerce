import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = "";

  console.log(orders);
  //here the orders data is retrived from the localStorage
  // but not from the backend even it is also stored in the backend(for future retrival)

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format("MMMM D");
    ordersHTML += `
      <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderTimeString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${productsListHTML(order)}
            </div>
      </div>
      `;
  });

  function productsListHTML(order) {
    let productsListHTML = "";

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      const Arrival = dayjs(productDetails.estimatedDeliveryTime).format(
        "MMMM D"
      );

      productsListHTML += `
        <div class="product-image-container">
                <img src="${product.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${Arrival}
                </div>
                <div class="product-quantity">
                  Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again" 
                data-product-id="${product.id}">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
        `;
    });

    return productsListHTML;
  }

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;

  document.querySelectorAll(".js-buy-again").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      console.log(productId);
      addToCart(productId, 1);

      button.innerHTML = "Added";
      calculateCartQuantity();

      setTimeout(() => {
        button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });

  calculateCartQuantity();

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
loadPage();
