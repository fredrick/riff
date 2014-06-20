var vows = require('vows'),
    assert = require('assert');

var Score = require('../lib/riff').Score;

var oneNote = [
  [2.954706552, [144, 40, 127]],
  [0.232245675, [128, 40, 0]]
];

var oneNotePlayback1 = [
  [4.3539790840000006, [144, 40, 127]],
  [0.214371096, [128, 40, 0]]
];

var oneNotePlayback2 = [
  [2.3567749630000003, [144, 40, 127]],
  [0.203156196, [128, 40, 0]]
];

var fourNotes = [
  [0,[144,43,127]],
  [0,[144,43,127]],
  [0.48752308000000005,[144,45,127]],
  [0.48752308000000005,[144,45,127]],
  [0.029039123000000003,[128,43,0]],
  [0.029039123000000003,[128,43,0]],
  [0.516577606,[128,45,0]],
  [0.516577606,[128,45,0]],
  [0.029069992000000003,[144,48,127]],
  [0.029069992000000003,[144,48,127]],
  [0.48757080300000005,[128,48,0]],
  [0.48757080300000005,[128,48,0]],
  [0.06970125,[144,50,127]],
  [0.06970125,[144,50,127]],
  [0.41213024200000004,[128,50,0]],
  [0.41213024200000004,[128,50,0]]
];

var fourNotesPlayback1 = [
  [23.28395292,[144,43,127]],
  [0.38306584200000005,[144,45,127]],
  [0.023343143,[128,43,0]],
  [0.023064237,[128,45,0]],
  [0.07541597900000001,[144,45,127]],
  [0.389381739,[128,45,0]],
  [0.10402991,[144,48,127]],
  [0.388954428,[128,48,0]],
  [0.110233259,[144,50,127]],
  [0.26709535500000003,[128,50,0]]
];

var fourNotesPlayback2 = [
  [102.64967369,[144,43,127]],
  [0.36559074500000005,[128,43,0]],
  [0.13359537100000002,[144,45,127]],
  [0.360115881,[128,45,0]],
  [0.12775919500000002,[144,48,127]],
  [0.353767951,[128,48,0]],
  [0.16849412,[144,50,127]],
  [0.27869484,[128,50,0]]
];

vows.describe('Score').addBatch({
  'when scoring': {
    topic: new Score(oneNote),
    'has recorded song': function(score) {
      assert.deepEqual(score.recording, oneNote);
    },
    'has recorded pitch sequence': function(score) {
      assert.deepEqual(score.pitches, [40, 40]);
    },
    'has no score when no replayed pitches': function(score) {
      assert.equal(score.update(), 0);
    },
    'updates score for recording and perfect replay': function(score) {
      assert.equal(score.update(oneNotePlayback1[0]), 0.5);
      assert.equal(score.update(oneNotePlayback1[1]), 1);
    },
    'has if replay is finished': function() {
      var score = new Score(oneNote);

      assert.isFalse(score.finished());

      score.update(oneNotePlayback1[0]);
      assert.isFalse(score.finished());

      score.update(oneNotePlayback1[1]);
      assert.isFalse(score.finished());

      score.update(oneNotePlayback1[1]);
      assert.isTrue(score.finished());
    }
  }
}).export(module);
