// Import products data
import { products } from './data.js';

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Get product details
function getProductDetails() {
    const productId = getProductId();
    return products.find(p => p.id === productId);
}

// Display product details
function displayProductDetails() {
    const product = getProductDetails();
    const container = document.getElementById('productDetail');
    
    if (!product) {
        container.innerHTML = `
            <div style="text-align: center; padding: 100px 20px;">
                <h2>Ürün bulunamadı</h2>
                <p>Aradığınız ürün mevcut değil.</p>
                <a href="/shop.html" class="btn btn-primary" style="margin-top: 20px;">Mağazaya Dön</a>
            </div>
        `;
        return;
    }
    
    // Check if product is a charm or agenda
    const isCharm = product.category === 'charms';
    
    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600x800?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="product-detail-info">
            <div class="product-breadcrumb">
                <a href="/">Anasayfa</a> / <a href="/shop.html">Mağaza</a> / ${product.name}
            </div>
            
            <h1>${product.name}</h1>
            <div class="product-price-large">${product.price}₺</div>
            
            <div class="product-description">
                <p>${isCharm 
                    ? 'Deri ajandalarınıza münhasır bir karakter kazandıran premium kalite süsleme. Özenle seçilmiş malzemelerden üretilen her bir charm, ajandanızı benzersiz kılan sofistike bir aksesuar.'
                    : 'Gündelik yaşamınıza rafine bir dokunuş katan, metinle üretilmiş şık ve fonksiyonel deri ajanda. Zamanla olgunlaşarak estetik değerini arttıran, kaliteli deri malzemeden imal edilmiştir.'
                }</p>
            </div>
            
            <div class="product-features">
                <h3>Özellikler</h3>
                <ul>
                    ${isCharm ? `
                        <li><strong>Malzeme:</strong> Kaliteli Metal Alaşım</li>
                        <li><strong>Renk:</strong> ${product.color}</li>
                        <li><strong>Boyut:</strong> Standart Süsleme Boyu</li>
                        <li><strong>Ağırlık:</strong> Hafif ve Dayanıklı</li>
                        <li><strong>Kullanım:</strong> Tüm deri ajandalarla uyumlu</li>
                        <li><strong>Tasarım:</strong> Özgün ve zarif</li>
                        <li><strong>Detaylar:</strong> Paslanmaz ve solmaz</li>
                        <li><strong>Kalite:</strong> El işçiliği detayları</li>
                    ` : `
                        <li><strong>Malzeme:</strong> %100 Hakiki Deri</li>
                        <li><strong>Renk:</strong> ${product.color}</li>
                        <li><strong>Boyut:</strong> A5 (148 x 210 mm)</li>
                        <li><strong>Sayfa Sayısı:</strong> 200 sayfa</li>
                        <li><strong>Kağıt:</strong> 80gr İvory kağıt</li>
                        <li><strong>Kapanış:</strong> Elastik bantlı</li>
                        <li><strong>Detaylar:</strong> İsim/logo baskı alanı</li>
                        <li><strong>Süsleme Uyumlu:</strong> Evet (30+ süsleme seçeneği)</li>
                    `}
                </ul>
            </div>
            
            <div class="product-actions">
                <button class="btn btn-primary btn-large" onclick="addToCart(${product.id}); showNotification('Ürün sepete eklendi!')">
                    Sepete Ekle 🛒
                </button>
                <a href="/shop.html" class="btn btn-secondary btn-large">Alışverişe Devam Et</a>
            </div>
            
            <div class="product-info-box">
                <div class="info-item">
                    <strong>📦 Ücretsiz Kargo</strong>
                    <p>1000₺ üzeri siparişlerde</p>
                </div>
                <div class="info-item">
                    <strong>↩️ 30 Gün İade</strong>
                    <p>Koşulsuz iade garantisi</p>
                </div>
                <div class="info-item">
                    <strong>✨ Premium Kalite</strong>
                    <p>El işçiliği ile üretilmiştir</p>
                </div>
            </div>
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
});

