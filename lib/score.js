(function() {
  "use strict";
  var Vector = require('gauss').Vector;

  function Score(recording) {
    var score = 0,
        replay = new Vector(),
        pitches = new Vector(recording.map(function(note) {
          return note[1][1];
        })),
        replayFingerprint = new Vector(),
        recordedFingerprint = pitches
                                .map(function(pitch) {
                                  return String.fromCharCode(pitch);
                                })
                                .join('');

    this.recording = recording;

    this.pitches = pitches;

    this.update = function(midi) {
      if (!midi) {
        return score;
      }

      var note = pitch(midi);

      replay.push(note);
      replayFingerprint.push(String.fromCharCode(note));

      if (replay.length > pitches.length) {
        return score;
      }
      
      score = 1 -
        distance(recordedFingerprint, replayFingerprint.join('')) /
        recordedFingerprint.length;

      return score;
    };

    function pitch(midi) {
      return midi[1][1];
    };

    function distance(a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;

      var matrix = [];

      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++){
          if (b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1,
                                    Math.min(matrix[i][j-1] + 1,
                                    matrix[i-1][j] + 1));
          }
        }
      }
           
      return matrix[b.length][a.length];
    };
  }
  if (typeof window !== 'undefined') {
    window.Score = (typeof window.Score === 'undefined' ? {} : window.Score);
    window.Score = Score;
  }
  else {
    exports = module.exports = Score;
  }
})();
