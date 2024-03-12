import { getTranslations } from '../dat/site-ts.js';
function updateTranslations(languageCode) {
    const translations = getTranslations(languageCode);

    // Update elements based on their IDs and translation keys
    for (const [id, translationKey] of Object.entries(translations)) {
        const element = $('#' + id);
        if (element.length) { // Check if the element exists
            element.text(translationKey);
        }
    }
}

// Call initially for default language
updateTranslations('en'); // Assuming 'en' is the default

// Call on language change
$('#modal-language-select').change(function() {
    const selectedLanguage = $(this).val();
    updateTranslations(selectedLanguage);
});

$('#language-select').change(function() {
    const selectedLanguage = $(this).val();
    updateTranslations(selectedLanguage);
});