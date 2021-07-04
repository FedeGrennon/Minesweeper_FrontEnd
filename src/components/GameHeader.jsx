import React from 'react'

const GameHeader = (props) => {
    const { localUser, time } = props;

    const ConvertToTimer = (miliseconds) => {
        let minutes = Math.floor((miliseconds / 1000) / 60);
        let seconds = Math.floor(miliseconds / 1000) - (60 * minutes);
        let mili = miliseconds % 1000;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        mili = mili < 100 ? `0${mili}` : mili;
        mili = mili < 10 ? `00${mili}` : mili;
        mili = mili.length > 3 ? mili.toString().slice(0, -1) : mili;

        return `${minutes}:${seconds}:${mili}`;
    }

    return (
        <div className="game-header">
            <div className="nothing"></div>
            <div className="game-statics">
                <div className="left-text">Bombas {localUser.mines}</div>
                <div className="center-text">{ConvertToTimer(time)}</div>
                <div className="right-text">Puntos {localUser.points}</div>
            </div>
            <div className="nothing"></div>
        </div>
    );
}

export default GameHeader;