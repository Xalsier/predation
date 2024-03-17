import { webnovel } from '../../dat/novDat.js';
let chapters = webnovel.chapters;
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
updateLastUpdated();