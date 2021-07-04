import React from 'react'
import variables from './GlobalVariables';

const PlayersGuest = (props) => {
    const { users } = props;


    return (
        <div className="players-guest">
            { users.length > 1 &&
                users.map((item, idx) =>
                    item.id !== variables.user.id &&
                    <div className="player">
                        <div className="player-name" style={{color: variables.userChatColors[idx]}}>{item.name}</div>
                        <div className="player-bar">
                            <div className="bar">
                                <div className="percentage" style={{width: item.percentageComplete + "%"}}></div>
                            </div>
                            <span>{item.percentageComplete}%</span>
                        </div>
                    </div>
                )
            }

            {users.length <= 1 &&
                <div>JUGANDO SOLO</div>
            }
        </div>
    );
}

export default PlayersGuest;