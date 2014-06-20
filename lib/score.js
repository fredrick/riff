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
                                .join(''),
	matrix = [[]];
    
    var i;
    for (i = 0; i <= recordedFingerprint.length; i++) {
        matrix[0][i] = i;
    }

    this.recording = recording;

    this.pitches = pitches;

    this.update = function(midi) {
      if (!midi) {
        return score;
      }

      var note = pitch(midi);

      if (replayFingerprint.length > recordedFingerprint.length) {
        return score;
      }
      
      matrix = addRowTo(matrix, String.fromCharCode(note), recordedFingerprint)
      
      score = 1 -
        matrix[matrix.length - 1][matrix[0].length - 1] /
        recordedFingerprint.length;

      return score;
    };

    function pitch(midi) {
      return midi[1][1];
    };

    function addRowTo(matrix, addedChar, a){
        var numColumns = matrix.length;
        var numRows = matrix[0].length;
        var i;
        var newRow = [numColumns];
        for (i = 1; i < numRows; i++){
            if (addedChar == a.charAt(i -1)){
                newRow[i] = matrix[numColumns - 1][i - 1];
            } else {
                newRow[i] = Math.min(matrix[numColumns - 1][i - 1] + 1,
                            Math.min(newRow[i - 1] + 1,
                                    matrix[numColumns - 1][i] + 1));
	    }
	}
        matrix.push(newRow);
        return matrix;
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
