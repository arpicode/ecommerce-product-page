export class ImageGallery {
    _imagePath = 'images/products/'
    _minOpacity = 0.2

    constructor(...images) {
        this.images = images.map((img) => `${this._imagePath}${img}`)

        this.currentImage = 0
        this.gallerySpeed = 10000
        this.switchIntervalId = null
        this.fadeInIntervalId = null
        this.imageGallery = document.querySelector('.image-gallery')

        this.dom = {
            displayedImage: this.imageGallery.querySelector('.image-gallery__image'),
            btnPrevious: this.imageGallery.querySelector('.image-gallery__arrow-btn--previous'),
            btnNext: this.imageGallery.querySelector('.image-gallery__arrow-btn--next'),
            thumbnailNavigation: this.imageGallery.querySelector('.image-gallery__thumbnails-nav'),
        }

        this.bindEvents()
        this.startAutoDisplay()
    }

    bindEvents() {
        this.dom.btnPrevious.addEventListener('click', this.previousImageHandler.bind(this))
        this.dom.btnNext.addEventListener('click', this.nextImageHandler.bind(this))
        this.dom.displayedImage.addEventListener('click', this.openLightbox.bind(this))
        this.dom.thumbnailNavigation.addEventListener('click', this.displayImage.bind(this))
    }

    startAutoDisplay() {
        if (!this.switchIntervalId) {
            this.switchIntervalId = setInterval(
                this.setCurrentImage.bind(this, 1),
                this.gallerySpeed
            )
        }
    }

    resetAutoDisplay() {
        clearInterval(this.switchIntervalId)
        clearInterval(this.fadeInIntervalId)
        this.switchIntervalId = null
    }

    setCurrentImage(step) {
        this.currentImage = Math.abs(
            (this.images.length + this.currentImage + step) % this.images.length
        )
        this.displayImage()
        this.startAutoDisplay()
    }

    displayImage(event) {
        let imgFullName
        if (event) {
            let el = event.target
            if (el.nodeName === 'BUTTON') el = el.querySelector('img')
            if (!el.src) return

            imgFullName = el.src.replace('-thumbnail', '')
            event.target.parentElement.blur()
            this.resetAutoDisplay()
            this.startAutoDisplay()
        } else {
            imgFullName = this.images[this.currentImage]
        }

        const activeThumbnail = this.imageGallery.querySelector(
            '.image-gallery__thumbnail-btn--active'
        )
        activeThumbnail?.classList.remove('image-gallery__thumbnail-btn--active')

        const imgName = imgFullName.substring(imgFullName.lastIndexOf('/') + 1)
        const newActiveThumbnail = this.imageGallery.querySelector(
            `[data-thumbnail-target="${imgName}"]`
        )
        newActiveThumbnail.classList.add('image-gallery__thumbnail-btn--active')

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
        this.resetAutoDisplay()
        this.setCurrentImage(-1)
    }

    nextImageHandler() {
        this.resetAutoDisplay()
        this.setCurrentImage(1)
    }

    openLightbox() {
        document.querySelector('.overlay--lightbox').classList.toggle('overlay--show')
    }
}
