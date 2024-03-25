import { webnovel } from '../../dat/novDat.js';
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
