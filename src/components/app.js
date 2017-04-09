import React, { Component } from 'react';
import { wordsToMusic } from '../transpose';


export default class App extends Component {
  playNote(){
    var conductor = new BandJS();

    conductor.setTimeSignature(4,4);
    conductor.setTempo(120);

    const measurement = 'sixteenth';

    const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    // let words = text.split(" ");

    let musicFromText = text.split(" ").map(function(word){
      return wordsToMusic(measurement, word);
    });

    // flatten array to loop through chords/notes

    musicFromText = [].concat.apply([], musicFromText);

    console.log(musicFromText);

    var piano = conductor.createInstrument();

    musicFromText.forEach(function(music){
      piano.note(music.measurement, music.note);
    })

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
