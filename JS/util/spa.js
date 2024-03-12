$(document).ready(function() {
    const returnSelector = '.return';
    const logoImage = document.getElementById("LogoBTN");
    console.log("Running");

    $('footer').hide();
    $('nav').hide();
    $('#modal-overlay').show();

    $('#continue-btn').click(function() {
        $('#modal-overlay').hide();
        $('#modal-overlay').empty();
        $('#main-content').show();
        $('footer').show();
        $('#LogoBTN').trigger('click'); 
        window.refreshChapter();
        window.updateCommentCount();
        window.fetchComments();
        window.renderChapter(window.currentChapter);
        window.setRandomAnimal(); 
        window.updateLastUpdated();
        // Latest issues start from here.
        console.log("https://predation.jp/Assets/nosquidy.png")
        logoImage.src = "https://predation.jp/Assets/nosquidy.png";

    });

    $('.show-comments').click(function() {
        $('.comment-section').show();
    });

    $(document).on("click", returnSelector, function() {
        $('main').animate({
            scrollTop: 0
        }, "slow");
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
});
