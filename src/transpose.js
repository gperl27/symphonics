import { CODE } from './conversion.js';

const wordsToMusic = (measurement = "eight", word) => {
  // console.log(word);
  // console.log(CODE);
  const letters = word.split("");
  const regex = /([A-Z])|([.!?])/;

  if (regex.test(word)) {
    return { measurement: 'quarter', note: chord(letters) };
  } else {
    let left = 0, right = 0;
    let notes = singleNote(measurement, letters);

    // get sums of notes so we know how to measure them
    notes.forEach(function (note) {
      if (note.hand === 'right') {
        right++;
      } else {
        left++;
      }
    })

    // add measurements to notes
    notes.forEach(function (note) {
      if (note.hand === 'right') {
        note.measurement = getMeasurements(right);
      } else {
        note.measurement = getMeasurements(left);
      }
    })

    return { notes, left, right };
  }
}

// return a chord from letters coming in
const chord = (letters) => {
  let chord = '';

  letters.forEach(function (letter) {
    chord += `${CODE[letter].note},`;
  });

  return chord.replace(/,\s*$/, "");
}

// return one note per letter coming in
const singleNote = (measurement, letters) => {
  return letters.map((letter) => {
    return { note: CODE[letter].note, hand: CODE[letter].hand };
  });
}

const getMeasurements = (n) => {
  if (n <= 1) {
    return 'whole';
  } else if (n <= 2) {
    return 'half';
  } else if (n <= 4) {
    return 'quarter';
  } else if (n <= 8) {
    return 'eighth';
  } else if (n <= 16) {
    return 'sixteenth';
  } else if (n <= 32) {
    return 'thirtySecond';
  }
}

export {
  wordsToMusic
}
