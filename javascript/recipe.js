import { createMetaHashElements, pawprints} from '../Javascript/search.js';
import { convertMarkdownToHtml} from './utility.js'; // Adjust the path as necessary

export function createRecipeModal(post) {
    let currentLang = $('#language-select').val();
    let $modal = $('<div class="modal" style="display: none;">');

    $modal.append(`
        <div class="modal-content">
            <div class="recipe-description">
                <p></p>
            </div>
            <div class="metahash-container"></div>
            <br>
            <div id="comment-section">
            <div id="input-section">
                <textarea id="comment" placeholder="Comment" required></textarea>
                <div class="fields">
                    <input type="text" id="animal" placeholder="Animal" required>
                    <input type="text" id="prey" placeholder="Prey ID">
                    <button id="post-comment">Post</button>
                    <button id="toggle-comments">Hide Comments</button>
                </div>
            </div>
            <div id="pagination"></div>
            <div id="comments"></div>
            <script src="../features/index.js"></script>
        </div>
    `);

    let imageUrl = currentLang === 'ja' && post.jaurls && post.jaurls.length > 0 ? post.jaurls[0] :
                   currentLang === 'en' && post.enurls && post.enurls.length > 0 ? post.enurls[0] :
                   post.urls[0]; // Fallback to general URL
    $modal.find('.recipe-img-container img').attr('src', imageUrl).css({
        'width': '25%',
        'height': 'auto' // Maintain aspect ratio
    });

    let markdownUrl = post.recipemarkdown;
    fetch(markdownUrl)
        .then(response => response.text())
        .then(markdown => {
            let htmlContent = convertMarkdownToHtml(markdown);
            $modal.find('.recipe-description').html(htmlContent);
        })
        .catch(error => console.error('Error loading markdown content:', error));

    $modal.find('.metahash-container').html(createMetaHashElements(post, pawprints));



    return $modal;
}
