// Import products data
import { products } from './data.js';

// Load Featured Products on Home Page
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // Önce 4 ajandayı al (ID'ler: 1, 2, 3, 4)
    const agendaIds = [1, 2, 3, 4];
    const agendas = agendaIds.map(id => products.find(p => p.id === id)).filter(Boolean);
    
    // Sonra süsleme 1, 2, 7 ve 4 numaralı ürünleri al (ID'ler: 101, 102, 107, 104)
    const charmIds = [101, 102, 107, 104];
    const charms = charmIds.map(id => products.find(p => p.id === id)).filter(Boolean);
    
    // Birleştir: önce ajandalar, sonra süslemeler
    const featuredProducts = [...agendas, ...charms];
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-wrapper">
            <div class="product-card" onclick="window.location.href='/product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/350x450?text=${encodeURIComponent(product.name)}'">
                <button class="view-product-btn" onclick="event.stopPropagation(); window.location.href='/product.html?id=${product.id}'">
                    Özellikler
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
            </div>
        </div>
    `).join('');
}

// Buy Product Function - Will redirect to iyzico payment link
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // TODO: Replace with actual iyzico iyzilink URL
    // For now, show alert
    alert(`Ürün: ${product.name}\nFiyat: ${product.price}₺\n\nÖdeme sistemi yakında aktif olacak!`);
    
    // Example: window.location.href = 'https://pay.iyzico.com/your-payment-link';
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    setupNewsletter();
});

// Export products data for other pages
window.productsData = products;
window.buyProduct = buyProduct;

