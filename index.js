var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    midi = require('midi'),
    Score = require('./lib/riff').Score;

var song = [],
    score = new Score(song),
    recording = false,
    replaying = false,
    input = new midi.input();

app.use("/", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/status', function(req, res) {
  res.send({
    'recording': recording,
    'replaying': replaying,
    'score': score.update()
  });
});

app.get('/song', function(req, res) {
  res.send(song);
});

input.openVirtualPort('Riff');

io.on('connection', function (socket) {
  socket.emit('ping', true);

  input.on('message', function(deltaTime, message) {
    var note = [deltaTime, message];
    if (recording) {
      song.push(note);
    }
    else if (replaying) {
      socket.emit('score', score.update(note));
    }
    socket.emit('note', note);
  });

  socket.on('record', function(data) {
    recording = data;
    if (recording) {
      song = [];
      console.log('Recording started');
    }
    else {
      console.log('Recording stopped');
    }
  });

  socket.on('replay', function(data) {
    replaying = data;
    if (replaying) {
      score = new Score(song);
      console.log('Replaying started');
    }
    else {
      console.log('Replaying stopped');
    }
  });
});

server.listen(process.argv[2]);
