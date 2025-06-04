(() => {
    function hideAllExcept(targetElement) {
        console.debug('hideAllExcept - targetElement:', targetElement)
        document.querySelectorAll('.hidden:not(.toggle-theme svg)').forEach((element) => {
            if (element.closest('#search-results-container')) {
                // DO NOT TOUCH MY #search-results-container
                return
            }
            if (element !== targetElement) {
                element.classList.add('close') // Hide the element
                element.classList.remove('open') // Close previously open elements
            }
        })
    }

    function toggleElement(targetElement) {
        const isHidden = targetElement.classList.contains('close')
        hideAllExcept(targetElement);
        targetElement.classList.toggle('close', !isHidden)
        targetElement.classList.toggle('open', isHidden)
    }

    const searchIndicators = document.querySelectorAll('.toggle-button[data-target="search-container"] svg')

    function updateSearchIndicators() {
        console.debug('===updateSearchIndicators===')
        searchIndicators.forEach((searchIndicator) => {
            searchIndicator.classList.toggle('close')
        })
    }

    document.addEventListener('click', (event) => {
        if (event.target.closest('.toggle-theme')) {
            // do not respond to toggle theme
            return
        }
        const toggleButton = event.target.closest('.toggle-button')
        if (toggleButton) {
            if ('search-container' === toggleButton.getAttribute('data-target')) {
                updateSearchIndicators(toggleButton)
            }

            const targetIds = toggleButton.getAttribute('data-target')?.split(' ')
            targetIds?.forEach((targetId) => {
                const targetElement = document.querySelector(`#${targetId}`)
                if (targetElement) {
                    toggleElement(targetElement)
                }
            })
        }

        const targetElements = Array.from(document.querySelectorAll('.open'))
        const clickedOutsideAllTargets = targetElements.every((element) => {
            return !element.contains(event.target) && !event.target.closest('.toggle-button')
        })

        if (clickedOutsideAllTargets) {
            targetElements.forEach((element) => {
                if ('search-container' === element.id) {
                    updateSearchIndicators()
                }
                element.classList.remove('open')
                element.classList.add('close')
            })
        }
    })
})()
