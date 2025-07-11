import {addToCart,cart,loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: addTocart', () => {

    beforeEach(() => {//beforeEach hook
        spyOn(localStorage, 'setItem').and.callFake(() => {//order of the code matters,here as we are mocking setItem before calling addToCart,so no effect on localStorage
        
        });//we are overriding actual localStorage.setItem method with this fake one
    });


    it('adds an existing product to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {//mock,which is taking object and method name(as a string)
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(3);
        
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{//to check whether the setItem received the correct values of cart or not
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3,
            deliveryOptionId: '1'
        }]));
    });



    it('adds a new product to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {//mock,which is taking object and method name(as a string)
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{//checking whether this product get stored in localStorage or not
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',//read toHaveBeenSavedWith for better understanding
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });
});



describe('test suite: RemoveFromCart',() => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem').and.callFake(() => {

        });
    });

    it('removes a productId that is in the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        expect(cart.length).toEqual(1);//before removing the product from the cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);//after removing the product from the cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));//after removing from cart empty [] is stored
    });


    it('removes a productId that is not in the cart', () => {//In this case the function does nothing

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        expect(cart.length).toEqual(0);
        expect(cart[0]).toEqual(undefined);
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));//We can even replace JSON.stringify([]) with '[]'
    });
});



describe('test suite: updateDeliveryOption', () => {

    beforeAll(() => {
        loadProducts((done) => {
            done();//waits until done is called---by using done we can control when to go for the next step
        });
    });


    beforeEach(() => {
        spyOn(localStorage, 'setItem').and.callFake(() => {

        });

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        
        loadFromStorage();

        document.querySelector(`.js-test-container`).innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-checkout-items"></div>
        <div class="js-payment-summary"></div>
        <div class="js-delivery-option-${cart[0].productId}-3"></div>
        `;

        
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector(`.js-test-container`).innerHTML = '';
    });


    it('updates the delivery option of a product in the cart', () => {

        expect(cart[0].deliveryOptionId).toEqual('1');
        document.querySelector(`.js-delivery-option-${cart[0].productId}-3`).click();
        expect(cart[0].deliveryOptionId).toEqual('3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '3'//since we have clicked delivery-option 3
        }]));
    });


    it('updates the delivery option of a product which is not in the cart', () => {
        updateDeliveryOption('lambo','1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
