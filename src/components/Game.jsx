import React, { useState, useEffect, Fragment } from 'react';
import CanvasGame from './CanvasGame';
import socket from '../dist/js/SocketManager';
import variables from './GlobalVariables';
import GameEnd from './GameEnd';
import GameHeader from './GameHeader';
import PlayersGuest from './PlayersGuest';
import LobbyChat from './LobbyChat';
import GameFooter from './GameFooter';

const Game = (props) => {
    const [gameEnd, setGameEnd] = useState(false);
    const [users, setUsers] = useState(variables.lobby.users);
    const [localUser, setLocalUser] = useState({
        percentage: 0,
        points: 0,
        mines: variables.lobby.roundConfiguration.mineCount
    });
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(variables.lobby.roundConfiguration.timeToEnd);
    const { setPage } = props;

    useEffect(() => {
        socket.on('refreshUserGame', (data) => {
            variables.lobby.users = JSON.parse(data);
            setUsers(variables.lobby.users);

            const user = variables.lobby.users.find(x => x.id === variables.user.id);
            if(user)
                setGameEnd(user.end);
        });
        
        setTimeout(() => {
            setPlaying(true);
            setTime(variables.lobby.roundConfiguration.timeToEnd - 25);
        }, 1500);

        return () => {
            socket.off('refreshUserGame');
        }
    }, [setPage]);

    useEffect(() => {
        const userTime = variables.lobby.roundConfiguration.timeToEnd - time;
        variables.lobby.RefreshUserGame(localUser.points, variables.user.id, localUser.percentage, userTime, localUser.percentage >= 100);

        if(localUser.percentage >= 100)
            setPlaying(false);
    }, [localUser]);

    useEffect(() => {
        if(playing)
        {
            if(time > 0) {
                setTimeout(() => { 
                    setTime(time - 25);
                }, 25);
            } else {
                setPlaying(false);
                const userTime = variables.lobby.roundConfiguration.timeToEnd - time;
                variables.lobby.RefreshUserGame(localUser.points, variables.user.id, localUser.percentage, userTime, true);
                setTime(0);
            }
        }
    }, [time]);

    return (
        <Fragment>
            <div className={!gameEnd ? "game" : "bluring game"}>
                <GameHeader time={time} localUser={localUser} />

                <div className="game-body">
                    <PlayersGuest users={users} />
                    <CanvasGame playing={playing} localUser={localUser} setLocalUser={setLocalUser} />
                    
                    <div className="chat">
                        { !gameEnd &&
                            <div style={{paddingLeft: "20px", height: "100%"}}>
                                <LobbyChat />
                            </div>
                        }
                    </div>
                </div>

                <GameFooter localUser={localUser} />
            </div>
            
            { gameEnd && <GameEnd users={users} endGame={gameEnd} setPage={setPage} /> }
        </Fragment>
    )
}

export default Game;