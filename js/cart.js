const ResetBtn = document.querySelector('.btn_cart_remove_all');
const cartItem = document.querySelector('.cart_card_product');
const cartWrapper = document.querySelector('.cart_card_product_wrapper');
const cartItems = document.querySelectorAll('.cart_card_product');

const createcart = (item) => `
<div class="cart_card_product">
 <div class="card_product_info" data-id="${item.id}">
  <p class="cart_title">${item.title}</p>
  <div class="card_product_details">
   <p data-quantity="">${item.quantity}</p>
   <p>шт</p>
   <span style="font-size: 10px">&#x2715</span>
    <div class="card_product_price">
     <p data-price="product_currency" class="cart_coin_gray">${item.price}</p>
      <div class="bucket disabled">
       <img src="img/bucket.png" alt="bucket" class="bucket_img"/>
      </div>
    </div>   
  </div> 
 </div>
 <div>
  <img src="${item.image}" alt="product_name" class="card_product_img"/>
 </div>
</div>
`;

const objInCart = {id: "", price: "", quantity: "0", title: "", image: "", summ: "0"};

let statecart = [];

window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
    statecart = JSON.parse(localStorage.getItem('cart'));
    };
    console.log(statecart);
    cartWrapper.innerHTML = "";
    if (statecart.length) {
        statecart.forEach((item) => cartWrapper.innerHTML += createcart(item))
        toggleCartStatus()
    } 
    const cartItems = document.querySelectorAll('.cart_card_product');
    console.log(cartItems);
    calcCartPrice();   
  });

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
    let totalPrice = 0;
    statecart.forEach((item) => {
     const quantityEl = parseFloat(item.quantity);
     const priceEl = parseFloat(item.price);
     const currentPrice = quantityEl * priceEl;
     totalPrice = (totalPrice += currentPrice);
    });
    document.querySelector('[data-summ]').textContent = totalPrice.toFixed(2);
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

    document.getElementById('counter_input').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/^0/, ''); // запрещает вводить 0 и 0 перед числом
      });
};


//добавление товара в корзину 
document.addEventListener('click', function (event) {
    let AddBtn = event.target.classList.contains('add_btn');
    if (AddBtn) {
        let val = document.getElementById('counter_input').value;
        objInCart.id = state.product[0].id;
        objInCart.price = state.product[0].price;
        objInCart.title = state.product[0].title;
        objInCart.image = state.product[0].image;

        if(val !== ""){
            val = val;
        } else {
            val =  1;
        };
            //проверка на наличие товара в корзине 
            const itemInCart = cartWrapper.querySelector(`[data-id="${objInCart.id}"]`);

            if (itemInCart) {  

                const counterEl = itemInCart.querySelector('[data-quantity]');
                objInCart.quantity = parseInt(statecart.find(item => item.id === objInCart.id).quantity) + parseInt(val);
                statecart.find(item => item.id === objInCart.id).quantity = objInCart.quantity;
                counterEl.innerText = parseInt(objInCart.quantity); 

            } else { //добавление нового товара в корзину 
                statecart.push(objInCart);
                objInCart.quantity = parseInt(val);
                const cartItem = `
                    <div class="cart_card_product">
                     <div class="card_product_info" data-id="${objInCart.id}">
                      <p class="cart_title">${objInCart.title}</p>
                      <div class="card_product_details">
                       <p data-quantity="">${objInCart.quantity}</p>
                       <p>шт</p>
                       <span style="font-size: 10px">&#x2715</span>
                        <div class="card_product_price">
                         <p data-price="product_currency" class="cart_coin_gray">${objInCart.price}</p>
                          <div class="bucket disabled">
                           <img src="img/bucket.png" alt="bucket" class="bucket_img"/>
                          </div>
                        </div>   
                      </div> 
                     </div>
                     <div>
                      <img src="${objInCart.image}" alt="product_name" class="card_product_img"/>
                     </div>
                    </div>
                    `;
            
                    cartWrapper.insertAdjacentHTML('beforeend', cartItem);
            }; 
        toggleCartStatus(); 
        objInCart.summ = (parseFloat(objInCart.quantity) * parseFloat(objInCart.price)).toFixed(2);
        calcCartPrice() 
        localStorage.setItem('cart', JSON.stringify(statecart)); 
    };
} );



//очистка всей корзины
ResetBtn.addEventListener('click', function () {
    cartWrapper.innerHTML = "";
    statecart = [];
    localStorage.setItem('cart', JSON.stringify(statecart)); 
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
            let dataID = cartItem.querySelector('[data-id]').dataset.id;
            statecart = statecart.filter(id => id.id != dataID);
            localStorage.setItem('cart', JSON.stringify(statecart)); 
            cartItem.parentNode.removeChild(cartItem);
            toggleCartStatus();
            calcCartPrice();
        });
    }
});


