export class QuantityCounter {
    constructor() {
        this.value = 0

        this.dom = {
            quantityValue: document.querySelector('.quantity-counter__value'),
            plusBtn: document.querySelector('.quantity-counter__btn--plus'),
            minusBtn: document.querySelector('.quantity-counter__btn--minus'),
        }

        this.bindEvents()
    }

    bindEvents = () => {
        this.dom.plusBtn.addEventListener('click', this.updateQuantityHandler.bind(this, 1))
        this.dom.minusBtn.addEventListener('click', this.updateQuantityHandler.bind(this, -1))
    }

    /* ----- Events handlers ----- */

    updateQuantityHandler = (step) => {
        const value = parseInt(this.dom.quantityValue.textContent, 10) + step

        if (value >= 0) this.dom.quantityValue.textContent = value
    }
}

// ;(() => {
//     new QuantityCounter()
// })()
