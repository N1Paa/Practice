const ProductsList = document.querySelector('.catalog_content_wrapper'); 
const filter = document.querySelector('.filter');

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

const createCategories = (categories) => `
<option>${categories.category}</option>
`

const fillFilterCategories = (categories) => { 
   filter.innerHTML = `<option>all</option>`;

   if (categories.length) {
      categories.forEach((category) => { 
         if (category.category != filter.lastElementChild.textContent) {
            filter.innerHTML += createCategories(category);
         } 
   });
   }
}

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
fillFilterCategories(state.products);
})()
