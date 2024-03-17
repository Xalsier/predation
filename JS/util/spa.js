document.getElementById('LogoBTN').addEventListener('click', function() {
    document.querySelector('nav').style.display = 'flex';
    document.getElementById('modal-overlay').style.display = 'flex';
    const header = document.querySelector('header'); 
    document.getElementById('modal-overlay').appendChild(header);
    const footer = document.querySelector('footer'); 
    document.getElementById('modal-overlay').appendChild(footer);
    document.querySelector('.footer-content').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.querySelectorAll('.summary_card, .novel_nav, .art-and-note-container, .chapter_content, .comment_section').forEach(el => el.style.display = 'none');
    document.querySelector('.calendar-container').style.display = 'none';
    document.querySelector('footer').style.display = 'flex';
});

function showWebnovel() {
    document.querySelector('nav').style.display = 'none';
    const header = document.querySelector('header');
    document.getElementById('main-content').prepend(header);
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelectorAll('.summary_card, .novel_nav, .chapter_content, .comment_section').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.art-and-note-container').forEach(el => el.style.display = 'flex');
    document.querySelector('.calendar-container').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
}

function showCalendar() {
    document.querySelector('nav').style.display = 'none';
    const header = document.querySelector('header');
    document.getElementById('main-content').prepend(header);
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('.calendar-container').style.display = 'block';
    document.querySelector('footer').style.display = 'none';
}

document.getElementById('WebnovelBTN').addEventListener('click', showWebnovel);
document.getElementById('CalendarBTN').addEventListener('click', showCalendar);