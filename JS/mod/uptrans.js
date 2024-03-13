import { getTranslations } from '../dat/site-ts.js?12345';
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
$('#language-select').change(function() {
    const selectedLanguage = $(this).val();
    updateTranslations(selectedLanguage);
});