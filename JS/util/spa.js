function showLogo() {
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    document.querySelectorAll('.privacy, .awa, #site_credits, .aperture, .calendar-container, .summary_card, .novel_nav, .art-and-note-container, .chapter_content, .comment_section').forEach(el => el.style.display = 'none');
}
function showWebnovel() {
    refreshChapter();
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelectorAll('.novel_nav, .chapter_content, .comment_section').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.summary_card, .art-and-note-container').forEach(el => el.style.display = 'flex');
    document.querySelector('.calendar-container').style.display = 'none';
}
function showCalendar() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('.calendar-container').style.display = 'block';
}
function showHunt() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('.awa').style.display = 'flex';
}
function showCredits () {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('site_credits').style.display = 'flex';
}
function showFAQ() {
    window.location.href = "FAQ.html";
}
function showPrivacy() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('.privacy').style.display = 'flex';
}

// Misc Util Functions for Chapter
function updateElementAttributes(element, src, alt, placeholderSrc = "../../assets/larch.png") {
    if (element) {
        element.setAttribute('src', placeholderSrc);
        element.setAttribute('alt', alt); // Still set alt for accessibility
        const img = new Image();
        img.src = src;
        img.onload = () => {
          element.src = src; // Replace placeholder when real image loads
        };
        img.onerror = () => {
            console.log('Image failed to load.');
        };
    }
}

