import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js';//runs everything inside cart-oop.js file without importing anything
//import '../data/car.js';
//import '../data/backend-practice.js';


async function loadPage() {
    try{
        //throw 'error1';
        /*
        await loadProductsFetch();//awaits for this line to finish-it loads the products from backend
        await loadCartFetch();
        */
       await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
       ]);
    } catch (error) {
        console.log('Unexpected error.Please try again later');
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),//returned promise will be used here,since fetch can return a promise directly
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
//using promises
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');//resolve lets us control when to for the next step
    });

}).then((value1) => {
    console.log(value1)
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/



//using call back
/*
loadProducts(() => {//anonymous function
    loadCart(() => {
      renderOrderSummary();
      renderPaymentSummary();
    });
    
});
*/

