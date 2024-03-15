let comments = [];
let commentsPerPage = 5;
let currentPage = 1;
const userId = 1;
const fetchComments = () => {
    document.getElementById('comments').innerHTML = '';
    let postId = window.currentChapter;
    if (!postId) {
        console.error('Chapter number is invalid or not set');
        return;
    }
    if (!postId || (typeof postId === 'object' && postId.chapter !== undefined)) {
        if (typeof postId === 'object' && postId.chapter !== undefined) {
            postId = postId.chapter;
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
            comments = fetchedComments;
            updatePagination();
            loadCommentsForPage(currentPage);
        })
        .catch(error => console.error('Error fetching comments:', error));
};
const addComment = (animal, comment, preyId) => {
    let postId = window.currentChapter;
    if (!postId) {
        console.error('Chapter number is invalid or not set');
        return;
    }
    if (!postId || (typeof postId === 'object' && postId.chapter !== undefined)) {
        if (typeof postId === 'object' && postId.chapter !== undefined) {
            postId = postId.chapter;
        } else {
            console.error('Chapter number is invalid or not set');
            return;
        }
    }
    const postData = { animal, comment, userId, preyId, postId};
    fetch('https://api.predation.jp', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        fetchComments();
    });
};
const displayComment = ({ animal, comment, userId }) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
        <div class="comment-text">
            <strong style="margin-right: 5px;">${animal} ${userId}</strong>
            <p>${comment}</p>
        </div>
    `;
    document.getElementById('comments').append(commentElement);
    setTimeout(() => commentElement.style.opacity = 1, 500);
};
const updatePagination = () => {
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => loadCommentsForPage(i));
        paginationElement.append(pageButton);
    }
};
const loadCommentsForPage = (page) => {
    currentPage = page;
    const start = (page - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    document.getElementById('comments').innerHTML = '';
    comments.slice(start, end).forEach(comment => {
        displayComment(comment);
    });
};
document.getElementById('post-comment').addEventListener("click", function(event) {
    event.preventDefault();
    const animal = document.getElementById('animal').value;
    const comment = document.getElementById('comment').value;
    if (animal && comment) {
        addComment(animal, comment);
        document.getElementById('comment').value = '';
    }
});
window.fetchComments = fetchComments;