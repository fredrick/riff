(function() {
  "use strict";

  function Score(recording) {
    var pitches = recording.map(function(note) {
      return note[1][1];
    });
    
    this.recording = recording;
    this.pitches = pitches;
  }
  if (typeof window !== 'undefined') {
    window.Score = (typeof window.Score === 'undefined' ? {} : window.Score);
    window.Score = Score;
  }
  else {
    exports = module.exports = Score;
  }
})();
