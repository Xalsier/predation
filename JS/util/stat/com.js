function updateCommentCount() {
    fetch('https://api.predation.jp/count')
        .then(response => response.json())
        .then(data => {
            document.getElementById('comment-count').textContent = data.totalComments;
        })
        .catch(error => console.error('Error fetching comment count:', error));
}
updateCommentCount();
