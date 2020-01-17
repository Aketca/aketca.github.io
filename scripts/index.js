$(document).ready(function(){
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
});
$(window).bind("load", function () {
    $("head").append('<link type="text/css" href="/style/sprites.css" rel="stylesheet" property="stylesheet">');
});