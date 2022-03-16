export class Cart {
    constructor() {
        this.products = []

        this.dom = {
            cart: document.querySelector('.cart'),
            cartItems: document.querySelector('.cart__body'),
            addToCartBtn: document.getElementById('addToCartBtn'),
            cartItemsCount: document.querySelector('.navbar__cart-icon--pill'),
            quantityValue: document.querySelector('.quantity-counter__value'),
        }

        this.bindEvents()
    }

    bindEvents() {
        this.dom.addToCartBtn.addEventListener('click', this.addProductHandler.bind(this))
        this.dom.cart.addEventListener('click', this.deleteCartItemHandler.bind(this))
    }

    buildCartItemHtml(product, index) {
        const html = `
            <article id="item-${index}" class="cart-item">
                <img class="cart-item__thumbnail" src="./images/products/image-product-1-thumbnail.jpg"
                    alt="image product 1">
                <div class="cart-item__description">
                    <h3 class="cart-item__name">Autumn Limited Edition Sneakers</h3>
                    <h4 class="cart-item__price">
                        $${product.price.toFixed(2)} x ${product.qty}
                        <strong>$${(product.price * product.qty).toFixed(2)}</strong>
                    </h4>
                </div>
                <button class="cart-item__button cart-item__button--delete" aria-label="Remove item from cart">
                    <svg width="14" height="16" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" />
                    </svg>
                </button>
            </article>`

        return html
    }

    renderCart() {
        if (this.products.length > 0) {
            this.dom.cart.classList.remove('cart--empty')
            this.dom.cartItemsCount.classList.remove('navbar__cart-icon--hidden')
            this.dom.cartItems.querySelectorAll('article').forEach((a) => a.remove())
            this.products.forEach((p, index) => {
                this.dom.cartItems.insertAdjacentHTML('beforeend', this.buildCartItemHtml(p, index))
            })
            this.dom.cartItemsCount.dataset.cartCount = this.getCartItemsCount()
        } else {
            this.dom.cart.classList.add('cart--empty')
            this.dom.cartItemsCount.classList.add('navbar__cart-icon--hidden')
        }
    }

    getCartItemsCount() {
        return this.products.reduce((a, c) => a + c.qty, 0)
    }

    isDeleteBtn(event) {
        const el = event.target
        let btn = false

        if (el.nodeName == 'svg') {
            btn = el.parentElement
        } else if (el.nodeName == 'path') {
            btn = el.parentElement.parentElement
        } else if (el.nodeName === 'BUTTON' && el.classList.contains('cart-item__button--delete')) {
            btn = el
        }

        return btn
    }

    /* ----- Events handlers ----- */

    addProductHandler() {
        const product = { price: 125, qty: parseInt(this.dom.quantityValue.textContent, 10) }
        if (product.qty > 0) {
            this.products.push(product)
            this.renderCart()
            this.dom.quantityValue.textContent = 0
        }
    }

    deleteCartItemHandler(event) {
        let item = this.isDeleteBtn(event)
        if (item) {
            item = item.parentElement
            this.products.splice(item.id.split('-')[1], 1)
            item.remove()
            this.renderCart()
        }
    }
}
