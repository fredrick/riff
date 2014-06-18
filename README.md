# Riff

| A musical game that tests your ability to play a "riff".

Record a riff and see how well you or someone else can play it.

## Get your jam on
 
- Install [Node.js](http://nodejs.org/)
- [Download](https://github.com/wayoutmind/riff/archive/master.zip) or clone Riff 

`$ git clone https://github.com/wayoutmind/riff.git`

- Install dependencies with [npm](https://www.npmjs.org/)

```
$ cd riff
$ npm install
````

- Start Riff

`$ npm start`

### Recording a riff

By default Riff can be accessed at [http://localhost:9000](http://localhost:9000). Riff will create a [MIDI](http://en.wikipedia.org/wiki/MIDI) input device labeled "Riff" that you can attach an instrument to. Record a riff from any instrument that supports MIDI and performances will be graded against that recording.
