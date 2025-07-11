import { calculateCartQuantity } from "../data/cart.js";
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;
  console.log(order);
  order.products.forEach((details) => {
    if (details.productId === productId) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  let percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  percentProgress = Math.min(Math.max(percentProgress, 0), 100); // Clamp between 0 and 100
  //clamping—It keeps the value of percentProgress between 0 and 100.
  //To protect the UI from Bad data,Clock mismatch,Accidental time zone shifts we are clamping it 0 ,since this situation should not happen (i.e today <= orderTime)
  //Both the date and the time are being compared ,making them down to millisecond

  const deliveredMessage =
    today < deliveryTime ? "Arriving on" : "Delivered on";
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveredMessage} ${dayjs(
    productDetails.estimatedDeliveryTime
  ).format("dddd MMMM D")}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${
            percentProgress < 50 ? "current status" : ""
          }">
            Preparing
          </div>
          <div class="progress-label ${
            percentProgress >= 50 && percentProgress < 100
              ? "current status"
              : ""
          }">
            Shipped
          </div>
          <div class="progress-label ${
            percentProgress >= 100 ? "current status" : ""
          }">
            Delivered
          </div>
        </div>

        <div class="custom-progress-container">
           <div class="custom-progress-bar" style="width: ${percentProgress}%;"></div>
        </div>

    `;

  calculateCartQuantity();
  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;

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
} //window.location.href tells the browser to redirect to the shopix page.
document.addEventListener("DOMContentLoaded", () => {
  loadPage();
});
