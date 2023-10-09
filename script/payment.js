function processPayment() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Here, we'll just do a basic check. In real-world scenarios, you'd use a secure payment gateway.
    if (cardNumber && expiryDate && cvv) {
        alert("Payment successful! Thank You for Shopping with us!!");
        // Clear the cart after payment
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Redirect to the main page or a confirmation page
    } else {
        alert("Payment details invalid");
    }
}
