
interface CartItem {
    image: string;
    name: string;
    price: number;
    quantity: number;
}

document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();
});

function displayCartItems(): void {
    const cartContainer: HTMLElement | null = document.getElementById('cart-items');
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') as string) || [];

    if (cartContainer) {
        cartContainer.innerHTML = "";

        cart.forEach((item: CartItem, index: number) => {
            const tr: HTMLTableRowElement = document.createElement('tr');
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

            if (cartContainer) {
                cartContainer.appendChild(tr);
            }
        });
    }
}

function removeFromCart(index: number): void {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function changeQuantity(index: number, change: number): void {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].quantity += change;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}



function proceedToPayment(): void {
    window.location.href = 'payment.html';
}