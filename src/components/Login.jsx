import React, { useEffect, Fragment } from 'react';
import socket from '../dist/js/SocketManager';
import variables from './GlobalVariables';
import RandomName from '../dist/js/RandomNames';

const Login = (props) => {
    const { setPage } = props;
    
    const SendUser = () => {
        let txtName = document.getElementById('txtName');
        let txtPass = document.getElementById('txtPass');
        variables.user.name = txtName.value;
        variables.user.LoginUser(txtPass.value);
    }

    useEffect(() => {
        socket.on('connectOk', (data) => {
            variables.user.id = JSON.parse(data).id;
            setPage('modeSelect');
        });
        
        socket.on('connectError', () => {
            let errorLogin = document.getElementById('errorLogin');
            errorLogin.textContent = 'El usuario no puede estar vacio.';
        });

        //document.getElementById('txtName').value = RandomName();

        return () => {
            socket.off('connectOk');
            socket.off('connectError');
        }
    }, [setPage]);

    const PressEnter = (e) => {
        if (e.keyCode === 13)
            SendUser();
    }

    return (
        <Fragment>
            <h2>¡Vamos a jugar!</h2>
            <input onKeyUp={PressEnter} className="normalInput" id="txtName" type="text" placeholder="Usuario" autoComplete="off" maxLength="20" />
            <input onKeyUp={PressEnter} className="normalInput" id="txtPass" type="password" placeholder="Contraseña" autoComplete="off" maxLength="12" />
            
            <label className="error" id="errorLogin"></label>

            <button onClick={SendUser} className="normalButton" id="btnConnect">Conectar</button>
            <button onClick={SendUser} className="normalButton" id="btnRegister">Registrar</button>
        </Fragment>
    );
}

export default Login;