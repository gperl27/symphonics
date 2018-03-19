import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux'

import {
    setMusic,
    handleChangeText,
} from '../modules/music'

const InputContainer = ({
    text,
    setMusic,
    handleChangeText,
}) =>
    <div>InputContainer => CLEAR BUTTON SOMEWHERE
        <textarea
            style={{ width: '100%', height: '500px' }}
            row={50}
            onChange={handleChangeText}
            value={text}
            placeholder='Compose with text...'
        />
        <button onClick={() => setMusic()}>Compose</button>
    </div>



const mapStateToProps = state => ({
    text: state.music.text,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setMusic,
    handleChangeText,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(InputContainer)