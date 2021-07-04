import React, { useEffect, Fragment } from 'react';
import socket from '../dist/js/SocketManager.js';
import variables from './GlobalVariables';

const CreateLobby = (props) => {
    const { setPage } = props;

    useEffect(() => {
        socket.on('lobbyCreatedOk', (data) => 
        {
            variables.lobby.ApplyData(JSON.parse(data));
            setPage('lobby');
        });

        socket.on('lobbyCreatedError', () => document.getElementById('errorCreateLobby').textContent = 'Error al intentar crear la sala');

        return () => {
            socket.off('lobbyCreatedError');
            socket.off('lobbyCreatedOk');
        }
    }, [setPage]);

    const CreateLobby = () => {
        const ddlPlayersCount = document.getElementById('ddlPlayersCount');
        const txtPassword = document.getElementById('txtPassword');
        const errorCreateLobby = document.getElementById('errorCreateLobby');

        errorCreateLobby.textContent = '';
        variables.lobby.password = txtPassword.value;
        variables.lobby.maxPlayers = parseInt(ddlPlayersCount.value);
        variables.lobby.CreateLobby(variables.user.id);
    }

    const ReturnSelectMode = () => {
        setPage('modeSelect');
    }

    return (
        <Fragment>
            <h2>Crear a una sala</h2>
            <select id="ddlPlayersCount" className="normalSelect">
                <option value="1">1 Jugador</option>
                <option value="2">2 Jugadores</option>
                <option value="3">3 Jugadores</option>
                <option value="4">4 Jugadores</option>
                <option value="5">5 Jugadores</option>
                <option value="6">6 Jugadores</option>
            </select>
            <label>Cantidad de jugadores</label>
            <input className="normalInput"  id="txtPassword" type="password" placeholder="Contraseña..." />
            <label>Indique contraseña si desea una sala cerrada</label>
            <div className="display-flex">
                <button onClick={ReturnSelectMode} className="normalButton" id="backCreateLobby">Volver</button>
                <button onClick={CreateLobby} className="normalButton" id="btnCreateLobby">Crear</button>
            </div>
            
            <label className="error" id="errorCreateLobby"></label>
        </Fragment>
    );
}

export default CreateLobby;