(function() {
  "use strict";

  function Riff() {
    var song = [];
    this.song = function() {
      return song.slice();
    };
    this.record = function(note) {
      song.push(note);
      return this;
    };
    this.replay = function(callback) {
      var timeout = 0;
      for (var i = 0; i < song.length; i++) {
        (function () {
          setTimeout(callback, timeout, song[i]);
          timeout += song[i][0] * 1000;
        })();
      };
      return this;
    };
  }

  if (typeof window !== 'undefined') {
    window.Riff = (typeof window.Riff === 'undefined' ? {} : window.Riff);
    window.Riff = Riff;
  }
  else {
    exports = module.exports = Riff;
  }
})();
