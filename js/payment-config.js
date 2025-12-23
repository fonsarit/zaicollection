// İyzico Payment Configuration
// Bu dosyada iyzico ödeme linklerinizi tanımlayın

// ✅ PRATİK YÖNTEM: Kategori bazlı linkler (Sadece 2-3 link yeterli!)
// Her ürün için ayrı link oluşturmanıza gerek yok.

// Kategori bazlı ödeme linkleri
export const iyzicoCategoryLinks = {
    // Ajandalar için tek bir link (tüm ajandalar için)
    'agendas': 'https://pay.iyzico.com/YOUR_AGENDA_LINK_HERE',
    
    // Süslemeler için tek bir link (tüm süslemeler için)
    'charms': 'https://pay.iyzico.com/YOUR_CHARM_LINK_HERE',
    
    // Sepet için genel ödeme linki (karışık ürünler için)
    'cart': 'https://pay.iyzico.com/YOUR_CART_LINK_HERE'
};

// Genel ödeme linki (eğer kategori bazlı link yoksa, her şey için kullanılır)
export const defaultPaymentLink = 'https://pay.iyzico.com/YOUR_DEFAULT_LINK_HERE';

// ⚠️ İSTEĞE BAĞLI: Eğer belirli ürünler için özel link isterseniz (opsiyonel)
// Sadece özel durumlar için kullanın, örneğin indirimli ürünler
export const iyzicoSpecialProductLinks = {
    // Örnek: Özel indirimli ürün için
    // 1: 'https://pay.iyzico.com/SPECIAL_PRODUCT_LINK',
};

