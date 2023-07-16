// добавление id в локальное хранилище 
document.addEventListener('click', function (event) {
 
    var link = event.target.closest('.product_link')

    if (link) {
        localStorage.setItem('id', link.dataset.id);
    }

} );


const Url = 'https://fakestoreapi.com/products/' + localStorage.getItem('id');

const state = {
    products: [],
    product: [],
 }

function getProductsRequest() {
    return fetch('https://fakestoreapi.com/products', {
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
    })   
   .then(res => res.json())
   .then((products) => state.products = state.products.concat(products))
   }

function getProductRequest() {
    return fetch(Url, {
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
    })   
   .then(res => res.json())
   .then((product) => state.product = state.product.concat(product))
   }