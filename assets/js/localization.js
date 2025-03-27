class Localization {
    constructor() {
        this.currentLanguage = 'en'; // Default language
        this.translations = {};
    }

    // Load translations for the current language
    async loadTranslations(language) {
        this.currentLanguage = language;
        const response = await fetch(`assets/lang/${language}.json`);
        this.translations = await response.json();
    }

    // Get a translation by key
    translate(key) {
        return this.translations[key] || key; // If translation is missing, return the key as fallback
    }
}

const localization = new Localization();

// Update the text content on the page based on the selected language
function updateContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = localization.translate(key);
    });
}

// Detect the browser's language
function detectBrowserLanguage() {
    const browserLanguage = navigator.language || navigator.languages[0]; // Get the browser's language code
    return browserLanguage.includes('uk') ? 'uk' : 'en'; // Return 'uk' if the language code is Ukrainian, else 'en'
}

// On page load, set the language based on the browser language
async function initLocalization() {
    const language = detectBrowserLanguage();
    await localization.loadTranslations(language);
    updateContent();
}

initLocalization();