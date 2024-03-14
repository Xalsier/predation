console.log("Running");
document.getElementById('continue-btn').addEventListener('click', async function() {
    const scriptsToLoad = ['../JS/util/langts.js', '../JS/mod/chapter.js', '../JS/mod/index.js'];
    scriptsToLoad.forEach(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        script.type = 'module'; // Mark script as module to support import/export
        document.body.appendChild(script);
    });
    
    // Wait for a brief moment before executing functions dependent on these scripts
    await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay as needed

    if (typeof window.updateCommentCount === 'function') {
        window.updateCommentCount();
    }

    if (typeof window.updateLastUpdated === 'function') {
        window.updateLastUpdated();
    }
    document.getElementById('modal').remove(); // STOP APPEARING 
    document.getElementById('modal-overlay').innerHTML = '';
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    document.getElementById('LogoBTN').click(); 
});


document.querySelectorAll('.show-comments').forEach(item => {
    item.addEventListener('click', function() {
        window.setRandomAnimal(); 
        window.fetchComments();
        document.querySelector('.comment-section').style.display = 'block';
    });
});

document.getElementById('LogoBTN').addEventListener('click', function() {
    document.querySelector('nav').style.display = 'flex';
    document.getElementById('modal-overlay').style.display = 'block';

    // Move header inside #modal-overlay
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