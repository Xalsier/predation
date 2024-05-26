import { webnovel } from '../dat/novDat.js';
let commentsVisible = false;
const authorNoteSelector = '.author_note';
const chapterContentSelector = '.chapter_content';
const commentsSelector = '.comment-section';
const showCommentsSelector = '.show-comments';
const chapterArtSelector = '#chapter_art';
const nextChapterButton = document.getElementById('next-chapter');
const prevChapterButton = document.getElementById('prev-chapter');
window.currentLanguageIndex = document.getElementById('language-select').value;
window.currentChapter = 1;
let chapters = webnovel.chapters;
window.renderChapter = renderChapter;
document.getElementById('language-select').addEventListener('change', function() {
    window.currentLanguageIndex = this.value;
    renderChapter(window.currentChapter);
    window.updateTranslations(window.currentLanguageIndex);
    window.setRandomAnimal();
});
function renderChapter(chapterNumber) {
    const specialCodeInput = document.getElementById('code').value;
    const artImage = document.querySelector(chapterArtSelector);
    const creditLink = document.querySelector('.actual_credit');
    const profImgElement = document.querySelector('.profimg2');
    const contentWrapper1 = document.querySelector('.content-wrapper');
    if (chapterNumber === 1 && specialCodeInput !== 'kurinji') {
        const errorContentURL = '../../error.md';
        fetchAndRender(errorContentURL, authorNoteSelector);
        document.querySelector(chapterContentSelector).innerHTML = '';
        artImage.style.display = 'none';
        creditLink.style.display = 'none';
        profImgElement.style.display = 'none';
        contentWrapper1.style.display = 'none';
        return;
    }

    // Reset display styles in case they were previously hidden
    artImage.style.display = '';
    creditLink.style.display = '';
    profImgElement.style.display = '';

    window.currentChapter = chapterNumber;
    const languageKey = currentLanguageIndex.toUpperCase();
    const chapter = webnovel.chapters.find(chap => chap.chapter === chapterNumber);
    if (chapter) {
        const chapterContentURL = `https://hunt.predation.xyz/WC/${languageKey}/${chapterNumber}${languageKey}0.md`;
        const authorNoteURL = `https://hunt.predation.xyz/AN/${languageKey}/${chapterNumber}${languageKey}AN.md`;
        fetchAndRender(chapterContentURL, chapterContentSelector)
            .catch(() => {
                const defaultChapterContentURL = `https://hunt.predation.xyz/WC/EN/${chapterNumber}EN0.md`;
                fetchAndRender(defaultChapterContentURL, chapterContentSelector);
            });
        fetchAndRender(authorNoteURL, authorNoteSelector)
            .catch(() => {
                const defaultAuthorNoteURL = `https://hunt.predation.xyz/AN/EN/${chapterNumber}ENAN.md`;
                fetchAndRender(defaultAuthorNoteURL, authorNoteSelector);
            });

        const chapterArt = chapter.chapter_art;
        if (chapterArt && chapterArt.length > 0) {
            const [imageUrl, imageAlt, creditName, creditUrl, profImageUrl] = chapterArt[0];
            updateElementAttributes(artImage, imageUrl, imageAlt);
            creditLink.innerHTML = `<a class="actual_credit" href="${creditUrl}">${creditName}</a>`;
            updateElementAttributes(profImgElement, profImageUrl, creditName);
        }
    } else {
        console.error('Chapter not found:', chapterNumber);
    }
}



async function fetchAndRender(url, selector) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load content from: ${url}`);
    }  
    const text = await response.text();
    const { simpleMarkdownParse } = await import('../util/parse.js');
    const renderedHtml = simpleMarkdownParse(text);
    document.querySelector(selector).innerHTML = renderedHtml;
}
function refreshChapter() {
    const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
    if(currentChapter) renderChapter(currentChapter.chapter);
}
window.refreshChapter = refreshChapter;
document.addEventListener("click", function(event) {
    window.setRandomAnimal(); 
    window.fetchComments();
    if (event.target.matches(showCommentsSelector)) {
        const commentsSection = document.querySelector(commentsSelector);
        commentsSection.style.display = commentsVisible ? 'none' : 'flex';
        commentsVisible = !commentsVisible;
        event.target.textContent = commentsVisible ? "Hide Comments" : "Show Comments";
    }
});
function handleChapterNavigation(direction) {
    const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
    if (currentChapter) {
        if (direction === 'next' && currentChapter.chapter < chapters.length) {
            window.currentChapter++;
        } else if (direction === 'prev' && currentChapter.chapter > 1) {
            window.currentChapter--;
        } else {
            return;
        }
        window.refreshChapter();
        window.fetchComments();
    } else {
        console.error('Current chapter not found!');
    }
    const currentIndex = chapters.findIndex(chap => chap.chapter === window.currentChapter);
    const hasNextChapter = currentIndex < chapters.length - 1;
    const hasPrevChapter = currentIndex > 0;
    nextChapterButton.classList.toggle('available', hasNextChapter);
    prevChapterButton.classList.toggle('available', hasPrevChapter);
}
nextChapterButton.addEventListener('click', () => handleChapterNavigation('next'));
prevChapterButton.addEventListener('click', () => handleChapterNavigation('prev'));