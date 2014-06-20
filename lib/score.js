(function() {
  "use strict";

  function Score(recording) {
    var score = 0,
        pitches = recording.map(function(note) {
          return note[1][1];
        }),
        replayFingerprint = '',
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

      replayFingerprint += String.fromCharCode(note);

      if (finished()) {
        return score;
      }
      
      score = 1 -
        distance(recordedFingerprint, replayFingerprint) /
        recordedFingerprint.length;

      return score;
    };

    this.finished = finished;

    function finished() {
      return replayFingerprint.length > recordedFingerprint.length;
    }

    function pitch(midi) {
      return midi[1][1];
    };

    function distance(a, b) {
      var lengthOfA = a.length,
          lengthOfB = b.length;

      if (lengthOfA === 0) return lengthOfB;
      if (lengthOfB === 0) return lengthOfA;

      var matrix = [];

      var i;
      for (i = 0; i <= lengthOfB; i++) {
        matrix[i] = [i];
      }

      var j;
      for (j = 0; j <= lengthOfA; j++) {
        matrix[0][j] = j;
      }

      for (i = 1; i <= lengthOfB; i++) {
        for (j = 1; j <= lengthOfA; j++){
          if (b.charAt(i - 1) == a.charAt(j - 1)){
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                                    Math.min(matrix[i][j - 1] + 1,
                                    matrix[i - 1][j] + 1));
          }
        }
      }
           
      return matrix[lengthOfB][lengthOfA];
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
