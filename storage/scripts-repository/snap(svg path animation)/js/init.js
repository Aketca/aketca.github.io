$(document).ready(function () {

    cycledSnap(1);
    cycledSnap(2);

});
function cycledSnap(numberOf) {
    if ($('.decor'+numberOf+'_path1').length > 0){
        var svg = Snap($('.spot'));
        var s = Snap(svg);

        var first = Snap.select('.decor'+numberOf+'_path1');
        var second = Snap.select('.decor'+numberOf+'_path2');
        var third = Snap.select('.decor'+numberOf+'_path3');
        var fourth = Snap.select('.decor'+numberOf+'_path4');

        var firstPoints = first.node.getAttribute('d');
        var secondPoints = second.node.getAttribute('d');
        var thirdPoints = third.node.getAttribute('d');
        var fourthPoints = fourth.node.getAttribute('d');


        var toSecond = function(){
            first.animate({ d: secondPoints }, 5000, mina.easeIn, toThird);
        }

        var toThird = function(){
            first.animate({ d: thirdPoints }, 5000, mina.easeIn, toFourth);
        }

        var toFourth = function(){
            first.animate({ d: fourthPoints }, 5000, mina.easeIn, toFirst);
        }

        var toFirst = function(){
            first.animate({ d: firstPoints }, 5000, mina.easeIn, toSecond);
        }

        toFirst();
    }
}