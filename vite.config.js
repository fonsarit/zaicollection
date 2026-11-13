import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        shop: './shop.html',
        about: './about.html',
        product: './product.html',
      }
    }
  }
})

