# İyzico Ödeme Entegrasyonu Kurulum Rehberi

## 📋 Adımlar

### 1. İyzico Hesabı Oluşturma
- [İyzico](https://www.iyzico.com) sitesine gidin
- Hesap oluşturun ve giriş yapın
- İşyeri bilgilerinizi tamamlayın

### 2. İyzilink Oluşturma

#### Yöntem 1: Her Ürün İçin Ayrı Link (Önerilen)
1. İyzico panelinde **"İyzilink"** bölümüne gidin
2. Her ürün için ayrı ödeme linki oluşturun:
   - Ürün adı: "Deri Ajanda - Bordo"
   - Fiyat: 800₺
   - Link'i kopyalayın
3. `js/payment-config.js` dosyasını açın
4. İlgili ürün ID'sinin karşısına linki yapıştırın

**Örnek:**
```javascript
1: 'https://pay.iyzico.com/abc123xyz', // Deri Ajanda - Bordo
```

#### Yöntem 2: Tek Genel Link (Basit)
1. İyzico panelinde **"İyzilink"** bölümüne gidin
2. Tek bir genel ödeme linki oluşturun
3. `js/payment-config.js` dosyasında `defaultPaymentLink` değişkenini güncelleyin

**Örnek:**
```javascript
export const defaultPaymentLink = 'https://pay.iyzico.com/xyz789abc';
```

### 3. Sepet İçin Özel Link (Opsiyonel)
Eğer sepet için ayrı bir ödeme linki oluşturmak isterseniz:
1. İyzico panelinde sepet için özel bir link oluşturun
2. `js/payment-config.js` dosyasında `'cart'` anahtarını güncelleyin

### 4. Dosyayı Güncelleme

`js/payment-config.js` dosyasını açın ve linklerinizi ekleyin:

```javascript
export const iyzicoPaymentLinks = {
    1: 'https://pay.iyzico.com/BURAYA_LINK_GELECEK', // Deri Ajanda - Bordo
    2: 'https://pay.iyzico.com/BURAYA_LINK_GELECEK', // Deri Ajanda - Bej
    // ... diğer ürünler
};
```

### 5. Test Etme

1. Sitede bir ürünü sepete ekleyin
2. "Ödemeye Geç" butonuna tıklayın
3. İyzico ödeme sayfasına yönlendirilmelisiniz

## 🔧 Gelişmiş Kullanım

### Ürün Bilgilerini URL'e Ekleme

Eğer ödeme sayfasına ürün bilgilerini göndermek isterseniz, `main.js` ve `cart.js` dosyalarındaki yönlendirme kodlarını güncelleyebilirsiniz:

```javascript
// Ürün bilgilerini parametre olarak gönderme
const params = new URLSearchParams({
    product: product.name,
    price: product.price,
    id: product.id
});
window.location.href = `${paymentLink}?${params.toString()}`;
```

### Başarılı Ödeme Sonrası Yönlendirme

İyzico panelinde ödeme sonrası yönlendirme URL'ini ayarlayın:
- Başarılı ödeme: `https://yourdomain.com/success.html`
- Başarısız ödeme: `https://yourdomain.com/cancel.html`

## 📝 Notlar

- **Test Modu**: İlk başta test modunda çalışın
- **Güvenlik**: Production'da mutlaka HTTPS kullanın
- **Link Güncelleme**: Ürün fiyatı değiştiğinde İyzico'daki linki de güncelleyin
- **Stok Kontrolü**: İsterseniz ödeme öncesi stok kontrolü ekleyebilirsiniz

## 🆘 Sorun Giderme

### Link çalışmıyor
- Link'in doğru kopyalandığından emin olun
- `payment-config.js` dosyasında tırnak işaretlerinin doğru olduğunu kontrol edin

### Ödeme sayfası açılmıyor
- İyzico hesabınızın aktif olduğundan emin olun
- Link'in süresi dolmamış olmalı

### Sepet ödemesi çalışmıyor
- `cart` linkinin `payment-config.js`'de tanımlı olduğundan emin olun
- Veya `defaultPaymentLink` kullanın

## 📞 Destek

İyzico destek: https://dev.iyzico.com
İyzico dokümantasyon: https://dev.iyzico.com/tr/api/iyzilink

