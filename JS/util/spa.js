function showLogo() {
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    document.querySelectorAll('#site_credits, .aperture, .calendar-container, .summary_card, .novel_nav, .art-and-note-container, .chapter_content, .comment_section').forEach(el => el.style.display = 'none');
}
function showWebnovel() {
    refreshChapter();
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelectorAll('.summary_card, .novel_nav, .chapter_content, .comment_section').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.art-and-note-container').forEach(el => el.style.display = 'flex');
    document.querySelector('.calendar-container').style.display = 'none';
}
function showCalendar() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('.calendar-container').style.display = 'block';
}
function showCredits () {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('site_credits').style.display = 'flex';
}