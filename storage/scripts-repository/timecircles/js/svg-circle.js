$(document).ready(function(){
    function startAdvantagesAnimation(){
        $('#circle1, #circle2, #circle3, #circle4').circleProgress({
            size: 150,
            thickness: 4,
            startAngle: 1.55,
            fill: { color: "#0c6db7" },
            emptyFill: "#e7eded"
        });

        $('#circle1').on('circle-animation-start', function(event) {
            var count1 = 0;
            var interval1 = setInterval(function(){
                if (count1 < 75){
                    count1++;
                    $('#circle1').find('.circle-count .number').text(count1);
                }else{
                    clearInterval(interval1);
                }
            }, 12);
        }).circleProgress({
            value: 0.72
        });

        $('#circle2').on('circle-animation-start', function(event) {
            var count2 = 0;
            var interval2 = setInterval(function(){
                if (count2 < 130){
                    count2++;
                    $('#circle2').find('.circle-count .number').text(count2);
                }else{
                    clearInterval(interval2);
                }
            }, 8);
        }).circleProgress({
            value: 0.62
        });

        $('#circle3').on('circle-animation-start', function(event) {
            var count3 = 3234;
            var interval3 = setInterval(function(){
                if (count3 < 3453){
                    count3++;
                    $('#circle3').find('.circle-count .number').text(count3);
                }else{
                    clearInterval(interval3);
                }
            }, 5);
        }).circleProgress({
            value: 0.8
        });

        $('#circle4').on('circle-animation-start', function(event) {
            var count4 = 11127;
            var interval4 = setInterval(function(){
                if (count4 < 11387){
                    count4++;
                    $('#circle4').find('.circle-count .number').text(count4);
                }else{
                    clearInterval(interval4);
                }
            }, 3);
        }).circleProgress({
            value: 0.5
        });
    }
    $('#circle-wrap').waypoint(function (dir) {
        if (dir === 'down') {
            startAdvantagesAnimation();
        }
    }, {
        offset: '70%'
    });
});
