// Function to update the cart display
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    // Clear existing cart items
    cartItems.innerHTML = '';

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty!</li>';
        totalPrice.textContent = 'Total: $0.00';
        return;
    }

    // Calculate total price and display cart items
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
                        <button class="remove-btn" data-index="${index}">Remove</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });

    // Update total price
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item from the cart array
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Handle Remove Button click
document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Handle Share Order button
document.getElementById('share-order-btn').addEventListener('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if there are any items in the cart
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Get the user's name, email, and shipping address
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    // Validate user input
    if (!name || !email || !address) {
        alert("Please provide your name, email, and shipping address.");
        return;
    }

    // Construct the order date and time
    const orderDate = new Date();
    const orderDateTime = `${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString()}`;

    // Construct the WhatsApp message with user details, product names, codes, and prices
    let message = `Please confirm your order:\n\n`;
    message += `Name: ${name}\n`;
    message += `Email: ${email}\n`;
    message += `Address: ${address}\n`;
    message += `Order Date: ${orderDateTime}\n\n`;

    cart.forEach((item, index) => {
        message += `Product ${index + 1}: ${item.name} (Code: ${item.code}) - $${item.price.toFixed(2)}\n`;
    });
    message += `\nTotal: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}\n\n`;
    message += `Please confirm this order and let me know if everything looks good!`;

    // Replace 'your-whatsapp-number' with your actual phone number, including country code
    const phoneNumber = '+917518240401';  // Example: 1234567890 (no plus sign, country code)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp with the message
    window.location.href = whatsappURL;

    // Clear the cart from localStorage after the order is placed
    localStorage.removeItem('cart');

    // Clear the cart display
    updateCart();
});

// Update cart on page load
window.onload = updateCart;
