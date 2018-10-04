$(document).ready(function() {

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    // html head parser borrowed from jquery pjax
    var $newPageHead = $( '<head />' ).html(
        $.parseHTML(
            newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
          , document
          , true
        )
    );
    var headTags = [
        "meta[name='keywords']"
      , "meta[name='description']"
      , "meta[property^='og']"
      , "meta[name^='twitter']"
      , "meta[itemprop]"
      , "link[itemprop]"
      , "link[rel='prev']"
      , "link[rel='next']"
      , "link[rel='canonical']"
    ].join(',');
    $( 'head' ).find( headTags ).remove(); // Remove current head tags
    $newPageHead.find( headTags ).appendTo( 'head' ); // Append new tags to the head
});

  Barba.Pjax.start();

  var HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    $('.uk-offcanvas').addClass('visuallyhidden');
    this.newContainerLoading.then(this.finish.bind(this));
  },

  finish: function() {
  $(window).scrollTop(0);
  $('.uk-navbar-item > a').removeClass('underline');

  if (location.pathname !== '/') {
    $('.uk-navbar-item > a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('underline');
  }
    this.done();
  }

});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

});
