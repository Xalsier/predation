import { archive } from '../Javascript/search.js';

$(document).ready(function() {
    console.log("Document is ready. Checking for post ID...");

    function Ping() {
        const path = window.location.pathname;
        const segments = path.split('/');
        let lastSegment = segments.pop() || segments.pop();
        if (lastSegment.match(/^\d+\.html$/)) {
            return parseInt(lastSegment.split('.')[0], 10);
        }
        return lastSegment;
    }

    function fetchAndUpdateArchive(postId) {
        console.log("Fetching archive data...");
        fetch('../json/archive.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                Object.assign(archive, data);
                if (archive[postId]) {
                    window.postClick(postId);
                } else {
                    console.error("Post not found after fetching. Post ID:", postId);
                }
            })
            .catch(error => console.error("Error fetching archive data:", error));
    }

    function handlePostClick(postId) {
        if (archive[postId]) {
            window.postClick(postId);
        } else {
            fetchAndUpdateArchive(postId);
        }
    }

    const postId = Ping();
    window.Ping = Ping;
    handlePostClick(postId);
    console.log("Current Post ID:", window.Ping());
});

document.getElementById('return-button').addEventListener('click', function() {
    window.location.href = '../index.html';
});
