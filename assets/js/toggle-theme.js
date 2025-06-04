(() => {
    const toggleTheme = document.querySelector('button.toggle-theme')
    const moonIcon = toggleTheme.querySelector('svg.moon-icon')
    const sunIcon = toggleTheme.querySelector('svg.sun-icon')
    const toggleToken = 'hidden'

    function updateTheme(savedTheme = '') {
        console.debug(`===updateTheme===`, {savedTheme})

        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark')
            moonIcon.classList.toggle(toggleToken, savedTheme === 'dark')
            sunIcon.classList.toggle(toggleToken, savedTheme === 'light')
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            document.documentElement.classList.toggle('dark', prefersDark)
            moonIcon.classList.toggle(toggleToken, !prefersDark)
            sunIcon.classList.toggle(toggleToken, prefersDark)
        }
    }

    (function initTheme(mode) {
        console.debug(`---initTheme---`, {mode})
        updateTheme(mode)
    })(localStorage.theme)

    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
            console.debug('prefers-color-scheme change')
            if (!localStorage.theme) {
                document.documentElement.classList.toggle('dark', e.matches);
                moonIcon.classList.toggle(toggleToken, e.matches)
                sunIcon.classList.toggle(toggleToken, !e.matches)
            }
        })

    toggleTheme.addEventListener('click', (event) => {
        const changeTo = (localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
            ? 'light' : 'dark'
        localStorage.theme = changeTo
        updateTheme(changeTo)
    })
})()
