import { toggleReader } from '../Javascript/reader.js';
import { archive} from '../Javascript/search.js';
export function convertMarkdownToHtml(markdown) {
    var md = window.markdownit({
        html: true, // Enable HTML tags in source
    });
    return md.render(markdown);
}
export function handleKeydown(e) {
    if (e.which === 13) {
        e.preventDefault();
        processInput($(this));
    }
}
export function processInput(inputElement) {
    let inputVal = inputElement.val().trim();
    if (inputVal) {
        addMetaHash(inputVal);
        inputElement.val('');
        metahashContainer.empty();
    }
}
export async function fetchMarkdownContent(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            return await response.text();
        } else {
            console.error('Failed to fetch markdown content:', response.statusText);
            return 'Error loading content.';
        }
    } catch (error) {
        console.error('Error fetching markdown:', error);
        return 'Error fetching content.';
    }
}
function goToArchive() {
    $('.search-area').fadeOut(function() {
        $('.gallery-container').fadeIn();
    });
}
export function searchScenarios(errorCode) {
    switch (errorCode) {
        case 0:
            console.error('Error 0: Gallery is empty.');
            $(this).text('Error 0');
            setTimeout(() => { $(this).text('Hunt'); }, 3000);
            break;
        case 20:
            console.error('Error 20: Image source not found.');
            $(this).text('Error 20');
            setTimeout(() => { $(this).text('Hunt'); }, 3000);
            goToArchive();
            break;
        case 40:
            console.error('Error 40: No posts displayed after filtering.');
            $(this).text('Error 40');
            setTimeout(() => { $(this).text('Hunt'); }, 3000);
            break;
        case 80:
            goToArchive();
            $('.reader-modal').show();
            toggleReader();
            break;
        case 100:
            console.error('Error 100: No pawprints');
            $(this).text('Error: 100');
            setTimeout(() => { $(this).text('Hunt'); }, 3000);
            break;
        default:
            goToArchive();
    }
}
export function sortScenario(sortType) {
    return Object.entries(archive).sort((a, b) => {
        switch (sortType) {
            case 'Recent':
                return new Date(b[1].time) - new Date(a[1].time);
            case 'Oldest':
                return new Date(a[1].time) - new Date(b[1].time);
            default:
                return 0;
        }
    }).map(entry => entry[1]);
}