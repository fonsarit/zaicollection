// Products Data - Centralized
export const products = [
    {
        id: 1,
        name: "Deri Ajanda - Bordo",
        price: 800,
        image: "/images/product-1.jpg",
        category: "agendas",
        featured: true,
        color: "Bordo"
    },
    {
        id: 2,
        name: "Deri Ajanda - Bej",
        price: 800,
        image: "/images/product-2.jpg",
        category: "agendas",
        featured: true,
        color: "Bej"
    },
    {
        id: 3,
        name: "Deri Ajanda - Lacivert",
        price: 800,
        image: "/images/product-3.jpg",
        category: "agendas",
        featured: true,
        color: "Lacivert"
    },
    {
        id: 4,
        name: "Deri Ajanda - Siyah",
        price: 800,
        image: "/images/product-4.jpg",
        category: "agendas",
        featured: true,
        color: "Siyah"
    }
];

// Add 30 charm products
for (let i = 1; i <= 30; i++) {
    products.push({
        id: 100 + i,
        name: `Süsleme #${i}`,
        price: 125,
        image: `/images/charm-${i}.jpg`,
        category: "charms",
        featured: i <= 4,
        color: "Mixed"
    });
}

// Export products globally for cart.js compatibility
if (typeof window !== 'undefined') {
    window.productsData = products;
}

