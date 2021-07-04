import React, { useState, useEffect, Fragment } from 'react';
import socket from './dist/js/SocketManager.js';
import Login from './components/Login';
import Loading from './components/Loading';
import ConnectError from './components/ConnectError';
import SelectMode from './components/SelectMode';
import CreateLobby from './components/CreateLobby';
import SearchGame from './components/SearchGame';
import JoinLobby from './components/JoinLobby';
import Lobby from './components/Lobby';
import Game from './components/Game';
import LobbyOptions from './components/LobbyOptions';
import './dist/css/global.css';
import './dist/css/loader.css';
import './dist/css/menu.css';
import './dist/css/lobby.css';
import './dist/css/chat.css';
import './dist/css/game.css';

function App() {
  const [page, setPage] = useState('loading');

  useEffect(() => {
    //socket.on('connect', () => setTimeout(() => setPage('login'), 1500));
    //socket.on('reconnect_failed', () => setPage('connectError'));

    setTimeout(() => setPage('login'), 2000);
  }, []);

  return (
    <Fragment>
      { page === 'game' && <Game setPage={setPage} /> }

      { page !== 'game' &&
        <div className="menu active">
            { page !== 'lobby' && page !== 'lobbyOptions' && page !== 'game' &&
                <h1>Buscaminas</h1>
            }
            
            { page === 'loading' &&
              <div>
                <h2>Cargando</h2>
                <Loading setPage={setPage} /> 
              </div>
            }

            { page === 'connectError' && <ConnectError setPage={setPage} /> }
            { page === 'login' && <Login setPage={setPage} /> }
            { page === 'modeSelect' && <SelectMode setPage={setPage} /> }
            
            { page === 'createLobby' && <CreateLobby setPage={setPage} /> }
            { page === 'searchGame' && <SearchGame setPage={setPage} /> }
            { page === 'joinLobby' && <JoinLobby setPage={setPage} /> }

            { page === 'lobby' && <Lobby setPage={setPage} /> }
            { page === 'lobbyOptions' && <LobbyOptions setPage={setPage} /> }
        </div>
      }
    </Fragment>
  );
}

export default App;