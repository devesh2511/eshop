document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});

// ... (rest of the scripts.js file)

function displayProducts(products) {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        const productDiv = document.createElement('div');
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

