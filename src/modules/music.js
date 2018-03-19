import constants from '../constants'
import { wordsToMusic } from '../transpose'

export const SET_MUSIC = 'SET_MUSIC';
export const CHANGE_TEXT = 'CHANGE_TEXT';

const initialState = {
    player: null,
    text: constants.defaults.text,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSIC:
            return {
                ...state,
                player: action.payload
            }
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.payload,
            }
        default:
            return state
    }
}

export const setMusic = () => (dispatch, getState) => {
    var conductor = new BandJS();

    conductor.setTimeSignature(4, 4);
    conductor.setTempo(120);

    const text = getState().music.text

    console.log(text, 'text')

    let musicFromText = text.split(/\s+/).map(word => wordsToMusic(null, word))

    var rightHand = conductor.createInstrument();
    var leftHand = conductor.createInstrument();

    musicFromText.forEach(music => {
        if (music.notes) {
            music.notes.forEach(note => {
                note.hand === 'right' ?
                    rightHand.note(note.measurement, note.note)
                    :
                    leftHand.note(note.measurement, note.note)
            })
        } else {
            // TODO - Come up with better default solution
            // default chords to righthand
            rightHand.note('half', music.note);
            leftHand.rest('half');
        }
    })

    var player = conductor.finish();

    console.log('====================================');
    console.log(player, 'PLAYER');
    console.log('====================================');

    dispatch({ type: SET_MUSIC, payload: player })
}

export const playMusic = () => (dispatch, getState) => {
    const player = getState().music.player
    const updatedPlayer = Object.assign({}, player)
    updatedPlayer.play()
    updatedPlayer.playing = true
    dispatch({ type: SET_MUSIC, payload: updatedPlayer })
}

export const stopMusic = () => (dispatch, getState) => {
    const player = getState().music.player
    const updatedPlayer = Object.assign({}, player)
    updatedPlayer.stop()
    updatedPlayer.setTime(0)
    updatedPlayer.playing = false
    dispatch({ type: SET_MUSIC, payload: updatedPlayer })
}

export const pauseMusic = () => (dispatch, getState) => {
    const player = getState().music.player
    const updatedPlayer = Object.assign({}, player)
    updatedPlayer.pause()
    updatedPlayer.playing = false;
    dispatch({ type: SET_MUSIC, payload: updatedPlayer })
}

export const handleChangeText = e => dispatch => {
    dispatch({ type: CHANGE_TEXT, payload: e.target.value })
}
