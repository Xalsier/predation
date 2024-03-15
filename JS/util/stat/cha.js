import { webnovel } from '../../dat/novDat.js';
function updateChapterCount() {
    const chapters = webnovel.chapters;
    document.getElementById('chapter-count').textContent = chapters.length;
}
updateChapterCount();