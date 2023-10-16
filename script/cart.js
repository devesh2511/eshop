document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

// function grandTotal() {
//     console.warn("Entered");
//     let getPrice = document.getElementById('total');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     cart.forEach((item) => {
//         console.warn(item)
//         let parcel = document.getElementById('price-' + (item.id).toString())

//         getPrice.innerHTML = '$' + (parseFloat(getPrice).toFixed(2) + parseFloat(parcel).toFixed(2)).toString()
// });
// }



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
            <td  id="totalcart" style="width:15%;">${item.price * item.quantity}</td>
            <td style="width:50%;">
                <button onclick="addQuantity(${index}); grandTotal(${sums}); reload()" class="btn-cart">Add</button>
                <button onclick="subQuantity(${index}); grandTotal(${sums}); reload()" class="btn-cart">Remove</button>
                <button onclick="removeFromCart(${index}); grandTotal(${sums}); reload()" class="btn-cart">Delete</button>
            </td>

        `;
        cartContainer.appendChild(tr);
        
    });
}



function grandTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let sums = 0;

    cart.forEach((item) => {
        sums += parseFloat(item.quantity) * parseFloat(item.price)
    })
    console.log(sums)
    return sums;

}

let sums = grandTotal();
document.getElementById('totalcart').innerHTML = "Total: ₹" + sums;


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
    if(cart[index].quantity >= 1){
        cart[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    }
    else{
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }
    


function paymentGateway() {
    let sums = grandTotal();
    let options = {
        "key": "rzp_test_UHsR0lIAjZhxPI",
        "amount": sums*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "E SHOP", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            alert("Payment successful! Thank You for Shopping with us!!");
            localStorage.removeItem('cart');
            window.location.href = 'index.html';

        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    let rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    document.getElementById('rzp-button1').onclick = function (e) {
        rzp1.open();
        e.preventDefault();
    }
}

function reload() {
    window.location.href = 'cart.html';
}

