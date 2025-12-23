// Cart System using LocalStorage

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('zaicollection_cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('zaicollection_cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId) {
    const cart = getCart();
    const product = window.productsData?.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification('Ürün sepete eklendi! 🛒');
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
        displayCart();
    }
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = 'flex';
    });
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        displayCart();
    }
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">Sepetiniz boş</p>';
        cartTotal.textContent = '0₺';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=${encodeURIComponent(item.name)}'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}₺</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total + '₺';
}

// Checkout function
async function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    
    // İyzico payment config'i import et
    const { iyzicoCategoryLinks, defaultPaymentLink } = await import('./payment-config.js');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Sepet için özel link varsa onu kullan, yoksa genel linki kullan
    const paymentLink = iyzicoCategoryLinks['cart'] || defaultPaymentLink;
    
    // Eğer link henüz ayarlanmamışsa uyarı göster
    if (paymentLink.includes('YOUR_LINK_HERE') || paymentLink.includes('YOUR_DEFAULT_LINK_HERE') || 
        paymentLink.includes('YOUR_CART_LINK_HERE')) {
        alert(`Toplam: ${total}₺\n\nÖdeme linki henüz ayarlanmamış. Lütfen payment-config.js dosyasını düzenleyin.`);
        return;
    }
    
    // İyzico ödeme sayfasına yönlendir
    // Sepet bilgilerini URL parametresi olarak gönder (İyzico'da görebilirsiniz)
    const params = new URLSearchParams({
        total: total,
        items: cart.length,
        cart: JSON.stringify(cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })))
    });
    
    window.location.href = `${paymentLink}?${params.toString()}`;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

