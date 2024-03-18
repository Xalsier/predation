import { sortScenario, searchScenarios, handleKeydown} from '../util/gal/utility.js'; // Adjust the path as necessary
import { createPostModal} from '../util/gal/gazo.js'; // Adjust the path as necessary
import { createRecipeModal} from '../util/gal/recipe.js'; // Adjust the path as necessary
import { convertMarkdownToHtml } from '../util/gal/utility.js'; // Adjust the path as necessary
export let activePawprints = []
export let pawprints = {}
export let archive = {}
export let errorLogs = [];
let galleryFeed = $('.gallery-feed'); 
let searchBar = $('.search-bar');
let metahashContainer = $('.metahash-container');
let debounceTimeout;
$.getJSON('../JSON/pawprints.json').done(data => {
    pawprints = data;
});
$.getJSON('../JSON/archive.json').done(data => {
    let dataArray = Object.entries(data).map(([id, item]) => {
        item.id = id; // ID is now directly from the worker
        if (item.time === null) {
            item.time = '01-01-2023'; // Set arbitrary date
            item.displayTime = 'Unknown Date'; // New field for display
        } else {
            item.displayTime = item.time; // Use existing date
        }
        return item;
    });
    archive = Object.fromEntries(dataArray.map(item => [item.id, item]));
});
$('.title-container').on('click', async function(event) {
    let mostRecentChapter = '';
    let currentLang = $('#language-select').val();
    let latestDate = new Date(0); // Initialize with an old date
    Object.entries(pawprints).forEach(([key, data]) => {
        if (key.includes("Episode") && data.class && data.class.includes('Manga') && data.created) {
            let [day, month, year] = data.created.split('-');
            let chapterDate = new Date(`${year}-${month}-${day}`);
            console.log("Found Episode:", key, "with date:", chapterDate);
            if (chapterDate > latestDate) {
                latestDate = chapterDate;
                mostRecentChapter = key;
            }
        }
    });
    addMetaHash('Recent');
    if (mostRecentChapter) {
        addMetaHash(mostRecentChapter);
    }
    if (currentLang === 'ja') {
        addMetaHash('JA');
    } else {
        addMetaHash('EN');
    }
});
$('.hunt, #return-button').click(function() {
    if ($(this).is('#return-button')) {
        if ($('.reader-modal').is(':visible')) {
            $('.reader-modal').hide();
        }            
        $('.gallery-container').fadeOut(function() {
            $('.search-area').fadeIn();
        });
    } else {
        let meaningfulFilters = activePawprints.filter(p => !['Recent', 'Oldest', 'Hot Sort', 'Cold Sort'].includes(p));
        if (meaningfulFilters.length === 0) {
            // Create a container div for the message
            let messageContainer = $('<div></div>').css({
                'position': 'fixed', // Use fixed to keep it in the viewport
                'top': '0',
                'left': '0',
                'z-index': '300000',
                'width': '100%', // Full width
                'height': '100%', // Full height
                'display': 'flex',
                'align-items': 'center', // Center vertically
                'justify-content': 'center', // Center horizontally
                'backgroundColor': 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
                'z-index': '1000' // Ensure it's above other content
              }).hide().fadeIn(500);
          
            // Create the message element
            let message = $('<strong>Failed hunt, predator did not know what they were hunting.</strong>').css({
              'color': '#0D1017',
              'z-index': '300010',
              'text-shadow': '-0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #fff',
              'background-color': 'gray', // Background color for the message
              'padding': '20px', // Padding around the text
              'border-radius': '5px', // Optional: Rounded corners for the message background
              'width': '60%', // Width of the message background
              'text-align': 'center' // Center the text inside the message background
            });
          
            // Append the message to the container
            messageContainer.append(message);
          
            // Append the container to the body or a specific element
            $('body').prepend(messageContainer);
          
            // Set timeout to fade out the message container after 5 seconds
            setTimeout(() => {
                messageContainer.fadeOut(500, function() {
                    $(this).remove(); // Remove the container after fading out
                });
            }, 3000);
          
            return; // Exit the function
          }
          
        let archiveArray = Object.values(archive);
        let errorCode = -1;
        let containsChapter = activePawprints.some(pawprint => pawprint.includes("Episode"));
        let sortedArchive = applySortIfNecessary(archive, activePawprints);
        console.log("sortedArchive length:", sortedArchive.length);
        if (sortedArchive.length === 0) {
            errorCode = 0;
        } else if (archiveArray.some(post => !post.urls || post.urls.length === 0 || post.urls.some(url => url === ''))) {
            errorCode = 20;
        }
        if (containsChapter) {
            errorCode = 80;
        }
        displayGallery();
        searchScenarios(errorCode);
    }
});
    function applySortIfNecessary(archive, activePawprints) {
        let sortType = activePawprints.find(p => pawprints[p] && pawprints[p].class.includes('Time'));
        if (sortType) {
            return Object.entries(archive).sort((a, b) => {
                switch (sortType) {
                    case 'Recent':
                        return new Date(b[1].time) - new Date(a[1].time);
                    case 'Oldest':
                        return new Date(a[1].time) - new Date(b[1].time);
                    default:
                        return 0;
                }
            }).map(entry => entry[1]);       }
        return Object.values(archive);
    }
    function findClassForTag(tag) {
        if (pawprints[tag] && pawprints[tag].class) {
            return pawprints[tag].class[0];
        }
        return 'undefined';
    }
    function getSuggestions(input) {
        input = input.toLowerCase();
        let suggestions = [];
        for (const [key, value] of Object.entries(pawprints)) {
            if (value.relatedprint.some(rp => rp.toLowerCase().startsWith(input))) {
                suggestions.push(key);
            } else if (key.toLowerCase().startsWith(input)) {
                suggestions.push(key);
            }
        }
        if (suggestions.length === 0) {
            suggestions.push(input);
        }
    
        return suggestions;
    }
    function addMetaHash(tagDisplay) {
        let currentLang = $('#language-select').val();
        let tagName = tagDisplay;
        if (currentLang === 'ja') {
            for (const [key, value] of Object.entries(pawprints)) {
                if (value.langlib.includes(tagDisplay)) {
                    tagName = key;
                    break;
                }
            }
        }
        let index = activePawprints.indexOf(tagName);
        if (index === -1) {
            activePawprints.push(tagName);
            let className = findClassForTag(tagName);
            let newMetaHash = $(`<div class="metahash animate-fade-in-scale ${className}">${tagDisplay}</div>`);
            newMetaHash.appendTo(metahashContainer).on('click', function() {
                $(this).addClass('animate-fade-out-scale');
                let element = $(this);
                setTimeout(function() {
                    element.remove();
                    addMetaHash(tagDisplay); // Pass tagDisplay for visual consistency
                }, 600);
            });
        } else {
            console.error("Error: MetaHash already added.");
        }
    }    
    function displaySuggestions(suggestions) {
        $('.suggestion-tag').remove();
        let currentLang = $('#language-select').val();
        suggestions.slice(0, 3).forEach(suggestion => {
            let className = pawprints[suggestion] ? findClassForTag(suggestion) : 'undefined';
            let suggestionDisplay = suggestion;
            if (currentLang === 'ja' && pawprints[suggestion] && pawprints[suggestion].langlib.length > 0) {
                suggestionDisplay = pawprints[suggestion].langlib[0];
            } else if (currentLang === 'ja' && !pawprints[suggestion]) {
                console.error(`Error: No Japanese content for suggestion ${suggestion}`);
            }
            $(`<div class="metahash ${className} suggestion-tag" style="opacity: 0.5;">${suggestionDisplay}</div>`)
                .appendTo(metahashContainer)
                .on('click', function(event) {
                    event.stopPropagation();
                    searchBar.val('');
                    addMetaHash($(this).text());
                    $(this).remove();
                });
        });
    }
    export function createMetaHashElements(post, pawprints) {
        const renderDefaultMetaHash = (tag, className, display) => `<div class="metahash ${className}">${display}</div>`;
        let currentLang = $('#language-select').val();
        if (!Array.isArray(post.pawprints)) {
            return '';
        }
        return post.pawprints
            .filter(pawprint => pawprints[pawprint] && !pawprints[pawprint].class.includes("Artist"))
            .map(pawprint => {
                let className = pawprints[pawprint].class.join(' ');
                let display = pawprint;
                if (currentLang === 'ja' && pawprints[pawprint].langlib.length > 0) {
                    display = pawprints[pawprint].langlib[0];
                } else if (currentLang === 'ja') {
                    console.error(`Error: No Japanese content for pawprint ${pawprint}`);
                }
                return renderDefaultMetaHash(pawprint, className, display);
            })
            .join('');
    }
    function displayGallery() {
    let meaningfulFilters = activePawprints.filter(p => !['Recent', 'Oldest', 'Hot Sort', 'Cold Sort'].includes(p));
    if (meaningfulFilters.length === 0) {
        console.log("No filters applied, skipping gallery display.");
        return; // Exit the function if no meaningful filters are present
    }

    galleryFeed.empty();
    let currentLang = $('#language-select').val();
    let sortedArchive = applySortIfNecessary({ ...archive }, activePawprints);
    let filterTags = meaningfulFilters; // Use the meaningful filters here        
        Object.entries(sortedArchive).forEach(([postId, post], index) => {
            let imageUrl;
            if (currentLang === 'ja' && post.jaurls && post.jaurls.length > 0) {
                imageUrl = post.jaurls[0];
            } else if (currentLang === 'en' && post.enurls && post.enurls.length > 0) {
                imageUrl = post.enurls[0];
            } else {
                imageUrl = post.urls[0];
            }
            let matchesFilter = filterTags.every(pawprint => {
                if (currentLang === 'ja') {
                    let keyForPawprint = Object.keys(pawprints).find(key => pawprints[key].langlib.includes(pawprint));
                    return post.pawprints.includes(keyForPawprint || pawprint);
                } else {
                    return post.pawprints.includes(pawprint);
                }
            });
            if (matchesFilter) {
                let $post = $(`<div class="post" style="background-image: url('placeholder.jpg');" data-src="${imageUrl}"></div>`).appendTo(galleryFeed);
                
                if (post.type === "lore") {
                    fetch(post.recipemarkdown)
                        .then(response => response.text())
                        .then(markdown => {
                            let htmlContent = convertMarkdownToHtml(markdown);
                            $post.html(htmlContent);
                        })
                        .catch(error => {
                            console.error('Error loading markdown content:', error);
                        });
                }
                $post.on('click', function () {
                    var newPostId = parseInt(postId) + 1;
                    postClick(newPostId);
                });
            }
            lazyLoadImages(); // Call this at the end
        });
    }
    function lazyLoadImages() {
        const images = document.querySelectorAll('.post[data-src]');
        const imageObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.backgroundImage = `url(${img.getAttribute('data-src')})`;
                    imgObserver.unobserve(img);
                }
            });
        });
        images.forEach((img) => {
            imageObserver.observe(img);
        });
    }
    export function postClick(postId) {
        console.log("postClick called with postId:", postId);
        let post = archive[postId];
        if (post) {
            if (post.type === "gazo" || post.type === "manga") {
                let $modal = createPostModal(post);
                console.log("Modal created for gazo/manga:", $modal);
                $('body').append($modal);
                $modal.show();
            } else if (post.type === "lore") {
                let $modal = createRecipeModal(post);
                console.log("Modal created for lore:", $modal);
                $('body').append($modal);
                $modal.show();
            }
        }
    };   
    window.postClick = postClick;
searchBar.on('input', function() {
    clearTimeout(debounceTimeout); // Clear existing timeout
    debounceTimeout = setTimeout(() => {
        displaySuggestions(getSuggestions($(this).val()));
    }, 300); // 300ms delay
}).on('keydown', handleKeydown);