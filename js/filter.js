filter.oninput = function () {
    ProductsList.innerHTML = "";

    if (state.products.length) {
        state.products.forEach(item => {
            if (item.category === this.value) {
                ProductsList.innerHTML += createCatalogProductCard(item);
            }
        }
        );
    };
    if (this.value === 'all') {
        state.products.forEach((item) => ProductsList.innerHTML += createCatalogProductCard(item));
    };
};


