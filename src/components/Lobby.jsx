import React, { useState, useEffect, Fragment } from 'react';
import variables from './GlobalVariables';
import socket from '../dist/js/SocketManager.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faCog } from "@fortawesome/free-solid-svg-icons";
import LobbyChat from './LobbyChat';
import LobbyUser from './LobbyUser';

const Lobby = (props) => {
    const [users, setUsers] = useState([]);
    const { setPage } = props;

    const RefreshUsers = () => {
        let arr = [...users];

        for(let i = 0; i < variables.lobby.maxPlayers; i++) {
            const usrLobby  = variables.lobby.users[i];

            let usr = {
                key: i,
                number: i + 1,
                user: '',
                userLider: variables.lobby.userLider,
                userId: ''
            };
            
            if(usrLobby){
                usr.user = usrLobby.name;
                usr.userId = usrLobby.id;
            }
            
            arr.push(usr);
        }

        setUsers(arr);
    }

    const PlayGameButton = () => {
        variables.lobby.PlayGame(variables.user.id);
    }

    const ReturnSelectMode = () => {
        setPage('modeSelect');
    }

    const QuitLobby = () => {
        variables.lobby.LeftLobby(variables.user.id);
        ReturnSelectMode();
    }

    const OptionsMenu = () => {
        setPage('lobbyOptions');
    }

    useEffect(() => {
        RefreshUsers();
        socket.on('updateLobby', (data) => {
            variables.lobby.ApplyData(JSON.parse(data));
            RefreshUsers();
        });

        socket.on('userKicking', () => ReturnSelectMode());

        socket.on('playGame', (data) => {
            variables.lobby.ApplyData(JSON.parse(data));
            setPage('game');
        });

        return () => {
            socket.off('updateLobby');
            socket.off('userKicking');
            socket.off('playGame');
        }
    }, [setPage]);

    return (
        <Fragment>
            <h2 id="lobbyTitle">Sala # {variables.lobby.number}</h2>
            <table id="tableUsers" className="tablePlayers">
                <thead>
                    <tr>
                        <th colSpan="3">ID de la sala: 
                            <input id="idLobby" className="lobbyId" readOnly value={variables.lobby.shortId} />
                            <FontAwesomeIcon icon={(variables.lobby.isPrivate) ? faLock : faLockOpen} />
                            { (variables.lobby.userLider === variables.user.id) ? <button onClick={OptionsMenu} className="copyLobbyId normalButton"><FontAwesomeIcon icon={faCog} /></button> : '' }
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th colSpan="2">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(item =>
                            <LobbyUser 
                                key={item.key}
                                user={item.user}
                                userLider={item.userLider}
                                number={item.number}
                                userId={item.userId}
                            />)
                    }
                </tbody>
            </table>

            <div className="lobby-chat">
                <LobbyChat />
            </div>
            

            {
                (variables.lobby.userLider === variables.user.id) ?
                    <div className="display-flex">
                        <button onClick={QuitLobby} id="btnQuit" className="normalButton">Salir</button>
                        <button onClick={PlayGameButton} id="btnPlay" className="normalButton">Comenzar</button>
                    </div>
                :
                    <button onClick={QuitLobby} id="btnQuit" className="normalButton">Salir</button>
            }
            
            <label className="error" id="errorPlayGame"></label>
        </Fragment>
    );
}

export default Lobby;