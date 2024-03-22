import { webnovel } from '../dat/novDat.js';
let commentsVisible = false;
const authorNoteSelector = '.author_note';
const chapterContentSelector = '.chapter_content';
const commentsSelector = '.comment-section';
const showCommentsSelector = '.show-comments';
const chapterArtSelector = '#chapter_art';
const nextChapterButton = document.getElementById('next-chapter');
const prevChapterButton = document.getElementById('prev-chapter');
window.currentLanguageIndex = 'en';
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
    window.currentChapter = chapterNumber;
    const languageKey = currentLanguageIndex;
    const chapter = chapters.find(chap => chap.chapter === chapterNumber);
    if (chapter) {
        const originalAuthorNotePath = chapter.authorNotePath[languageKey][0];
        fetchAndRender(originalAuthorNotePath, authorNoteSelector);
        const originalChapterContentPath = chapter.chapterContentPath[languageKey][0];
        fetchAndRender(originalChapterContentPath, chapterContentSelector);
        const chapterArt = chapter.chapter_art;
        if (chapterArt && chapterArt.length > 0) {
            const artPath = chapterArt[0][0];
            const alternatePath = `https://predation.jp/${artPath.replace('../', '')}`;
            document.querySelector(chapterArtSelector).setAttribute('src', alternatePath);
            document.querySelector(chapterArtSelector).setAttribute('alt', chapterArt[1]);
            document.querySelector('.actual_credit').innerHTML = '<img class="profimg" src="'+ chapterArt[0][4] +'" alt="' + chapterArt[0][2] + '"> <a class="actual_credit" href="' + chapterArt[0][3] + '">' + chapterArt[0][2] + '</a>';
        }
    } else {
        console.error('Chapter not found:', chapterNumber);
    }
}
async function fetchAndRender(path, selector) {
    const targetElement = document.querySelector(selector);
    console.log(targetElement);
    const alternatePath = `https://predation.jp/${path.replace('../', '')}`;
    console.log(alternatePath);
    console.log(path);
    const alternateResponse = await fetch(alternatePath);
    if (!alternateResponse.ok) {
        throw new Error(`Failed to load content from both locations: ${path} and ${alternatePath}`);
    }
    const alternateText = await alternateResponse.text();
    const { simpleMarkdownParse } = await import('../util/parse.js');
    const renderedHtml = simpleMarkdownParse(alternateText);
    targetElement.innerHTML = renderedHtml;
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
    updateNavButtons();
}
function updateNavButtons() {
    const currentIndex = chapters.findIndex(chap => chap.chapter === window.currentChapter);
    const hasNextChapter = currentIndex < chapters.length - 1;
    const hasPrevChapter = currentIndex > 0;
    nextChapterButton.classList.toggle('available', hasNextChapter);
    prevChapterButton.classList.toggle('available', hasPrevChapter);
}
nextChapterButton.addEventListener('click', () => handleChapterNavigation('next'));
prevChapterButton.addEventListener('click', () => handleChapterNavigation('prev'));