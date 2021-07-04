import React from 'react';
import GameEndUsers from './GameEndUsers';
import LobbyChat from './LobbyChat';
import variables from './GlobalVariables';

const GameEnd = (props) => {
    const { setPage, endGame, users } = props;

    const ReturnSelectMode = () => {
        variables.lobby.LeftLobby(variables.user.id);
        setPage('modeSelect');
    }

    return (
        <div className="menu active">
            <h2>Fin de la partida</h2>

            <table id="tableUsersEnd" className="tablePlayers">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>%</th>
                        <th>Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, idx) =>
                            <GameEndUsers 
                                key={item.id}
                                id={item.id}
                                number={idx + 1}
                                name={item.name}
                                end={item.end}
                                lose={item.lose}
                                percentageComplete={item.percentageComplete}
                                points={item.points}
                                timeInMilliseconds={item.timeInMilliseconds}
                            />)
                    }
                </tbody>
            </table>

            <div className="lobby-chat">
                <LobbyChat background="rgba(0, 0, 0, 0.84)" />
            </div>

            {
                (!endGame) ?
                    <label>Todavia hay jugadores en partida</label>
                :
                    <div className="display-flex hidden">
                        <button onClick={ReturnSelectMode} className="normalButton">Salir</button>
                    </div>
            }
        </div>
    )
}

export default GameEnd;