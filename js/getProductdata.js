// добавление id в локальное хранилище 
document.addEventListener('click', function (event) {
 
    var link = event.target.closest('.product_link')

    if (link) {
        localStorage.setItem('id', link.dataset.id);
    }

} );
