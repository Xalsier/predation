function fetchTranslations(filename) {
    return fetch(`../../JSON/user_interface/${filename}.json`)
        .then(response => response.json());
}

function updateUIElements(data, languageCode) {
    const elements = data.headerContent || data.footerContent || data.conTags || data.sumStat || data.elements || data.prefaces || data.buttons || [];

    try {
        elements.forEach(elementData => {
            const element = document.getElementById(elementData.id);
            const translation = elementData.translations[languageCode];

            if (element && translation) {
                if (Array.isArray(translation) && translation.length > 1 && translation[1] === false) {
                    console.log(`${languageCode} translation for ${elementData.id} needs review`);
                } else {
                    element.textContent = Array.isArray(translation) ? translation[0] : translation;
                }
            }
        });
    } catch (error) {
        console.error(`Error processing translations for ${languageCode}: ${error}`);
    }
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
