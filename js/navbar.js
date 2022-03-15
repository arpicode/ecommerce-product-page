;(() => {
    const cart = document.querySelector('.cart')
    const openBtn = document.querySelector('.navbar__btn-open')
    const closeBtn = document.querySelector('.navbar__btn-close')
    const cartToggleBtn = document.querySelector('.navbar__cart-icon')
    const overlay = document.querySelector('.overlay--navbar')
    const sidePanel = document.querySelector('.navbar__side-panel')
    const lastLinkItem = document.querySelector('.navbar__nav-item:last-of-type .navbar__nav-link')
    const cartCheckoutBtn = document.querySelector('.button--checkout')
    const mql = window.matchMedia('screen and (min-width: 800px)')

    const toggleMenu = () => {
        overlay.classList.toggle('overlay--show')
        document.body.classList.toggle('has-overlay')
        sidePanel.classList.toggle('navbar__side-panel--show')

        if (sidePanel.classList.contains('navbar__side-panel--show')) {
            closeBtn.focus()
        } else {
            openBtn.focus()
        }
    }

    // Toggle the animated state of the sidebar to prevent animation during the
    // media query switch.
    const toggleMenuAnimation = (e) => {
        if (e.matches) {
            sidePanel.classList.remove('navbar__side-panel--animated')
        } else {
            sidePanel.classList.add('navbar__side-panel--animated')
        }
    }

    const toggleCart = () => {
        cart.classList.toggle('cart--show')
    }

    const cartBtnBlurHandler = () => {
        if (cart.classList.contains('cart--show')) {
            if (cart.classList.contains('cart--empty')) {
                toggleCart()
            } else {
                cart.querySelector('.cart-item__button--delete').focus()
            }
        }
    }

    const cartCheckoutBtnBlurHandler = () => {
        cartToggleBtn.focus()
    }

    // Prevent tabbing out of the side panel
    const lastLinkHandler = (e) => {
        closeBtn.focus()
    }

    const bindEvents = () => {
        lastLinkItem.addEventListener('blur', lastLinkHandler)
        openBtn.addEventListener('click', toggleMenu)
        closeBtn.addEventListener('click', toggleMenu)
        cartToggleBtn.addEventListener('click', toggleCart)
        cartToggleBtn.addEventListener('blur', cartBtnBlurHandler)
        cartCheckoutBtn.addEventListener('blur', cartCheckoutBtnBlurHandler)
        mql.addEventListener('change', toggleMenuAnimation)
    }

    toggleMenuAnimation(mql)
    bindEvents()
})()
