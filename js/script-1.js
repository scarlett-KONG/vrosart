// Product Page JavaScript - Clean version without Wix dependencies

document.addEventListener('DOMContentLoaded', function() {
    
    // =======================
    // Image Gallery Functionality
    // =======================
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
            
            // Add fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
    
    
    // =======================
    // Quantity Selector
    // =======================
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const maxQuantity = parseInt(quantityInput.getAttribute('max'));
    
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < maxQuantity) {
            quantityInput.value = currentValue + 1;
        } else {
            showNotification('Maximum quantity available: ' + maxQuantity, 'warning');
        }
    });
    
    // Prevent manual input of invalid quantities
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > maxQuantity) {
            this.value = maxQuantity;
            showNotification('Maximum quantity available: ' + maxQuantity, 'warning');
        }
    });
    
    
    // =======================
    // Add to Cart Functionality
    // =======================
    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartCount = document.getElementById('cartCount');
    let cart = [];
    
    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Update cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Add to cart
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        const productId = 'b7dbf53a-7c7b-476c-a12e-304f8c85aa43'; // From the original data
        const productName = 'L\'Enigma del Sacro Cuore';
        const price = 250;
        const imageUrl = mainImage.src;
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity <= maxQuantity) {
                existingItem.quantity = newQuantity;
                showNotification(`Updated quantity to ${newQuantity}`, 'success');
            } else {
                showNotification('Cannot add more items. Maximum quantity reached.', 'warning');
                return;
            }
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: price,
                quantity: quantity,
                image: imageUrl
            });
            showNotification('Added to cart successfully!', 'success');
        }
        
        saveCart();
        updateCartCount();
        
        // Add animation to cart button
        const cartBtn = document.getElementById('cartBtn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    });
    
    
    // =======================
    // Accordion Functionality
    // =======================
    const detailTitles = document.querySelectorAll('.detail-title');
    
    detailTitles.forEach(title => {
        title.addEventListener('click', function() {
            const section = this.parentElement;
            const isActive = section.classList.contains('active');
            
            // Close all sections
            document.querySelectorAll('.detail-section').forEach(s => {
                s.classList.remove('active');
            });
            
            // Open clicked section if it wasn't active
            if (!isActive) {
                section.classList.add('active');
            }
        });
    });
    
    
    // =======================
    // Scroll to Top Button
    // =======================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // =======================
    // Language Selector (Basic)
    // =======================
    const languageBtn = document.getElementById('languageBtn');
    let currentLanguage = 'EN';
    
    languageBtn.addEventListener('click', function() {
        // Toggle between EN and FR (example)
        currentLanguage = currentLanguage === 'EN' ? 'FR' : 'EN';
        this.textContent = currentLanguage;
        showNotification(`Language switched to ${currentLanguage}`, 'info');
    });
    
    
    // =======================
    // Cart Button Click
    // =======================
    const cartBtn = document.getElementById('cartBtn');
    
    cartBtn.addEventListener('click', function() {
        showCartModal();
    });
    
    
    // =======================
    // Notification System
    // =======================
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Set color based on type
        if (type === 'warning') {
            notification.style.backgroundColor = '#ff9800';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#f44336';
        } else if (type === 'info') {
            notification.style.backgroundColor = '#2196f3';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('hiding');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    
    // =======================
    // Cart Modal
    // =======================
    function showCartModal() {
        // Check if modal already exists
        let modal = document.getElementById('cartModal');
        
        if (!modal) {
            modal = createCartModal();
        }
        
        updateCartModal();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function createCartModal() {
        const modal = document.createElement('div');
        modal.id = 'cartModal';
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Shopping Cart</h2>
                    <button class="close-modal" id="closeCartModal">&times;</button>
                </div>
                <div class="modal-body" id="cartItems">
                    <!-- Cart items will be inserted here -->
                </div>
                <div class="modal-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cartTotal">€0.00</span>
                    </div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        addCartModalStyles();
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', closeCartModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeCartModal);
        modal.querySelector('.checkout-btn').addEventListener('click', function() {
            showNotification('Checkout functionality not implemented in this demo', 'info');
        });
        
        return modal;
    }
    
    function updateCartModal() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalElement.textContent = '€0.00';
            return;
        }
        
        let total = 0;
        let html = '';
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <span class="cart-item-total">€${itemTotal.toFixed(2)}</span>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        cartTotalElement.textContent = '€' + total.toFixed(2);
        
        // Add remove functionality
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
                updateCartCount();
                updateCartModal();
                showNotification('Item removed from cart', 'info');
            });
        });
    }
    
    function closeCartModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    function addCartModalStyles() {
        if (document.getElementById('cartModalStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'cartModalStyles';
        style.textContent = `
            .cart-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .modal-content {
                position: relative;
                background-color: white;
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 24px;
            }
            
            .close-modal {
                font-size: 32px;
                color: #666;
                cursor: pointer;
                background: none;
                border: none;
                line-height: 1;
                padding: 0;
                width: 32px;
                height: 32px;
            }
            
            .close-modal:hover {
                color: #000;
            }
            
            .modal-body {
                padding: 20px;
                overflow-y: auto;
                flex: 1;
            }
            
            .empty-cart {
                text-align: center;
                color: #999;
                padding: 40px 0;
            }
            
            .cart-item {
                display: flex;
                gap: 15px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-bottom: 10px;
            }
            
            .cart-item-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 4px;
            }
            
            .cart-item-details {
                flex: 1;
            }
            
            .cart-item-details h4 {
                margin: 0 0 5px 0;
                font-size: 16px;
            }
            
            .cart-item-details p {
                margin: 0;
                color: #666;
                font-size: 14px;
            }
            
            .cart-item-actions {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 10px;
            }
            
            .cart-item-total {
                font-weight: 600;
                font-size: 16px;
            }
            
            .remove-item {
                background-color: #f44336;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                border: none;
            }
            
            .remove-item:hover {
                background-color: #d32f2f;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #ddd;
            }
            
            .cart-total {
                display: flex;
                justify-content: space-between;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 15px;
            }
            
            .checkout-btn {
                width: 100%;
                padding: 15px;
                background-color: #000;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .checkout-btn:hover {
                background-color: #333;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    
    // =======================
    // Initialize
    // =======================
    loadCart();
    
    
    // =======================
    // Header Scroll Effect
    // =======================
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    header.style.transition = 'transform 0.3s ease';
    
    
    // =======================
    // Performance: Scroll Padding
    // =======================
    const headerOffsetHeight = header.offsetHeight;
    document.documentElement.style.scrollPaddingTop = `${headerOffsetHeight}px`;
    
});