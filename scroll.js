document.addEventListener("DOMContentLoaded", function() {
    var body = $("body");

    var scroller = {
        target: $("#scroll-container"),
        ease: 0.05,
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0
    };

    var requestId = null;

    gsap.TweenLite.set(scroller.target, {
        rotation: 0.01,
        force3D: true
    });

    function onLoad() {
        updateScroller();
        window.focus();
        $(window).on("resize", onResize);
        $(document).on("scroll", onScroll);
    }

    function updateScroller() {
        var resized = scroller.resizeRequest > 0;

        if (resized) {
            var height = scroller.target.innerHeight();
            body.css("height", height + "px");
            scroller.resizeRequest = 0;
        }

        var scrollY = $(window).scrollTop();

        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;

        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
            scroller.y = scrollY;
            scroller.scrollRequest = 0;
        }

        gsap.TweenLite.set(scroller.target, {
            y: -scroller.y
        });

        requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    }

    function onScroll() {
        scroller.scrollRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        }
    }

    function onResize() {
        scroller.resizeRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        }
    }

    onLoad();
});
