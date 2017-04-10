import React, { Component } from 'react';
import { wordsToMusic } from '../transpose';


export default class App extends Component {
  playNote(){
    var conductor = new BandJS();

    conductor.setTimeSignature(4,4);
    conductor.setTempo(120);

    const measurement = 'eighth';

    const text = `Shall I compare thee to a summer's day?
                  Thou art more lovely and more temperate:
                  Rough winds do shake the darling buds of May,
                  And summer's lease hath all too short a date:
                  Sometimes too hot the eye of heaven shines,
                  And too often is his gold complexion dimm'd:
                  And every fair from fair sometimes declines,
                  By chance or natures changing course untrimm'd;
                  By thy eternal summer shall not fade,
                  Nor lose possession of that fair thou owest;
                  Nor shall Death brag thou wander'st in his shade,
                  When in eternal lines to time thou growest:
                  So long as men can breathe or eyes can see,
                  So long lives this and this gives life to thee.`;

    // let words = text.split(" ");

    let musicFromText = text.split(/\s+/).map(function(word){
      return wordsToMusic(measurement, word);
    });

    console.log(musicFromText);

    // flatten array to loop through chords/notes

    // musicFromText = [].concat.apply([], musicFromText);

    // console.log(musicFromText);

    var rightHand = conductor.createInstrument();
    var leftHand  = conductor.createInstrument();
    var chord = conductor.createInstrument();

    musicFromText.forEach(function(music){
      if(music.notes){
        music.notes.forEach(function(note){
          if(note.hand === 'right'){
            console.log('right');
            rightHand.note(note.measurement, note.note);
          } else {
            console.log('left');
            leftHand.note(note.measurement, note.note);
          }
        })
      } else {
        // default chords to righthand
        // chord.note('quarter', music.note);
        rightHand.note('half', music.note);
        leftHand.rest('half');
      }
    })

    console.log(rightHand, leftHand, chord);

    // piano.note('sixteenth', 'Bb4');
    // piano.note('sixteenth', 'D4');
    // piano.note('sixteenth', 'E4');
    // piano.note('sixteenth', 'F4');

    var player = conductor.finish();

    player.play();
  }

  render() {
    return (
      <div>
        React simple starter
        <button onClick={this.playNote.bind(this)}>
          Play
        </button>
      </div>
    );
  }
}
