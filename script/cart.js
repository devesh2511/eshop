document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.boxShadow = "inset 0px 0.5px 0px 0px #0000001a";
        tr.innerHTML = `
            <td style="width:10rem; display: flex; align-items: center; justify-content: center; flex-wrap: wrap;"><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td style="width:35%;">${item.name}</td>
            <td style="width:15%;">₹${item.price}</td>
            <td width:5%;>${item.quantity}</td>
            <td style="width:15%;">₹${item.price * item.quantity}</td>
            <td style="width:30%;">
                <button onclick="addQuantity(${index})" class="btn-cart">Add</button>
                <button onclick="subQuantity(${index})" class="btn-cart">Remove</button>
                <button onclick="removeFromCart(${index})" class="btn-cart">Delete</button>
            </td>

        `;

        cartContainer.appendChild(tr);
    });
}



function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function addQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function subQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}


function proceedToPayment() {
    window.location.href = 'payment.html';
}

