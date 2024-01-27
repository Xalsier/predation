import { createMetaHashElements, pawprints} from '../Javascript/search.js';

export function createPostModal(post) {
    try {
        let currentLang = $('#language-select').val();
        let $modal = $('<div class="modal" style="display: none;">');
        
        $modal.append(`
            <div class="modal-content">
                <div class="img-container-for-post">
                    <div class="post-img-container">
                        <img src="" alt="Artwork">
                    </div>
                    <div class="post-title">
                        <div class="metahash Title"></div>
                    </div>
                    <div class="credits-and-likes" style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="credit-div">
                            <div class="metahash Credits"></div>
                        </div>
                        <div class="likes-container" style="display: flex; align-items: center;">
                            <button class="like-button" style="background-color: transparent; border: none; cursor: pointer; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center;">
                                &#127810;
                            </button>
                            <span class="like-counter" style="color: white; margin-left: 10px; font-size: 16px; line-height: 25px;">
                                <!-- Dynamic Likes Count Here -->
                            </span>
                        </div>
                    </div>
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
        
        let imageIndex = 0;
        
        function updateImage() {
            let imageUrl;
            if (currentLang === 'ja' && post.jaurls && post.jaurls.length > 0) {
                imageUrl = post.jaurls[imageIndex % post.jaurls.length];
            } else if (currentLang === 'en' && post.enurls && post.enurls.length > 0) {
                imageUrl = post.enurls[imageIndex % post.enurls.length];
            } else {
                imageUrl = post.urls[imageIndex % post.urls.length]; // Fallback to general URL
            }
            $modal.find('.post-img-container img').attr('src', imageUrl);
        }
        
        updateImage();
        
        $modal.find('.post-img-container img').on('click', function() {
            imageIndex++;
            updateImage();
        });
        
        let artistCreditLinks = post.pawprints
        .filter(pawprint => pawprints[pawprint] && pawprints[pawprint].class.includes("Artist"))
        .map(artistName => {
            let artistUrl = pawprints[artistName].redirect;
            return $('<a>').attr('href', artistUrl).text(artistName);
        });
        
        if (artistCreditLinks.length > 0) {
            $modal.find('.metahash.Credits').empty().append(artistCreditLinks);
        } else {
            $modal.find('.metahash.Credits').text('Unknown Artist');
        }
        
        let timeDisplay = post.time === '01-01-2023' ? 'Unknown Date' : post.time;
        $modal.find('.like-counter').text(timeDisplay);
        $modal.find('.metahash.Title').text(post.title);
        $modal.find('.metahash-container').html(createMetaHashElements(post, pawprints));
        
        return $modal;
    } catch (error) {
        console.error("Error in createPostModal:", error);
    }
}

