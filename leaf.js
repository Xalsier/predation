$(document).ready(function() {
    let searchBar = $('.search-bar');
    searchBar.on('keydown', function() {
        let numberOfLeaves = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numberOfLeaves; i++) {
            let leafNumber = Math.floor(Math.random() * 5) + 1;
            let xPos = Math.random() * $(window).width();
            let rotation = Math.random() * 360;
            let hue = Math.random() * 100 + 210;
            let fallDuration = Math.random() * (5000 - 2000) + 2000;
            let opacity = Math.random() * (1 - 0.25) + 0.25;
            let zIndex = Math.floor(Math.random() * 21) - 10; // Random z-index between -10 and 10
            let blurIntensity = Math.random() * 5; // Random blur intensity up to 5px
            let filters = `hue-rotate(${hue}deg)`;
            if (zIndex === -10) { // Apply blur only if z-index is -10
                filters += ` blur(${blurIntensity}px)`;
            }
            let leaf = $(`<img src="../leafs/l${leafNumber}.png" class="falling-leaf">`);
            leaf.css({
                'position': 'fixed',
                'top': '-100px',
                'left': xPos + 'px',
                'transform': 'rotate(' + rotation + 'deg)',
                'filter': filters,
                'opacity': opacity,
                'z-index': zIndex
            });
            $('body').append(leaf);
            leaf.animate({
                top: $(window).height() + 'px',
                opacity: 0
            }, fallDuration, function() {
                leaf.remove();
            });
        }
    });
});