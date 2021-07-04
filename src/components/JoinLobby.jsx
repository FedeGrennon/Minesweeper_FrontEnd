import React, { useEffect, Fragment } from 'react';
import variables from './GlobalVariables';
import socket from '../dist/js/SocketManager.js';

const JoinLobby = (props) => {
    const { setPage } = props;

    useEffect(() => {
        socket.on('joinLobbyOk', (data) => 
        {
            variables.lobby.ApplyData(JSON.parse(data));
            setPage('lobby');
        });

        const errorJoinLobby = document.getElementById('errorJoinLobby');
        socket.on('joinLobbyError', () => 
        {
            errorJoinLobby.textContent = 'Error al intentar entrar a la sala';
        });

        socket.on('joinLobbyNotExist', () => 
        {
            errorJoinLobby.textContent = 'La sala no existe';
        });

        socket.on('joinLobbyIsStarted', () => 
        {
            errorJoinLobby.textContent = 'La partida ya comenzo';
        });

        socket.on('joinLobbyIsFull', () => 
        {
            errorJoinLobby.textContent = 'La sala esta completa';
        });

        socket.on('joinLobbyPasswordError', () => 
        {
            errorJoinLobby.textContent = 'Contraseña incorrecta';
        });

        return () => {
            socket.off('joinLobbyOk');
            socket.off('joinLobbyError');
            socket.off('joinLobbyNotExist');
            socket.off('joinLobbyIsStarted');
            socket.off('joinLobbyIsFull');
            socket.off('joinLobbyPasswordError');
        }
    }, [setPage]);

    const JoinLobby = () => {
        const txtLobbyId = document.getElementById('txtLobbyId');
        const txtLobbyPassword = document.getElementById('txtLobbyPassword');
        const errorJoinLobby = document.getElementById('errorJoinLobby');

        errorJoinLobby.textContent = '';
        variables.lobby.JoinLobby(variables.user.id, txtLobbyId.value, txtLobbyPassword.value);
    }

    const ReturnSelectMode = () => {
        setPage('modeSelect');
    }

    return (
        <Fragment>
            <h2>Ingresar a una sala</h2>
            <input className="normalInput"  id="txtLobbyId" type="text" placeholder="Ingrese ID de la sala" />
            <input className="normalInput"  id="txtLobbyPassword" type="password" placeholder="Contraseña..." />
            <label>Si la sala no tiene contraseña no ingrese nada</label>

            <div className="display-flex">
                <button onClick={ReturnSelectMode} className="normalButton" id="backJoinLobby">Volver</button>
                <button onClick={JoinLobby} className="normalButton" id="btnJoinLobby">Unirse</button>
            </div>

            <label className="error" id="errorJoinLobby"></label>
        </Fragment>
    );
}

export default JoinLobby;