var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    midi = require('midi'),
    gauss = require('gauss');

var riff = {
      capture: false
    },
    song = [],
    input = new midi.input();

app.use("/", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/riff', function(req, res) {
  res.send(riff);
});

app.get('/song', function(req, res) {
  res.send(song);
});

input.openVirtualPort('Riff');

io.on('connection', function (socket) {
  input.on('message', function(deltaTime, message) {
    var note = [deltaTime, message];
    if (riff.capture) {
      song.append(note);
    }
    socket.emit('note', note);
  });

  socket.on('hello', function(data) {
    
  });

  socket.on('capture', function(data) {
    riff.capture = !riff.capture;
    if (riff.capture) {
      song = [];
    }
    console.log('capture received');
  });
});

server.listen(process.argv[2]);
