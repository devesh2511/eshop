productData = JSON.parse(window.localStorage.getItem('productsData'));
// console.log("Pdt data in search js = "+productData);

// $(document).on("change", ".price-sorting", function () {

function filter(){

    filterOptions = [
        "default", "l2h", "h2l",
        "ratingl2h","ratingh2l",
        "atoz", "ztoa"
    ];
    sortingIdx = document.getElementById("pxp-sort-results").selectedIndex;
    sortingMethod = filterOptions[sortingIdx];
    console.log("Sorting method: "+sortingMethod);
    
    if (sortingMethod === 'l2h') {
        sortProductsPriceAscending();
    }
    else if (sortingMethod === 'h2l') {
        sortProductsPriceDescending();
    }
    else if (sortingMethod === 'ratingl2h') {
        sortProductsRatingAscending();
    }
    else if (sortingMethod === 'ratingh2l') {
        sortProductsRatingDescending();
    }
    else if (sortingMethod === 'atoz') {
        sortProductsAlphaAscending();
    }
    else if (sortingMethod === 'ztoa') {
        sortProductsAlphaDescending();
    }
    
}

function displayProducts(products) {
    console.log('products to display = ', products);
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = "";

    console.log('productsContainer', productsContainer, products);

    console.log('productsContainer', productsContainer.children.length, products.length);

    products.forEach(product => {


        let productDiv = document.createElement('div');

        productDiv.className = 'prod';

        productDiv.innerHTML = `
            <div class="card">
                <a class="a-prod" href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        
                        
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Rating:</strong> ${product.rating.rate}⭐</p>
                        <p class="price"><strong>Price:</strong> ₹${product.price}</p>

                        <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">Add to Cart</button>

                    </div>
                </a>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });

    console.log('productsContainer', productsContainer.children.length);
}

function sortProductsPriceAscending() {
    console.log("inside low to high");
    var products = productData;  
    products.sort(function (a, b) {
        return a.price - b.price;
    });
    displayProducts(products);

}

function sortProductsPriceDescending() {
    console.log("inside high to low");
    var products = productData;  
    products.sort(function (a, b) {
        return b.price - a.price;
    });

    displayProducts(products);

}

function sortProductsRatingDescending() {
    console.log("inside high to low");
    var products = productData;  
    products.sort(function (a, b) {
        return b.rating.rate - a.rating.rate;
    });

    displayProducts(products);

}

function sortProductsRatingAscending() {
    console.log("inside high to low");
    var products = productData;  
    products.sort(function (b, a) {
        return b.rating.rate - a.rating.rate;
    });

    displayProducts(products);

}

function sortProductsAlphaDescending() {
    console.log("inside high to low");
    var products = productData;  
    products.sort(function (b, a) {
        console.log("sorting atoz");
        return a.title.localeCompare(b.title)
    });

    displayProducts(products);

}

function sortProductsAlphaAscending() {
    console.log("inside high to low");
    var products = productData;  
    products.sort(function (a, b) {
        console.log("sorting ztoa");
        return a.title.localeCompare(b.title);
    });

    displayProducts(products);

}
