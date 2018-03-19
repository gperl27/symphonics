import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux'

import {
    playMusic,
    pauseMusic,
    stopMusic,
} from '../modules/music'

class MusicControls extends React.Component {
    renderPlayPauseButton = () => {
        const {
            player,
            playMusic,
            pauseMusic,
         } = this.props;

        const play = <button onClick={playMusic}>Play</button>
        const pause = <button onClick={pauseMusic}>Pause</button>

        console.log(player, 'PLAYER DOM')

        if (player && player.playing) {
            return pause;
        }

        return play;
    }

    render() {
        const {
            player,
            stopMusic,
        } = this.props;
        return (
            <div>
                {this.renderPlayPauseButton()}
                <button onClick={stopMusic}>stop</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    player: state.music.player,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    playMusic,
    pauseMusic,
    stopMusic,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(MusicControls)