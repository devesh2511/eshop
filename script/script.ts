
interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then((data: Product[]) => {
            displayProducts(data);
        })
        .catch((error: Error) => {
            console.error("Error fetching products:", error);
        });
});

function displayProducts(products: Product[]) {
    const productsContainer = document.getElementById('products');

    products.forEach((product: Product) => {
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

        if (productsContainer) {
            productsContainer.appendChild(productDiv);
        }
    });
}

function addToCart(productID: number, productName: string, productPrice: number, productCategory: string, productDescription: string, productImage: string) {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];
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