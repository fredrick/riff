(function() {
  "use strict";
  
  function Score(capture) {
    this.capture = capture;
  }
  if (typeof window !== 'undefined') {
    window.Score = (typeof window.Score === 'undefined' ? {} : window.Score);
    window.Score = Score;
  }
  else {
    exports = module.exports = Score;
  }
})();
