// Import products data
import { products } from './data.js';

let currentFilter = 'all';

// Load Shop Products
function loadShopProducts(filter = 'all') {
    const container = document.getElementById('shop-products');
    if (!container) return;

    currentFilter = filter;
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">Ürün bulunamadı.</p>';
        return;
    }

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-wrapper">
            <div class="product-card" onclick="window.location.href='/product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/350x450?text=${encodeURIComponent(product.name)}'">
                <button class="view-product-btn" onclick="event.stopPropagation(); window.location.href='/product.html?id=${product.id}'">
                    Özellikler
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${parseFloat(product.price)}₺</p>
                <button class="add-to-cart-btn-fixed" onclick="event.stopPropagation(); addToCart(${product.id}); showNotification('Ürün sepete eklendi!')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span>Sepete Ekle</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Setup Filter Buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Load products with selected filter
            const category = btn.dataset.category;
            loadShopProducts(category);
        });
    });
}

// Newsletter Form Handler
function setupNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            alert(`Abone olduğunuz için teşekkürler: ${email}`);
            form.reset();
        });
    });
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a category parameter in URL
    const categoryParam = getUrlParameter('category');
    const initialFilter = categoryParam === 'agendas' ? 'agendas' : 'all';
    
    loadShopProducts(initialFilter);
    setupFilters();
    setupNewsletter();
    
    // Update active filter button
    if (categoryParam) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryParam) {
                btn.classList.add('active');
            }
        });
    }
});

