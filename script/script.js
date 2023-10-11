let postsData = [];
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");



document.addEventListener("DOMContentLoaded", function () {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            postsData = data;
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});

// ... (rest of the scripts.js file)

function displayProducts(products) {


    console.log('products to display = ',products);


    
    const productsContainer = document.getElementById('products');

    // const productsCatalogue = document.getElementsByClassName('catalgue');

    console.log('productsContainer',productsContainer,products);

    console.log('productsContainer',productsContainer.children.length,products.length);
    
    products.forEach(product => {


        let productDiv = document.createElement('div');

        productDiv.className = 'prod';

        productDiv.innerHTML = `
            <div class="card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        
                        
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> ₹${product.price}</p>

                        <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">Add to Cart</button>

                    </div>
                </a>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });

    console.log('productsContainer',productsContainer.children.length);
}


// ... (rest of the scripts.js file)


function addToCart(productID, productName, productPrice, productCategory, productDescription, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === productID);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({
            id: productID,
            name: productName,
            price: productPrice,
            category: productCategory,
            description: productDescription,
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart.`);
}



const handleSearchPosts = (query) => {

    console.log('query = ', query);

    const searchQuery = query.trim().toLowerCase();

    if (searchQuery.length <= 1) {
        resetPosts()
        return
    }

    console.log('products = ', postsData);

    let searchResults = [];

    for (let i = 0; i < postsData.length; i++) {

        let eachPost = postsData[i];

        let Posttitle = eachPost.title;

        let Postdesc = eachPost.description;

        let Postcategory = eachPost.category;

        if (Posttitle.includes(searchQuery)) {
            searchResults.push(eachPost);
            console.log('Title = ', eachPost);
        }
        // else if (Postdesc.includes(searchQuery)) {
        //     searchResults.push(eachPost);
        //     console.log('desc = ', eachPost);
        // }
        else if (Postcategory.includes(searchQuery)) {
            console.log('category = ', eachPost);
            searchResults.push(eachPost);
        }
    }

    console.log('search results = ', searchResults);

    // let searchResults = [postsData].filter(
    //   (post) =>

    //   console.log('post = ',post)
    // post.categories.some((post.category) => category.toLowerCase().includes(searchQuery)) ||
    // post.title.toLowerCase().includes(searchQuery)
    // );

    if (searchResults.length == 0) {
        searchDisplay.innerHTML = "No results found"
    } else if (searchResults.length == 1) {
        searchDisplay.innerHTML = `1 result found for your query: ${query}`
    } else {
        searchDisplay.innerHTML = `${searchResults.length} results found for your query: ${query}`
    }

    // postsContainer.innerHTML = "";
    // searchResults.map((post) => createPost(post));

    displayProducts(searchResults);


};

const resetPosts = () => {
    searchDisplay.innerHTML = ""
    postsContainer.innerHTML = "";
    searchResults.map((post) => displayProducts(post));
};

const search = document.getElementById("search");

let debounceTimer;
const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
    "input",
    (event) => {
        const query = event.target.value;
        debounce(() => handleSearchPosts(query), 500);
    },
    false
);



