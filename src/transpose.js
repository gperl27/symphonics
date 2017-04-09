import { CODE } from './conversion.js';

const wordsToMusic = (measurement, word) => {
  // console.log(word);
  // console.log(CODE);
  const letters = word.split("");

  return letters.map((letter) => {
    return { measurement: measurement, note: CODE[letter] };
  });
}

export {
  wordsToMusic
}
