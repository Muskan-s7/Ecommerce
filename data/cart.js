export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); //saving to localStorage
}

export function addToCart(productId, quantity) {
  let matchingItem; //undefined

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      //item contains both productId and quantity-cart
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1", //by default '1'(FREE) for all the products
    });
  }

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function paymentItemsQuanitity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
      saveToStorage();
    }
  });
}

export function updateCheckoutQuantity() {
  let newQuantity = 0;

  cart.forEach((cartItem) => {
    newQuantity += cartItem.quantity;
  });

  document.querySelector(
    ".js-checkout-items"
  ).innerHTML = `${newQuantity} items`;
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem; //undefined

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      //item contains both productId and quantity-cart
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

/*
  export function loadCart(fun) {
    const xhr = new XMLHttpRequest();//this will generate a new request object
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      
      fun();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');//set ups the request
    xhr.send();
  }
*/

export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();
  console.log(text);
  return text;
}

export function resetCart() {
  cart = [];
  saveToStorage();
}
