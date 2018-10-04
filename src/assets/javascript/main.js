'use strict';

if (location.pathname !== '/') {
  $('.uk-navbar-item > a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('underline');
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

var visited = getCookie('visited');
if (!visited) {
    setCookie('visited','true',30);
    UIkit.notification({
        message: 'This website uses cookies to ensure you get the best experience on our website. <br> <a class="uk-button uk-button-small uk-button-default uk-margin-top" href="/imprint">Read more</a>',
        status: 'primary',
        pos: 'bottom-left'
    });
}
