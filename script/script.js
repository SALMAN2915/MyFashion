// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Function to add item to cart
function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show modal after adding item to cart
    showAddToCartModal();
}

// Function to show the "Item Added to Cart" modal
function showAddToCartModal() {
    const modal = document.getElementById('addToCartModal');
    modal.style.display = 'block';

    // Event listener for 'Go to Cart' button
    document.getElementById('goToCartBtn').onclick = function() {
        window.location.href = 'single-product.html'; // Navigate to cart page
    };

    // Event listener for 'Shop More' button
    document.getElementById('shopMoreBtn').onclick = function() {
        modal.style.display = 'none'; // Close the modal and continue shopping
    };
}

// Clear cart on page load (for index page only)
if (window.location.pathname.includes('index.html')) {
    localStorage.setItem('cart', JSON.stringify([])); // Empty cart on index page load
}

// Add event listeners to 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price); // Call addToCart function
    });
});

// Update cart count on page load
window.onload = updateCartCount;
// Handle Add to Cart button clicks
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.product;
        const productPrice = parseFloat(this.dataset.price);

        // Get the current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new product to the cart
        cart.push({ name: productName, price: productPrice });

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show a message with two options: Go to Cart or Continue Shopping
        const userResponse = window.confirm(`${productName} has been added to your cart. Do you want to go to the cart? \n\nClick "OK" to go to the cart or "Cancel" to continue shopping.`);

        // If the user clicks OK (Go to Cart), redirect to single-product.html
        if (userResponse) {
            window.location.href = 'single-product.html'; // Redirect to cart page
        }
        // Otherwise, stay on the current page and allow the user to continue shopping
    });
});
