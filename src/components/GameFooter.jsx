import React from 'react'

const GameFooter = (props) => {
    return (
        <div className="game-footer">
            <div className="nothing"></div>
            <div className="game-statics">
                <div className="player-bar">
                    <div className="bar">
                        <div className="percentage" style={{width: props.localUser.percentage + "%"}}></div>
                    </div>
                    <span>{props.localUser.percentage}%</span>
                </div>
            </div>
            <div className="nothing"></div>
        </div>
    );
}

export default GameFooter;