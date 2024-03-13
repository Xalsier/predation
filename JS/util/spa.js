console.log("Running");
$('#continue-btn').click(function() {
    $('#modal-overlay').empty();
    $('#modal-overlay').hide();
    $('#main-content').show();
    $('footer').show();
    $('#LogoBTN').trigger('click'); 
    // window.refreshChapter();
    window.updateCommentCount();
    window.updateLastUpdated();
});

$('.show-comments').click(function() {
    window.setRandomAnimal(); 
    window.fetchComments();
    $('.comment-section').show();
});

$('#LogoBTN').click(function() {
    $('nav').show();
    $('#modal-overlay').show();

    // Move header inside #modal-overlay
    const header = $('header').detach(); // Detach to preserve data/events
    $('#modal-overlay').append(header);
    const footer = $('footer').detach(); // Detach to preserve data/events
    $('#modal-overlay').append(footer);
    // Setup
    $('#main-content').hide();
    // Webnovel
    $('.summary_card').hide();
    $('.novel_nav').hide();
    $('.art-and-note-container').hide();
    $('.content-wrapper').hide();
    $('.chapter_content').hide();
    $('.comment_section').hide();
    // Calendar
    $('.calendar-container').hide();
    // Footer
    $('footer').show();
});

function showWebnovel() {
    $('nav').hide();
    // Move header back to #main-content
    const header = $('header').detach();
    $('#main-content').prepend(header);
    $('#modal-overlay').hide();
    $('#main-content').show();

    $('.summary_card').show();
    $('.novel_nav').show();
    $('.art-and-note-container').show();
    $('.content-wrapper').show();
    $('.chapter_content').show();
    $('.comment_section').show();

    $('.calendar-container').hide();
    $('.twitter-tweet').hide();
    $('footer').hide();
}

function showCalendar() {
    $('nav').hide();
    // Move header back to #main-content
    const header = $('header').detach();
    $('#main-content').prepend(header);
    $('#modal-overlay').hide();
    $('#main-content').show();
    $('.twitter-tweet').show();
    $('.calendar-container').show();
    $('footer').hide();
}

$('#WebnovelBTN').click(showWebnovel);
$('#CalendarBTN').click(showCalendar);