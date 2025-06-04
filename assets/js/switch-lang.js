(() => {
    return
    const switcher = document.querySelector('.lang-switcher')
    const langButton = switcher?.querySelector('button')
    const langMenu = switcher?.querySelector('ul')

    let isOpen = false

    function toggleMenu(open) {
        isOpen = typeof open === 'boolean' ? open : !isOpen
        switcher?.setAttribute('aria-expanded', isOpen)

        if (isOpen) {
            langMenu?.classList.remove('opacity-0', 'invisible', 'scale-95')
            langMenu?.classList.add('opacity-100', 'visible', 'scale-100')
        } else {
            langMenu?.classList.add('opacity-0', 'invisible', 'scale-95')
            langMenu?.classList.remove('opacity-100', 'visible', 'scale-100')
        }
    }

    langButton?.addEventListener('click', toggleMenu)
    Object.entries({
        'mouseenter': () => toggleMenu(true),
        'mouseleave': () => toggleMenu(false),
    }).forEach(([event, handler]) => {
        switcher?.addEventListener(event, handler)
    })

    document.addEventListener('click', (e) => {
        if (isOpen && !switcher.contains(e.target)) {
            toggleMenu(false)
        }
    })
})()
