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
    const langMap = {en: 'en', ja: 'ja', ko: 'ko', es: 'es'};
    window.currentLanguageIndex = langMap[this.value];
    renderChapter(window.currentChapter);
    window.updateTranslations(window.currentLanguageIndex);
    window.setRandomAnimal();
});

function simpleMarkdownParse(text) {
    let html = text;
    html = html.replace(/\n/g, '<br/>');
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    return html;
}

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
            document.querySelector('.actual_credit').innerHTML = '<a class="actual_credit" href="' + chapterArt[0][3] + '">' + chapterArt[0][2] + '</a>';
        }
    } else {
        console.error('Chapter not found:', chapterNumber);
    }
}

async function fetchAndRender(path, selector) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load content from: ${path}`);
        }
        const text = await response.text();
        const renderedHtml = simpleMarkdownParse(text);
        document.querySelector(selector).innerHTML = renderedHtml;
    } catch (error) {
        console.error(`Error loading content from: ${path}`, error);
    }
}

function updateChapterCount() {
    const chapters = webnovel.chapters;
    document.getElementById('chapter-count').textContent = chapters.length;
}

function updateSrcFilesCount() {
    const chapters = webnovel.chapters;
    let srcFilesCount = 0;
    chapters.forEach(chapter => {
        Object.keys(chapter.authorNotePath).forEach(lang => {
            srcFilesCount += chapter.authorNotePath[lang].length;
        });
        Object.keys(chapter.chapterContentPath).forEach(lang => {
            srcFilesCount += chapter.chapterContentPath[lang].length;
        });
    });
    document.getElementById('edit-count').textContent = srcFilesCount;
}

function updateCommentCount() {
    fetch('https://api.predation.jp/count')
        .then(response => response.json())
        .then(data => {
            document.getElementById('comment-count').textContent = data.totalComments;
        })
        .catch(error => console.error('Error fetching comment count:', error));
}

function refreshChapter() {
    const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
    if(currentChapter) renderChapter(currentChapter.chapter);
}
window.refreshChapter = refreshChapter;
updateSrcFilesCount();
updateChapterCount();
window.updateCommentCount = updateCommentCount;
document.addEventListener("click", function(event) {
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
        window.refreshComments();
    } else {
        console.error('Current chapter not found!');
    }
    updateNavButtons();
}

function updateLastUpdated() {
    const mostRecentDate = chapters.reduce((acc, chapter) => {
      const date = new Date(chapter.lastEdited);
      return !acc || date > acc ? date : acc;
    }, null);
    const diffInHours = Math.abs(new Date() - mostRecentDate) / 36e5;
    let message = `${Math.round(diffInHours)} hr ago`;
    if (diffInHours >= 24) {
      const days = Math.round(diffInHours / 24);
      message = `${days} night${days > 1 ? 's' : ''} ago`;
      if (diffInHours >= 720) {
        const moons = Math.round(diffInHours / 720);
        message = `${moons} moon${moons > 1 ? 's' : ''} ago`;
      }
    }
    document.getElementById('last-updated').textContent = message;
}  
window.updateLastUpdated = updateLastUpdated;
function updateNavButtons() {
    const currentIndex = chapters.findIndex(chap => chap.chapter === window.currentChapter);
    const hasNextChapter = currentIndex < chapters.length - 1;
    const hasPrevChapter = currentIndex > 0;
    nextChapterButton.classList.toggle('available', hasNextChapter);
    prevChapterButton.classList.toggle('available', hasPrevChapter);
}
nextChapterButton.addEventListener('click', () => handleChapterNavigation('next'));
prevChapterButton.addEventListener('click', () => handleChapterNavigation('prev'));