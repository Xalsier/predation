import { lastUpdated } from '../dat/update.js';
import { webnovel } from '../dat/novDat.js';
let chapters = []; // Declare the chapters array globally
$(document).ready(function() {
    let commentsVisible = false;
    const authorNoteSelector = '.author_note';
    const chapterContentSelector = '.chapter_content';
    const commentsSelector = '.comment-section';
    const showCommentsSelector = '.show-comments';
    const chapterArtSelector = '#chapter_art';
    window.currentLanguageIndex = 'en'; // Default to English ('en' = English, 'ja' = Japanese, 'ko' = Korean)
    window.currentChapter = 1; // This is correctly set to a chapter number directly.
    chapters = webnovel.chapters; 
    window.renderChapter = renderChapter;
    $('#language-select').change(function() {
        const langMap = {en: 'en', ja: 'ja', ko: 'ko', es: 'es'};
        window.currentLanguageIndex = langMap[$(this).val()];
        console.log(window.currentChapter);
        if (chapters.length > 0) { // Check if chapters are loaded
            renderChapter(window.currentChapter);
        } else {
            console.error('Chapters not yet loaded!');
        }
    });

    function fetchAndRender(path, selector) {
        if ($(selector).length > 0) {
            fetch(path)
                .then(response => response.text())
                .then(text => {
                    const renderedHtml = simpleMarkdownParse(text);
                    $(selector).html(renderedHtml);
                })
                .catch(error => console.error(`Error loading content from: ${path}`, error));
        }
    }
    
    function simpleMarkdownParse(text) {
        let html = text;
        html = html.replace(/\n/g, '<br/>'); 
        html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        return html;
    }
    
    function renderChapter(chapterNumber) {
        console.log(window.currentChapter); 
        window.currentChapter = chapterNumber; 
        const languageKey = currentLanguageIndex; 
    
        const chapter = chapters.find(chap => chap.chapter === chapterNumber); 
        console.log(chapter); 

        if (chapter) { 
            // Author Note
            const originalAuthorNotePath = chapter.authorNotePath[languageKey][0]; 
            console.log("Fetching author note:", originalAuthorNotePath);
            fetchAndRender(originalAuthorNotePath, authorNoteSelector);
    
            // Chapter Content
            const originalChapterContentPath = chapter.chapterContentPath[languageKey][0]; 
            console.log("Fetching chapter content:", originalChapterContentPath);
            fetchAndRender(originalChapterContentPath, chapterContentSelector);
    
            // Image Handling 
            const chapterArt = chapter.chapter_art;
            if (chapterArt && chapterArt.length > 0) {
                const artPath = chapterArt[0][0]; // Extract the first element of the first array element
                const alternatePath = `https://predation.jp/${artPath.replace('../', '')}`;

                $(chapterArtSelector).attr('src', alternatePath).attr('alt', chapterArt[1]);
                $('.actual_credit').text(chapterArt[0][2]); 
            }
        } else {
            console.error('Chapter not found:', chapterNumber); 
        }
    
        updateNavButtons();
    }
    
    
    
    async function fetchAndRender(path, selector) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const alternatePath = `https://predation.jp/${path.replace('../', '')}`;
                const alternateResponse = await fetch(alternatePath);
                if (!alternateResponse.ok) { 
                    throw new Error(`Failed to load content from both locations: ${path} and ${alternatePath}`);
                }
    
                // Attempt to fetch as text (in case it's misconfigured)
                const text = await alternateResponse.text(); 
                const renderedHtml = simpleMarkdownParse(text);
                $(selector).html(renderedHtml); 
            }
        } catch (error) {
            // Handle the error 
            console.error(`Error loading content from both locations: ${path}`, error); 
            // Consider setting a default image or showing an error message
        }
    }
    
    

    function updateChapterCount() {
        const chapters = webnovel.chapters; 
        $('#chapter-count').text(chapters.length);
    }

    function updateSrcFilesCount() {
        const chapters = webnovel.chapters; 
        let srcFilesCount = 0;
        chapters.forEach(chapter => {
            // Count author note paths
            Object.keys(chapter.authorNotePath).forEach(lang => {
                srcFilesCount += chapter.authorNotePath[lang].length;
            });
            // Count chapter content paths
            Object.keys(chapter.chapterContentPath).forEach(lang => {
                srcFilesCount += chapter.chapterContentPath[lang].length;
            });
        });
        $('#edit-count').text(srcFilesCount); // Update the src files count display
    }
    
    
    function updateCommentCount() {
        fetch('https://api.predation.jp/count')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                $('#comment-count').text(data.totalComments); // Update the comments count display
            })
            .catch(error => console.error('Error fetching comment count:', error));
    }
    
    function logSrcFilesCount(chapters) {
        let srcFilesCount = 0;
        chapters.forEach(chapter => {
            // Count author note paths
            Object.keys(chapter.authorNotePath).forEach(lang => {
                srcFilesCount += chapter.authorNotePath[lang].length;
            });
            // Count chapter content paths
            Object.keys(chapter.chapterContentPath).forEach(lang => {
                srcFilesCount += chapter.chapterContentPath[lang].length;
            });
        });
        console.log(`Total number of src files: ${srcFilesCount}`);
    }
    
    function refreshChapter() { 
        const chapters = webnovel.chapters; // Access data from the 'webnovel' constant
        const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
        console.log("Test");
        console.log(currentChapter.chapter);
        if(currentChapter) renderChapter(currentChapter.chapter); 
        logSrcFilesCount(chapters); 
    }
    window.refreshChapter = refreshChapter;
    updateSrcFilesCount();
    updateChapterCount();
    window.updateCommentCount = updateCommentCount;
    $(document).on("click", showCommentsSelector, function() {
        $(commentsSelector).css('display', commentsVisible ? 'none' : 'flex');
        commentsVisible = !commentsVisible;
        $(this).text(commentsVisible ? "Hide Comments" : "Show Comments");
    });

    $('#next-chapter').click(function() {
        const chapters = webnovel.chapters; // Access data from the 'webnovel' constant
        console.log('Chapters length:', chapters.length);
    
        const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
        console.log('Current Chapter:', currentChapter);
    
        if (currentChapter && currentChapter.chapter < chapters.length) {
            window.currentChapter++;
            window.refreshChapter();
            window.refreshComments(); 
        } else {
            console.error('Cannot move to next chapter!');
        }
    });
    
    
    // Add click event for the "Prev Chapter" button
    $('#prev-chapter').click(function() {
        const chapters = webnovel.chapters; 
        console.log('Chapters length:', chapters.length);
    
        const currentChapter = chapters.find(chap => chap.chapter === window.currentChapter);
        console.log('Current Chapter:', currentChapter);
    
        if (currentChapter && currentChapter.chapter > 1) { // Check if greater than 1
            window.currentChapter--;
            window.refreshChapter();
            window.refreshComments(); 
        } else {
            console.error('Cannot move to previous chapter!');
        }
    });
});

function updateLastUpdated() {
    const lastUpdatedDate = new Date(lastUpdated);
    const now = new Date();
    const diffInHours = Math.abs(now - lastUpdatedDate) / 36e5; // Convert milliseconds to hours

    let message;
    if (diffInHours < 24) {
        message = `${Math.round(diffInHours)} hr ago`;
    } else if (diffInHours < 24 * 30) {
        const days = Math.round(diffInHours / 24);
        message = `${days} night${days > 1 ? 's' : ''} ago`;
    } else {
        const moons = Math.round(diffInHours / (24 * 30));
        message = `${moons} moon${moons > 1 ? 's' : ''} ago`;
    }

    document.querySelector('#last-updated').textContent = message;
}
window.updateLastUpdated = updateLastUpdated;
function updateNavButtons() {
    const currentIndex = chapters.findIndex(chap => chap.chapter === window.currentChapter);
    const hasNextChapter = currentIndex < chapters.length - 1;
    const hasPrevChapter = currentIndex > 0;

    $('#next-chapter').toggleClass('available', hasNextChapter);
    $('#prev-chapter').toggleClass('available', hasPrevChapter);
}