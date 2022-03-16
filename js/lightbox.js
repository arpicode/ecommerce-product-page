export class Lightbox {
    _imagePath = 'images/products/'
    _minOpacity = 0.2

    constructor(...images) {
        this.images = images.map((img) => `${this._imagePath}${img}`)

        this.currentImage = 0
        this.gallerySpeed = 5000
        this.fadeInIntervalId = null
        this.lightbox = document.querySelector('.lightbox')

        this.dom = {
            displayedImage: this.lightbox.querySelector('.lightbox__image'),
            btnPrevious: this.lightbox.querySelector('.lightbox__arrow-btn--previous'),
            btnNext: this.lightbox.querySelector('.lightbox__arrow-btn--next'),
            thumbnailNavigation: this.lightbox.querySelector('.lightbox__thumbnails-nav'),
            btnClose: this.lightbox.querySelector('.lightbox__close-btn'),
        }

        this.bindEvents()
    }

    bindEvents() {
        this.dom.btnPrevious.addEventListener('click', this.previousImageHandler.bind(this))
        this.dom.btnNext.addEventListener('click', this.nextImageHandler.bind(this))
        this.dom.thumbnailNavigation.addEventListener('click', this.displayImage.bind(this))
        this.dom.btnClose.addEventListener('click', this.closeLightbox.bind(this))
    }

    setCurrentImage(step) {
        this.currentImage = Math.abs(
            (this.images.length + this.currentImage + step) % this.images.length
        )
        this.displayImage()
    }

    displayImage(event) {
        let imgFullName
        if (event) {
            let el = event.target
            if (el.nodeName === 'BUTTON') el = el.querySelector('img')
            if (!el.src) return

            imgFullName = el.src.replace('-thumbnail', '')
            event.target.parentElement.blur()
            clearInterval(this.fadeInIntervalId)
        } else {
            imgFullName = this.images[this.currentImage]
        }

        const activeThumbnail = this.lightbox.querySelector('.lightbox__thumbnail-btn--active')
        activeThumbnail?.classList.remove('lightbox__thumbnail-btn--active')

        const imgName = imgFullName.substring(imgFullName.lastIndexOf('/') + 1)
        const newActiveThumbnail = this.lightbox.querySelector(
            `[data-thumbnail-target="${imgName}"]`
        )
        newActiveThumbnail.classList.add('lightbox__thumbnail-btn--active')

        this.dom.displayedImage.style.opacity = this._minOpacity
        this.fadeInImage()
        this.dom.displayedImage.src = imgFullName
        this.dom.displayedImage.alt = this.getProductName(imgFullName)
        this.currentImage = this.getDisplayedImageIndex()
    }

    fadeInImage() {
        let opacity = this._minOpacity // initial opacity
        this.fadeInIntervalId = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(this.fadeInIntervalId)
                this.fadeInIntervalId = null
            }
            this.dom.displayedImage.style.opacity = opacity
            opacity += opacity * 0.1
        }, this.gallerySpeed / 200)
    }

    getProductName(imgName) {
        let name = imgName.match(/[^/]+\.(png|jpe?g|gif|webp)$/i)
        if (name) {
            name = name[0].substring(0, name[0].lastIndexOf('.')).replace(/-/g, ' ')
        }

        return name || 'no image'
    }

    getDisplayedImageIndex() {
        let imgFullName = this.dom.displayedImage.src
        imgFullName = imgFullName.substring(imgFullName.lastIndexOf('/') + 1)

        return this.images.indexOf(`${this._imagePath}${imgFullName}`)
    }

    /* ----- Event Handlers ----- */

    previousImageHandler() {
        clearInterval(this.fadeInIntervalId)
        this.setCurrentImage(-1)
    }

    nextImageHandler() {
        clearInterval(this.fadeInIntervalId)
        this.setCurrentImage(1)
    }

    closeLightbox() {
        document.querySelector('.overlay--lightbox').classList.toggle('overlay--show')
    }
}
