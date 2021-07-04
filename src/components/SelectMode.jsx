import React, { Fragment } from 'react';
import variables from './GlobalVariables';

const SelectMode = (props) => {
    const CreateLobby = () => {
        props.setPage('createLobby');
    }

    const SearchGame = () => {
        props.setPage('searchGame');
    }

    const JoinLobby = () => {
        props.setPage('joinLobby');
    }

    return (
        <Fragment>
            <h2 id="txtSelectSubTitle">{variables.user.name}</h2>
            <button onClick={CreateLobby} className="normalButton" id="btnShowCreateLobby">Crear partida</button>
            <button onClick={SearchGame} className="normalButton" id="btnSearchGame">Buscar partida</button>
            <button onClick={JoinLobby} className="normalButton" id="btnShowJoinLobby">Unirse a una partida</button>
        </Fragment>
    );
}

export default SelectMode;