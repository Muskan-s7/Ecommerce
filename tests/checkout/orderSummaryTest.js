import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage,cart} from '../../data/cart.js';
import { loadProducts, loadProductsFetch} from "../../data/products.js";
//example for integration test 
describe('test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {//Hook
        spyOn(localStorage,'setItem');//since removeFromCart function saves to local storage,so we are mocking it

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-checkout-items"></div>
        <div class="js-payment-summary"></div>
        `;//we have created a div inside body of test.html

        spyOn(localStorage, 'getItem').and.callFake(() => {//mock,which is taking object and method name(as a string)
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });


    afterEach(() => {//afterEach Hook
        document.querySelector('.js-test-container').innerHTML = '';
    });


    it('displays the cart', () => {//testing how the page looks
        
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
           document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText
        ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText
        ).toContain('$10.90');

    });


    it('removes a product',() => {//testing how the page behaves with remove as example

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(//testing whether 1 out of 2 cart item removed or not
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);//we expect this to be null since we have removed it

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);//we expect this(producyId2) to be display on page since we deleted the productId1

        //testing whether the cart updates by itself or not
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

    });


    it('updates the delivery option', () => {
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(
            document.querySelector(`.js-delivery-option-input-${productId1}-3`)
        ).checked;
        
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(
            document.querySelector(`.js-shipping-price`).innerText
        ).toContain('$14.98');
        expect(
            document.querySelector(`.js-order-total`).innerText
        ).toContain('$ 63.50');
    });
});