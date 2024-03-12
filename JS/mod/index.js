
$(document).ready(function() {
    let comments = []; // This will hold the fetched comments
    let commentsPerPage = 5;
    let currentPage = 1;
    const setRandomAnimal = async () => { // Make it an async function
        const { animalList } = await import('../dat/animalList.js'); // Load only when needed
        const languageArray = animalList[window.currentLanguageIndex];        const randomIndex = Math.floor(Math.random() * languageArray.length);
        const randomAnimal = languageArray[randomIndex];
        $('#animal').val(randomAnimal);
    };
    
    window.setRandomAnimal = setRandomAnimal;
    window.refreshComments = function() {
        $('#comments').empty(); // Clear existing comments
        fetchComments(); // Fetch and display new comments
    };
    // Update on language change
    $('#language-select').change(function() {
        window.currentLanguageIndex = $(this).val();
        setRandomAnimal();
    });
    const userId = 1; // Assuming this is the temporary fix you mentioned
    const fetchComments = () => {
        let postId = window.currentChapter; // Parse chapter number for postId
        console.log("Fetching comments for postId:", postId); // Debugging line
        if (!postId) {
            console.error('Chapter number is invalid or not set');
            return;
        }
        if (!postId || (typeof postId === 'object' && postId.chapter !== undefined)) {
            if (typeof postId === 'object' && postId.chapter !== undefined) {
                postId = postId.chapter; // Use the chapter property if postId is an object
            } else {
                console.error('Chapter number is invalid or not set');
                return;
            }
        }
        fetch(`https://api.predation.jp?postId=${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(fetchedComments => {
                console.log("Fetched comments:", fetchedComments); // Debugging line
                comments = fetchedComments;
                updatePagination();
                loadCommentsForPage(currentPage);
            })
            .catch(error => console.error('Error fetching comments:', error));
    };
    

    const addComment = (animal, comment, preyId) => {
        let postId = window.currentChapter; // Parse chapter number for postId
        console.log(postId);
        if (!postId) {
            console.error('Chapter number is invalid or not set');
            return;
        }
        if (!postId || (typeof postId === 'object' && postId.chapter !== undefined)) {
            if (typeof postId === 'object' && postId.chapter !== undefined) {
                postId = postId.chapter; // Use the chapter property if postId is an object
            } else {
                console.error('Chapter number is invalid or not set');
                return;
            }
        }
        const postData = { animal, comment, userId, preyId, postId}; // Assuming getChapterNumber() returns the correct postId
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

    const displayComment = ({ animal, comment, userId }) => { // Include userId in the function parameters
        // Use the passed `userId` for each comment
        const newComment = $(`
            <div class="comment">
                <div class="comment-text">
                    <strong style="margin-right: 5px;">${animal} ${userId}</strong> <!-- Dynamic userId used here -->
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

    $('#post-comment').click(function(event) {
        event.preventDefault();
        const animal = $('#animal').val();
        const comment = $('#comment').val();
        // Removed preyId since it's not needed for the comment anymore
        if (animal && comment) {
            addComment(animal, comment);
            $('#comment').val('');
        }
    });
    window.fetchComments = fetchComments;
});
