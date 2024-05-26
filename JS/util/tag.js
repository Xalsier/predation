$(document).ready(function() {
    var hoverTime = 3000; // 3 seconds
    var fadeOutTime = 2000; // 2 seconds
    
    $(".tag-container span").hover(
        function() {
            var description = "";
            switch (this.id) {
                case "tag-1":
                    description = "Assume that a character can only die if they are digested. If they are not, it's feasible to bring them back with minimal memory loss.";
                    break;
                case "tag-2":
                    description = "This webnovel will depict violence seen in nature, and violence seen from humans.";
                    break;
                case "tag-3":
                    description = "The power scaling in this world is calories based. Assume that nature is highly advanced, and that reincarnation is a form of information transfer, rather than magic.";
                    break;
            }
            $(".tag-descriptions").text(description).stop(true, true).fadeIn(0).css("opacity", 1);

            var self = this;
            clearTimeout($(self).data('timeout'));
        },
        function() {
            var self = this;
            var timeout = setTimeout(function() {
                $(".tag-descriptions").fadeOut(fadeOutTime);
            }, hoverTime);
            $(self).data('timeout', timeout);
        }
    );
});