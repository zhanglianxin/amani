(() => {
    const dataAttribute = "data-cfemail"

    function decodeHtmlEntities(encodedString) {
        // Create a temporary div element
        const tempDiv = document.createElement("div")
        // Set the innerHTML of the div to the encoded string, replacing double quotes for safety
        tempDiv.innerHTML = '<a href="' + encodedString.replace(/"/g, "&quot;") + '"></a>'
        // Return the decoded href attribute of the created link
        return tempDiv.childNodes[0]?.getAttribute("href")
    }

    function hexToDecimal(hexString, startIndex) {
        // Extract a two-character substring from the hex string at the given index
        const hexPair = hexString.substring(startIndex, 2 + startIndex)
        // Parse the hexadecimal string as an integer (base 16)
        return parseInt(hexPair, 16)
    }

    function decodeEmail(encodedHref, offset) {
        // Initialize an empty string to store the decoded email
        let decodedEmail = ""
        // Get the initial key character's decimal value from the encoded string
        const key = hexToDecimal(encodedHref, offset)
        // Iterate through the rest of the encoded string in two-character steps
        for (let i = offset + 2; i < encodedHref.length; i += 2) {
            // Get the decimal value of the current two-character hex sequence
            const hexValue = hexToDecimal(encodedHref, i)
            // XOR the hex value with the key to get the ASCII value of the character
            const charCode = hexValue ^ key
            // Convert the ASCII value to its corresponding character and append it to the decoded email
            decodedEmail += String.fromCharCode(charCode)
        }

        // Decode any HTML entities in the resulting email address
        return decodeHtmlEntities(decodedEmail)
    }

    document.querySelectorAll(`a[${dataAttribute}]:not([${dataAttribute}=""])`).forEach((elem) => {
        const decodedEmail = decodeEmail(elem.getAttribute(dataAttribute), 0)
        elem.href = `${decodedEmail.includes(':') ? '':'mailto:'}${decodedEmail}`
    })
})()
