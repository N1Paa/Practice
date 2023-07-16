const ProductPage = document.querySelector('.product_page_main');

const createProductPage = (product) => `
<div data-id="${product.id}">
 <div class="product_page_head">
  <h5>СУВЕНИРНАЯ ПРОДУКЦИЯ &laquoГАЗПРОМ НЕФТИ&raquo </h5>
  <h2 class="product_page_name">${product.title}</h2>
 </div>
 <div class="product_page_wrapper">
  <div class="product_page_img_wrapper">
   <img src="${product.image}" alt="" class="product_page_img"/>
  </div>
  <div class="product_page_info_wrapper">
   <div class="adaptive_description">
    <div class="product_page_purchase">
    <div class="product_page_counter">
     <div class="product_page_quantity">
      <label>Количество</label>
      <input type="text" id="counter_input" onkeypress='validate(event)' placeholder="1 шт"/>
     </div>
     <div class="product_page_add_product">
      <button class="btn add_btn">Выбрать</button>
     </div>
    </div>
    <div class="product_page_back">
        <a href="main.html"><button class="btn back_btn">Назад в бонус-бар</button></a>
    </div>
    </div>
    <div class="product_page_description">
        <h3>Описание товара</h3>
        <p>${product.description}</p>
    </div>
   </div>
   <div class="product_page_price_wrapper">
    <p>Стоимость</p>
    <div class="product_page_price">
      <p class="price catalog_coin_gray">${product.price}</p>
    </div>
   </div>
  </div>
 </div>
</div>
`

//добавление страницы товара
const fillProduct = (product) => {
    ProductPage.innerHTML = "";
    ProductPage.innerHTML += createProductPage(product);
}

//асинхронный вызов 
(async () => {
await getProductRequest();
fillProduct(state.product[0]);
})()
