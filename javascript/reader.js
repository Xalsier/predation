import { activePawprints, pawprints, archive } from '../Javascript/search.js';
let isExpanded = $('#reader').hasClass('expanded');
export function toggleReader() {
    let $reader = $('#reader');
    isExpanded = !isExpanded;
    if (isExpanded) {
        $reader.addClass('expanded').removeClass('collapsed');
        $('#readerContent').css('overflow-y', 'auto'); // Enable vertical scrolling when expanded
        loadImages(); // Load images when the reader is expanded
    } else {
        $reader.addClass('collapsed').removeClass('expanded');
        $('#readerContent').css('overflow-y', 'hidden'); // Disable scrolling when collapsed
        setTimeout(() => $reader.removeClass('collapsed'), 1000);
    }
}
function loadImages() {
    let currentLang;
    try {
        currentLang = $('#language-select').val();
    } catch (error) {
        console.error('Error getting selected language:', error);
        currentLang = 'default'; // Fallback to default if language selection fails
    }
    $('#readerContent').empty(); // Clear existing content

    let activeSetPawprint = activePawprints.find(p => pawprints[p] && pawprints[p].set);
    if (activeSetPawprint) {
        let sets = pawprints[activeSetPawprint].set;
        let setIds = currentLang === 'ja' ? sets[1] : sets[0]; // Choose set based on language
        
        setIds.forEach(id => {
            let post = archive[id];
            if (post) {
                let imageUrl;
                if (currentLang === 'ja' && post.jaurls && post.jaurls.length > 0) {
                    imageUrl = post.jaurls[0];
                } else if (currentLang === 'en' && post.enurls && post.enurls.length > 0) {
                    imageUrl = post.enurls[0];
                } else if (post.urls && post.urls.length > 0) {
                    imageUrl = post.urls[0]; // Fallback to general URL
                }

                if (imageUrl) {
                    $('<img>', {
                        src: imageUrl,
                        class: 'comic-page',
                        css: { width: '100%', display: 'block' }
                    }).appendTo('#readerContent');
                }
            }
        });
    } else {
        console.error('No active pawprint with a set found.');
    }
}

$('.reader-header').click(function() {
    toggleReader();
});
$('#language-select').change(function() {
    if (isExpanded) {
        loadImages(); // Reload images if language changes when expanded
    }
});