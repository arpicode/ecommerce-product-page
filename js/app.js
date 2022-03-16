import { ImageGallery } from './image-gallery.js'
import { Lightbox } from './lightbox.js'
import { QuantityCounter } from './quantity-counter.js'
import { Cart } from './cart.js'

class App {
    static images = [
        'image-product-1.jpg',
        'image-product-2.jpg',
        'image-product-3.jpg',
        'image-product-4.jpg',
    ]

    constructor() {}

    run() {
        new ImageGallery(...App.images)
        new Lightbox(...App.images)
        new QuantityCounter()
        new Cart()
    }
}

;(() => {
    const app = new App()
    app.run()
})()
