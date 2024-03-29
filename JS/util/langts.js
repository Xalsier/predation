function fetchTranslations(filename) {
    return fetch(`../../JSON/user_interface/${filename}.json`)
        .then(response => response.json());
}

function updateUIElements(data, languageCode) {
    const elements = data.headerContent || data.footerContent || data.conTags || data.sumStat || data.elements || data.prefaces || data.buttons || [];

    function updateElementText(elementData, langCode) {
        const element = document.getElementById(elementData.id);
        const translation = elementData.translations[langCode];
        if (element && translation) {
            if (Array.isArray(translation) && translation.length > 1 && translation[1] === false) {
                console.log(`${langCode} translation for ${elementData.id} needs review`);
            } else {
                element.textContent = Array.isArray(translation) ? translation[0] : translation;
            }
        }
    }

    elements.forEach(elementData => {
        try {
            updateElementText(elementData, languageCode);
        } catch (error) {
            console.error(`Error processing translations for ${languageCode}: ${error}`);
            updateElementText(elementData, 'en');  // Fallback to English
        }
    });
}

function updateTranslations(languageCode) {
    fetchTranslations('buttons').then(data => { updateUIElements(data, languageCode);});
    fetchTranslations('prefaces').then(data => { updateUIElements(data, languageCode);});
    fetchTranslations('sumStat').then(data => { updateUIElements(data, languageCode);});
    fetchTranslations('conTag').then(data => { updateUIElements(data, languageCode);});
    fetchTranslations('footer').then(data => { updateUIElements(data, languageCode);});
    fetchTranslations('header').then(data => { updateUIElements(data, languageCode);});
}


window.updateTranslations = updateTranslations;
