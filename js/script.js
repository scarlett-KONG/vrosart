/**
 * VROSART.COM - Main JavaScript
 * Modern ES6+ implementation
 */

// ===================================
// MOBILE MENU
// ===================================
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.body = document.body;
        
        if (this.toggle && this.nav) {
            this.init();
        }
    }
    
    init() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on a link
        const navLinks = this.nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.nav.classList.toggle('active');
        this.toggle.classList.toggle('active');
        this.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMenu() {
        this.nav.classList.remove('active');
        this.toggle.classList.remove('active');
        this.body.style.overflow = '';
    }
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.site-header');
        if (this.header) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// ===================================
// CONTACT FORM HANDLER
// ===================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(data);
            
            // Show success message
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError('An error occurred. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || !data.surname || !data.email || !data.message) {
            this.showError('Please fill in all required fields.');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            this.showError('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    showSuccess() {
        const successMsg = document.querySelector('.form-success');
        if (successMsg) {
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }
    }
    
    showError(message) {
        alert(message); // Replace with better error handling
    }
    
    simulateAPICall(data) {
        return new Promise((resolve) => {
            console.log('Form data:', data);
            setTimeout(resolve, 1000);
        });
    }
}

// ===================================
// COMMISSION FORM HANDLER
// ===================================
class CommissionForm {
    constructor() {
        this.form = document.getElementById('commission-form');
        this.fileInput = document.getElementById('file-upload');
        this.fileBtn = document.querySelector('.file-upload-btn');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        if (this.fileInput && this.fileBtn) {
            this.fileBtn.addEventListener('click', () => this.fileInput.click());
            this.fileInput.addEventListener('change', () => this.handleFileChange());
        }
    }
    
    handleFileChange() {
        const files = this.fileInput.files;
        if (files.length > 0) {
            const fileNames = Array.from(files).map(f => f.name).join(', ');
            this.fileBtn.textContent = fileNames;
        } else {
            this.fileBtn.textContent = 'Add file';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(data);
            
            alert('Your commission request has been submitted successfully!');
            this.form.reset();
            this.fileBtn.textContent = 'Add file';
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.fullname || !data.email || !data.address || !data.size || !data.description) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    simulateAPICall(data) {
        return new Promise((resolve) => {
            console.log('Commission data:', data);
            setTimeout(resolve, 1000);
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// FADE IN ON SCROLL
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-on-scroll');
        if (this.elements.length > 0) {
            this.init();
        }
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ===================================
// LAZY LOAD IMAGES
// ===================================
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        if (this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        const options = {
            threshold: 0,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, options);
        
        this.images.forEach(img => observer.observe(img));
    }
}

// ===================================
// PRODUCT HOVER EFFECT
// ===================================
class ProductHoverEffect {
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');
        if (this.productCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.productCards.forEach(card => {
            const primaryImg = card.querySelector('.product-image.primary');
            const secondaryImg = card.querySelector('.product-image.secondary');
            
            if (!primaryImg || !secondaryImg) return;
            
            // Preload secondary image
            const img = new Image();
            img.src = secondaryImg.src;
        });
    }
}

// ===================================
// HERO TEXT TYPE ANIMATION
// ===================================
class HeroTextAnimator {
    constructor() {
        this.heroText = document.querySelector('.hero-text');
        if (this.heroText) {
            this.init();
        }
    }

    init() {
        const elements = this.heroText.querySelectorAll('h1, p');
        elements.forEach(el => this.wrapText(el));

        // Trigger animation on next frame so transitions apply
        requestAnimationFrame(() => {
            this.heroText.classList.add('is-animated');
        });
    }

    wrapText(element) {
        const text = element.textContent.trim();
        element.textContent = '';
        const fragment = document.createDocumentFragment();

        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('hero-char');
            span.style.setProperty('--char-index', index);
            fragment.appendChild(span);
        });

        element.appendChild(fragment);
    }
}

// ===================================
// PRODUCT DETAIL PAGE
// ===================================
class ProductDetailPage {
    constructor() {
        // Only run on product detail pages
        if (!document.querySelector('.product-detail-page')) return;
        this.init();
    }

    init() {
        this.initGallery();
        this.initAccordion();
        this.initCart();
    }

    // ── 1. Image Gallery ──
    initGallery() {
        const mainImage = document.getElementById('mainImage');
        const thumbs    = document.querySelectorAll('#thumbsContainer img');
        if (!mainImage || !thumbs.length) return;

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                mainImage.src = this.dataset.full;
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ── 2. Accordion ──
    initAccordion() {
        document.querySelectorAll('[data-accordion]').forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => item.classList.toggle('open'));
            }
        });
    }

    // ── 3. Cart ──
    initCart() {
        // Cart state (resets on page reload; swap for localStorage for persistence)
        let cart = [];

        const cartSidebar  = document.getElementById('cartSidebar');
        const cartOverlay  = document.getElementById('cartOverlay');
        const cartClose    = document.getElementById('cartClose');
        const cartItemsEl  = document.getElementById('cartItems');
        const cartTitle    = document.getElementById('cartTitle');
        const cartTotal    = document.getElementById('cartTotal');
        const cartBadge    = document.getElementById('cartBadge');
        const addToCartBtn = document.getElementById('addToCartBtn');
        const cartIconBtn  = document.getElementById('cartIconBtn');
        const checkoutBtn  = document.getElementById('checkoutBtn');

        if (!cartSidebar) return;

        // Open / close helpers
        const openCart = () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        };
        const closeCart = () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('visible');
            document.body.style.overflow = '';
        };

        cartClose.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
        if (cartIconBtn) cartIconBtn.addEventListener('click', openCart);

        // Render cart contents
        const renderCart = () => {
            let totalQty = 0, totalPrice = 0;
            cartItemsEl.innerHTML = '';

            if (cart.length === 0) {
                cartItemsEl.innerHTML = '<p style="color:#999;font-size:.85rem;">Your cart is empty.</p>';
            } else {
                cart.forEach((item, idx) => {
                    totalQty   += item.qty;
                    totalPrice += item.price * item.qty;

                    const el = document.createElement('div');
                    el.className = 'cart-item';
                    el.innerHTML = `
                        <img src="${item.img}" alt="${item.name}">
                        <div>
                            <p class="cart-item-name">${item.name}</p>
                            <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                            <input type="number" class="cart-item-qty" value="${item.qty}" min="1" data-idx="${idx}">
                        </div>
                        <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove item">✕</button>
                    `;
                    cartItemsEl.appendChild(el);
                });

                cartItemsEl.querySelectorAll('.cart-item-qty').forEach(input => {
                    input.addEventListener('change', function () {
                        const i = parseInt(this.dataset.idx);
                        cart[i].qty = Math.max(1, parseInt(this.value) || 1);
                        renderCart();
                    });
                });

                cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', function () {
                        cart.splice(parseInt(this.dataset.idx), 1);
                        renderCart();
                    });
                });
            }

            cartTitle.textContent = `Cart (${totalQty} item${totalQty !== 1 ? 's' : ''})`;
            cartTotal.textContent = `€${totalPrice.toFixed(2)}`;
            cartBadge.textContent = totalQty;
            cartBadge.classList.toggle('visible', totalQty > 0);
        };

        // Add to cart
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const qty    = parseInt(document.getElementById('qtyInput').value) || 1;
                const name   = addToCartBtn.dataset.name   || 'Artwork';
                const price  = parseFloat(addToCartBtn.dataset.price) || 0;
                const imgSrc = document.getElementById('mainImage').src;

                const existing = cart.find(i => i.name === name);
                if (existing) {
                    existing.qty += qty;
                } else {
                    cart.push({ name, price, qty, img: imgSrc });
                }

                renderCart();

                addToCartBtn.textContent = '✓ Added!';
                addToCartBtn.classList.add('added');
                setTimeout(() => {
                    addToCartBtn.textContent = 'Add to Cart';
                    addToCartBtn.classList.remove('added');
                }, 1500);

                openCart();
            });
        }

        // Checkout — sends cart to /api/checkout (Stripe)
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', async () => {
                if (cart.length === 0) { alert('Your cart is empty!'); return; }

                checkoutBtn.textContent = 'Processing...';
                checkoutBtn.disabled = true;

                try {
                    const currentLang = document.documentElement.lang || 'en';

                    const response = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cartItems: cart, lang: currentLang }),
                    });

                    if (!response.ok) throw new Error('Server error: ' + response.status);

                    const data = await response.json();
                    window.location.href = data.url;
                } catch (error) {
                    console.error('Checkout error:', error);
                    alert('Something went wrong. Please try again.');
                    checkoutBtn.textContent = 'Checkout';
                    checkoutBtn.disabled = false;
                }
            });
        }

        renderCart();
    }
}

// ===================================
// INITIALIZE APP
// ===================================
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize all components
        new MobileMenu();
        new HeaderScroll();
        new ContactForm();
        new CommissionForm();
        new SmoothScroll();
        new ScrollAnimations();
        new LazyLoadImages();
        new ProductHoverEffect();
        new HeroTextAnimator();
        new ProductDetailPage();
        
        console.log('VRosArt website initialized');
    }
}

// Start the app
new App();