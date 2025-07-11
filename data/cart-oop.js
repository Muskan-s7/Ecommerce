function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,//or let cartItems; ,since objects donot supoort ';' so using this 
    
        loadFromStorage() {//moved function into an object-method
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));//shorthand for loadFromStorage: function()-loadFromStorage()
           
           if(!this.cartItems){
               this.cartItems = [{
                   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",//'this' gives us outer object
                   quantity: 2,
                   deliveryOptionId: '1'
               }, {
                   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                   quantity: 1,
                   deliveryOptionId: '2'
               }];
           }
        }, 
    
    
        saveToStorage(){//shortCut for saveToStorage: function(){}
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));//saving to localStorage
        },
    
    
        addToCart(productId,quantity){
            let matchingItem;//undefined
          
              this.cartItems.forEach((cartItem) =>{
                  if(productId===cartItem.productId){//item contains both productId and quantity-cart
                      matchingItem = cartItem;
                  }
              });
          
              if(matchingItem){
                  matchingItem.quantity += quantity;
              } else{
                  this.cartItems.push({
                      productId: productId,
                      quantity: quantity,
                      deliveryOptionId: '1'
                  });
              }
        
              this.saveToStorage();
              
        },
    
    
        removeFromCart(productId){
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
        
            this.saveToStorage();
        },
    
    
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;//undefined
          
              this.cartItems.forEach((cartItem) =>{
                  if(productId===cartItem.productId){//item contains both productId and quantity-cart
                      matchingItem = cartItem;
                  }
              });
        
              if(!matchingItem){
                return;
              }
        
              matchingItem.deliveryOptionId = deliveryOptionId;
        
              this.saveToStorage();
        },
    
    
        calculateCartQuantity(){
            let cartQuantity = 0;
          
              this.cartItems.forEach((cartItem) => {
                  cartQuantity += cartItem.quantity;
              });
          
              document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
              
        },
    
    
        updateQuantity(productId,newQuantity){
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    cartItem.quantity = newQuantity;
                    this.saveToStorage();
                }
            });
        },
    
    
        updateCheckoutQuantity(){
            let newQuantity =0;
            
            this.cartItems.forEach((cartItem) => {
                newQuantity+=cartItem.quantity;
            });
            
            document.querySelector('.js-checkout-items').innerHTML = `${newQuantity} items`;
            
        },
    
    
        paymentItemsQuanitity(){
            let cartQuantity = 0;
            
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);










  


  