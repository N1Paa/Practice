const ResetBtn = document.querySelector('.btn_cart_remove_all');
const cartItem = document.querySelector('.cart_card_product');
const cartWrapper = document.querySelector('.cart_card_product_wrapper');


// Корзина пустая/полная
function toggleCartStatus() {
    if (cartWrapper.children.length > 0) {
        document.querySelector('.cart_empty').classList.add('disabled');
    } else {
        document.querySelector('.cart_empty').classList.remove('disabled');
    }
};


// Расчет суммы заказа
function calcCartPrice() {
    const cartItems = document.querySelectorAll('.cart_card_product');
    let totalPrice = 0;
    cartItems.forEach(function (item) {
 
     const quantityEl = parseFloat(item.querySelector('[data-quantity]').innerText);
     const priceEl = parseFloat(item.querySelector('[data-price]').innerText);
 
     const currentPrice = quantityEl * priceEl;
     totalPrice = (totalPrice += currentPrice).toFixed(2);
    });
    document.querySelector('[data-summ]').textContent = totalPrice;
 };


// Ограничение на ввод кол-ва товаров
function validate(evt) {
    var theEvent = evt || window.event;  
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /^\d+$/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault(); 

    } //разрешает вводить только цифры
    
    document.getElementById('counter_input').oninput = function () { 
        if (this.value.length > 2) this.value = this.value.substr(0, 2);
    }  //обрезает все после 2 символа
};


//добавление товара в корзину 
document.addEventListener('click', function (event) {
    let AddBtn = event.target.classList.contains('add_btn');
    if (AddBtn) {
        const product = event.target.closest('[data-id]');

        let val = document.getElementById('counter_input').value;


        localStorage.setItem('id', product.dataset.id);
        localStorage.setItem('title', product.querySelector('.product_page_name').innerText);
        localStorage.setItem('imgSrc', product.querySelector('.product_page_img').getAttribute('src'));
        localStorage.setItem('price', product.querySelector('.price').innerText);
        if(val !== ""){
            localStorage.setItem('quantity', document.getElementById('counter_input').value);
        } else {
            localStorage.setItem('quantity', '1');
        };
            //проверка на наличие товара в корзине 
            const itemInCart = cartWrapper.querySelector(`[data-id="${localStorage.getItem('id')}"]`);
            if (itemInCart) {  
    
                const counterEl = itemInCart.querySelector('[data-quantity]');
                    counterEl.innerText = parseInt(counterEl.innerText) + parseInt(localStorage.getItem('quantity')); 

            } else { //добавление нового товара в корзину 
                const cartItem = `
                    <div class="cart_card_product">
                     <div class="card_product_info" data-id="${localStorage.getItem('id')}">
                      <p class="cart_title">${localStorage.getItem('title')}</p>
                      <div class="card_product_details">
                       <p data-quantity="">${localStorage.getItem('quantity')}</p>
                       <p>шт</p>
                       <span style="font-size: 10px">&#x2715</span>
                        <div class="card_product_price">
                         <p data-price="product_currency" class="cart_coin_gray">${localStorage.getItem('price')}</p>
                          <div class="bucket disabled">
                           <img src="img/bucket.png" alt="bucket" class="bucket_img"/>
                          </div>
                        </div>   
                      </div> 
                     </div>
                     <div>
                      <img src="${localStorage.getItem('imgSrc')}" alt="product_name" class="card_product_img"/>
                     </div>
                    </div>
                    `;
            
                    cartWrapper.insertAdjacentHTML('beforeend', cartItem);
            };
            
        toggleCartStatus(); 
        calcCartPrice();
    };
} );


//очистка всей корзины
ResetBtn.addEventListener('click', function () {
    cartWrapper.innerHTML = "";
    toggleCartStatus(); 
    calcCartPrice();
} );


//удаление товара 
document.addEventListener('mouseout', function (event) {

    if ( event.target.closest('.cart_card_product')) {
        let cartItem = event.target.closest('.cart_card_product');
        let Bucket = cartItem.querySelector('.bucket');
        Bucket.classList.add("disabled");
    }
});
document.addEventListener('mouseover', function (event) {

    if (event.target.closest('.cart_card_product')) {
        let cartItem = event.target.closest('.cart_card_product');
        let Bucket = cartItem.querySelector('.bucket');
        Bucket.classList.remove("disabled");

        Bucket.addEventListener('click', function (){
            cartItem.parentNode.removeChild(cartItem);
            toggleCartStatus();
            calcCartPrice();
        });
    }
});


