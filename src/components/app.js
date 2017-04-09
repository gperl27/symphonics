import React, { Component } from 'react';
import { wordsToMusic } from '../transpose';


export default class App extends Component {
  playNote(){
    var conductor = new BandJS();

    conductor.setTimeSignature(4,4);
    conductor.setTempo(120);

    wordsToMusic('blah');

    var piano = conductor.createInstrument();

    piano.note('sixteenth', 'Bb4');
    piano.note('sixteenth', 'D4', true);
    piano.note('sixteenth', 'E4');
    piano.note('sixteenth', 'F4');

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
