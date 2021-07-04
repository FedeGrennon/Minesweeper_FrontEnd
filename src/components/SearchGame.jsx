import React, { useEffect, Fragment } from 'react';
import Loading from './Loading';
import variables from './GlobalVariables';
import socket from '../dist/js/SocketManager.js';

const SearchGame = (props) => {
    const { setPage } = props;

    useEffect(() => {
        variables.lobby.SearchGame(variables.user.id);
        socket.on('noLobbyAvailable', () => variables.lobby.SearchGame(variables.user.id));

        socket.on('joinLobbyOk', (data) => {
            variables.lobby.ApplyData(JSON.parse(data));
            setPage('lobby');
        });

        return () => {
            socket.off('noLobbyAvailable');
            socket.off('joinLobbyOk');
        }
    }, [setPage]);

    const ReturnSelectMode = () => {
        setPage('modeSelect');
    }

    return (
        <Fragment>
            <h2>Buscando partida</h2>
            <Loading />
            
            <button onClick={ReturnSelectMode} className="normalButton" id="btnBackSearchGame">Cancelar</button>
        </Fragment>
    );
}

export default SearchGame;