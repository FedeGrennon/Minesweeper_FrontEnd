import React, { useEffect, Fragment } from 'react';
import variables from './GlobalVariables';
import socket from '../dist/js/SocketManager.js';
import RoundConfiguration from '../classes/RoundConfiguration';

const LobbyOptions = (props) => {
    const { setPage } = props;

    useEffect(() => {
        RecalculateBombs();
    }, []);

    const RecalculateBombs = () => {
        const ddlGridHeigth = document.getElementById('ddlGridHeigth');
        const ddlGridWidth = document.getElementById('ddlGridWidth');
        const txtBombCount = document.getElementById('txtBombCount');
        const labelBombCount = document.getElementById('labelBombCount');

        let max = (ddlGridHeigth.value * ddlGridWidth.value) - 1;

        txtBombCount.max = max;
        labelBombCount.textContent = max;
    }

    const ReturnLobby = () => {
        setPage('lobby');
    }

    const RefreshOptions = () => {
        let gridHeigth = parseInt(document.getElementById('ddlGridHeigth').value);
        let gridWidth= parseInt(document.getElementById('ddlGridWidth').value);
        let bombCount = parseInt(document.getElementById('txtBombCount').value);
        let timeToEnd = parseInt(document.getElementById('txtOptionTimeGame').value);
        let roundConfiguration = new RoundConfiguration(gridHeigth, gridWidth, bombCount, timeToEnd);
        let password = document.getElementById('txtOptionPassword').value.substr(0, 10);
        
        let json = JSON.stringify({ lobbyId: variables.lobby.id, userId: variables.user.id, gameMode: 0, password, roundConfiguration });
        socket.emit('updateOptionsLobby', json);

        ReturnLobby();
    }

    return (
        <Fragment>
            <h2>Opciones</h2>
            
            <input id="txtOptionPassword" className="normalInput" type="password" defaultValue={variables.lobby.password} placeholder="Contraseña..." autoComplete="off" maxLength="10" />
            <label>Si la sala no tiene contraseña no ingrese nada</label>

            <select id="ddlGridHeigth" className="normalSelect" onChange={RecalculateBombs} defaultValue={variables.lobby.roundConfiguration.gridHeigth}>
                <option value="2">2 de ancho</option>
                <option value="3">3 de ancho</option>
                <option value="4">4 de ancho</option>
                <option value="5">5 de ancho</option>
                <option value="6">6 de ancho</option>
                <option value="7">7 de ancho</option>
                <option value="8">8 de ancho</option>
                <option value="9">9 de ancho</option>
                <option value="10">10 de ancho</option>
                <option value="11">11 de ancho</option>
                <option value="12">12 de ancho</option>
                <option value="13">13 de ancho</option>
                <option value="14">14 de ancho</option>
                <option value="15">15 de ancho</option>
                <option value="16">16 de ancho</option>
                <option value="17">17 de ancho</option>
                <option value="18">18 de ancho</option>
                <option value="19">19 de ancho</option>
                <option value="20">20 de ancho</option>
            </select>

            <select id="ddlGridWidth" className="normalSelect" onChange={RecalculateBombs} defaultValue={variables.lobby.roundConfiguration.gridWidth}>
                <option value="2">2 de alto</option>
                <option value="3">3 de alto</option>
                <option value="4">4 de alto</option>
                <option value="5">5 de alto</option>
                <option value="6">6 de alto</option>
                <option value="7">7 de alto</option>
                <option value="8">8 de alto</option>
                <option value="9">9 de alto</option>
                <option value="10">10 de alto</option>
                <option value="11">11 de alto</option>
                <option value="12">12 de alto</option>
                <option value="13">13 de alto</option>
                <option value="14">14 de alto</option>
                <option value="15">15 de alto</option>
                <option value="16">16 de alto</option>
                <option value="17">17 de alto</option>
                <option value="18">18 de alto</option>
                <option value="19">19 de alto</option>
                <option value="20">20 de alto</option>
            </select>

            <input id="txtBombCount" className="normalInput" type="number" defaultValue={variables.lobby.roundConfiguration.mineCount} placeholder="Cantidad de bombas..." autoComplete="off" maxLength="1" min="1" />
            <label>Minimo 1 bomba y maximo <label id="labelBombCount"></label> bombas</label>

            <input id="txtOptionTimeGame" className="normalInput" type="number" defaultValue={variables.lobby.roundConfiguration.timeToEnd / 1000} placeholder="Tiempo de la partida..." autoComplete="off" maxLength="3" min="5" max="999" />
            <label>Tiempo que dura la partida en segundos</label>

            <div className="display-flex">
                <button onClick={ReturnLobby} className="normalButton">Volver</button>
                <button onClick={RefreshOptions} className="normalButton">Actualizar</button>
            </div>
        </Fragment>
    );
}

export default LobbyOptions;