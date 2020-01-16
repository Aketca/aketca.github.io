<style>
    .nav-wrap {
    &
    .popup-slide {
        width: 100vw;
        height: 100vh;
        left: 0;
        margin: 0;
    }
    }
    body {
        width: 100vw;
        max-width: 100%;
    }
    .header {
        width: 100%;
    }
</style>
<script>
    function hideScroll() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (iOS == true) {
            var scrollTop = window.pageYOffset;
            $('body').attr('data-scroll', scrollTop);
            $('body').css({'position' : 'fixed', 'top' : - scrollTop + 'px'});
            /*Если хедер фиксированый*/
            $('header').css({'position' : 'absolute', 'top' : scrollTop + 'px'});
        }
    }
    function unhideScroll() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (iOS == true) {
            var scrollTop = $('body').attr('data-scroll');
            $('body').css({'position' : 'initial', 'top' : 'initial'});
            /*Если хедер фиксированый*/
            $('header').css({'position' : '', 'top' : '0'});
            /**/
            $(window).scrollTop(scrollTop);
        }
    }
</script>