// Modal and buttons
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-btn');
const goToCartButton = document.getElementById('go-to-cart');
const continueShoppingButton = document.getElementById('continue-shopping');

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

        // Show the modal with a custom message
        const modalMessage = `${productName} has been added to your cart. Do you want to go to the cart?`;
        document.getElementById('modal-message').textContent = modalMessage;
        modal.style.display = 'block';

        // When the user clicks on "Go to Cart"
        goToCartButton.onclick = function() {
            window.location.href = 'single-product.html'; // Redirect to cart page
        };

        // When the user clicks on "Continue Shopping"
        continueShoppingButton.onclick = function() {
            modal.style.display = 'none'; // Close the modal and continue shopping
        };
    });
});

// When the user clicks on the close button, hide the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside the modal, hide the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
