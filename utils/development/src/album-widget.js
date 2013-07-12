// ----------------------------------------------------------------------------------
// rdioUtils -- album-widget.js
// Copyright 2013, Rdio, Inc.
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function(R, rdioUtils) {

  // ----------
  rdioUtils.AlbumWidget = function(album) {
    if (!album || !album.url || !album.icon || !album.name || !album.artist 
        || !album.artistUrl || !album.length || !album.key) {
      throw new Error('Missing album or not enough info');
    }
    
    // TODO: Verify album has what we need
    // TODO: Escape all the values
    // TODO: Reject sources that aren't albums
    this._element = document.createElement('div');
    this._element.className = 'rdio-utils-album';
    this._element.innerHTML = ''
        + '<div class="rdio-utils-cover">'
          + '<a href="http://www.rdio.com' + album.url + '" target="_blank">'
            + '<div class="rdio-utils-icon" style="background-image: url(' + album.icon + ')"></div>'
          + '</a>'
          + '<div class="rdio-utils-hover-overlay">'
            + '<div class="rdio-utils-play rdio-utils-btn"></div>'
          + '</div>'
        + '</div>'
        + '<div class="rdio-utils-title rdio-utils-truncated"><a href="http://www.rdio.com' + album.url + '" target="_blank">' + album.name + '</a></div>'
        + '<div class="rdio-utils-author rdio-utils-truncated"><a href="http://www.rdio.com' + album.artistUrl + '" target="_blank">' + album.artist + '</a></div>'
        + '<div class="rdio-utils-size rdio-utils-truncated">' + album.length + ' songs</div>';

    var button = this._element.getElementsByClassName('rdio-utils-play')[0];
    rdioUtils._bind(button, 'click', function(event) {
      if (event.altKey || event.metaKey) {
        R.player.queue.addPlayingSource();
      }

      R.player.play({ source: album.key });
    });
  };

  // ----------
  rdioUtils.AlbumWidget.prototype = {
    // ----------
    element: function() {
      return this._element;
    }
  };

})(window.__rdio, window.rdioUtils);
