# ZAICOLLECTION

Premium Leather Agenda & Charms E-Commerce Website

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly
- 🛍️ Product showcase (Leather Agendas + 30 Charms)
- 💳 iyzico payment integration ready
- 🚀 Deployed on Vercel
- ⚡ Fast and lightweight

## Pages

1. **Home** - Hero section, featured products, news
2. **Shop** - All products with category filtering
3. **About Us** - Company story and values

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### FTP Upload

Build the project first:
```bash
npm run build
```

Then upload the contents of the `dist` folder to your web server via FTP.

## Payment Integration

To integrate iyzico payments:

1. Get your iyzilink URLs from iyzico dashboard
2. Update the `buyProduct()` function in `/js/main.js`
3. Replace the alert with actual payment redirect

```javascript
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    // Redirect to iyzico payment page
    window.location.href = `https://pay.iyzico.com/your-payment-link?product=${productId}`;
}
```

## Adding Images

Place your product images in the `public/images` folder:

- `hero-bg.jpg` - Hero section background
- `product-1.jpg` to `product-4.jpg` - Featured agenda products
- `charm-1.jpg` to `charm-30.jpg` - Charm products
- `sale-product.jpg` - Sale section product
- `news-1.jpg`, `news-2.jpg` - News articles
- `about-hero.jpg` - About page hero image

## Customization

- Edit colors in `/styles/main.css` (`:root` section)
- Modify products in `/js/main.js`
- Update content in HTML files

## Technologies

- Vite - Build tool
- Vanilla JavaScript
- CSS3
- HTML5
- Vercel - Hosting

## License

© 2025 ZAICOLLECTION. All rights reserved.

