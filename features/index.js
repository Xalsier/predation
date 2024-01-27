$(document).ready(function() {
    let comments = []; // This will hold the fetched comments
    const userId = 1;
    let commentsPerPage = 5;
    let currentPage = 1;
    let preyData = {};

    $.getJSON('https://predation.jp/json/archive.json', function(data) {
        preyData = {};
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key].urls) {
                preyData[key] = data[key].urls;
            }
        }
        console.log("Prey Data:", preyData); // Debugging line
    });
    

    const fetchComments = () => {
        const postId = window.Ping(); // Get the current post ID
        fetch(`https://api.predation.jp?postId=${postId}`)
            .then(response => response.json())
            .then(fetchedComments => {
                comments = fetchedComments; // Update comments with fetched data
                updatePagination();
                loadCommentsForPage(currentPage);
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const addComment = (animal, comment, preyId) => {
        const postId = window.Ping(); // Get the current post ID
        const postData = { animal, comment, userId, preyId, postId };
        fetch('https://api.predation.jp', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            fetchComments(); // Refresh comments after adding a new one
        });
    };

    const displayComment = ({ animal, comment, preyId }) => {
        console.log(`Displaying comment for preyId: ${preyId}`); // Debugging line
    
        const defaultImageUrl = '../egg.png'; // Fallback image
        let preyUrl = preyData[preyId] && preyData[preyId].length > 0 ? preyData[preyId][0] : defaultImageUrl;
    
        console.log(`Using URL: ${preyUrl}`); // Debugging line
    
        const newComment = $(`
            <div class="comment">
                <div class="comment-image" style="background-image: url('${preyUrl}');"></div>
                <div class="comment-text">
                    <strong>${animal} ${userId}</strong>
                    <p>${comment}</p>
                </div>
            </div>
        `);
        $('#comments').append(newComment);
        newComment.fadeIn(500);
    };
    
    

    const updatePagination = () => {
        const totalPages = Math.ceil(comments.length / commentsPerPage);
        $('#pagination').empty();

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = $(`<button>${i}</button>`);
            pageButton.click(() => loadCommentsForPage(i));
            $('#pagination').append(pageButton);
        }
    };

    const loadCommentsForPage = (page) => {
        currentPage = page;
        const start = (page - 1) * commentsPerPage;
        const end = start + commentsPerPage;

        $('#comments').empty();
        comments.slice(start, end).forEach(comment => {
            displayComment(comment);
        });
    };

    $('#toggle-comments').click(function() {
        $('#comments, #pagination, #comment, #post-comment, #prey, #animal').toggle();
        $(this).text($('#comments').is(':visible') ? 'Hide Comments' : 'Show Comments');
    });

    $('#post-comment').click(function(event) {
        event.preventDefault();
        const animal = $('#animal').val();
        const comment = $('#comment').val();
        const preyId = $('#prey').val();
        if (animal && comment) {
            addComment(animal, comment, preyId);
            $('#comment').val('');
            $('#prey').val('');
        }
    });

    // Initial fetch of comments
    fetchComments();
});
