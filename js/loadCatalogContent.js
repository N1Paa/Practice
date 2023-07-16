const ProductsList = document.querySelector('.catalog_content_wrapper'); 

const createCatalogProductCard = (product) => `
<a href="product.html" class="product_link" data-id="${product.id}">
<div class="catalog_card_product" data-category="${product.category}">
   <img src="${product.image}" alt="product" class="catalog_product_img" data-product="img" /> 
   <div class="catalog_product_info">
      <div class="catalog_product_title"> 
         <p>${product.title}</p>
      </div>
      <div class="catalog_product_price">
         <p class="catalog_coin_gray">${product.price}</p>
      </div>
   </div>
</div>
</a>
`

//добавление товара в каталог 
const fillProductsList = (products) => {
   ProductsList.innerHTML = "";

   if (products.length) {
      products.forEach((product) => ProductsList.innerHTML += createCatalogProductCard(product));
   }
}


//асинхронный вызов
(async () => {
await getProductsRequest();
fillProductsList(state.products);
})()
