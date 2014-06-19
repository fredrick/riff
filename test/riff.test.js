var vows = require('vows'),
    assert = require('assert');

var Riff = require('../public/javascripts/riff');

var song = [
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

vows.describe('Riff').addBatch({
  'when recording': {
    topic: new Riff().record(song[0]),
    'has notes': function(riff) {
      assert.deepEqual(riff.record(song[1]).song(), song.slice(0, 2));
    }
  },
  'when replaying': {
    topic: new Riff().record(song[0]),
    'asynchronously': {
      topic: function(riff) {
        var calls = 0;
        riff.replay(this.callback(calls += 1));
      },
      'has replayed notes': function(result, error) {
        assert.equal(result, 1);
      }
    }
  }
}).export(module);
