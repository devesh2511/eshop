
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

// function paymentGateway() {
//     let options = {
//         "key": "rzp_test_49G310i0KhpquN",
//         "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "Acme Corp", //your business name
//         "description": "Test Transaction",
//         "image": "https://example.com/your_logo",
//         "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
//         "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//             "name": "Gaurav Kumar", //your customer's name
//             "email": "gaurav.kumar@example.com",
//             "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#3399cc"
//         }
//     };
//     let rzp1 = new Razorpay(options);
    
//     document.getElementById('rzp-button1').onclick = function(e){
//         rzp1.open();
//         e.preventDefault();
//     }
// }

// function proceedToPayment(): void {
//     window.location.href = 'payment.html';
// }