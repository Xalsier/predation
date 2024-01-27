document.addEventListener('DOMContentLoaded', function () {
    const backgroundImg = document.querySelector('#background img');
    const logoImg = document.querySelector('.logo-image');

    // Function to update the src of an image based on srcset and sizes
    function updateImageSrc(image) {
        const srcset = image.getAttribute('srcset').split(', ');
        const sizes = image.getAttribute('sizes').split(', ');
        
        let chosenSrc = '';
        srcset.forEach(src => {
            const [url, width] = src.split(' ');
            sizes.forEach(size => {
                if (window.matchMedia(`(max-width: ${size.split(' ')[0]})`).matches) {
                    chosenSrc = url;
                }
            });
        });

        // If a larger image is found based on viewport, update the src
        if (chosenSrc && image.src !== chosenSrc) {
            image.src = chosenSrc;
        }
    }

    // Call the function for each image
    updateImageSrc(backgroundImg);
    updateImageSrc(logoImg);

    // Optional: Add event listener for window resize to update images
    window.addEventListener('resize', () => {
        updateImageSrc(backgroundImg);
        updateImageSrc(logoImg);
    });
});
