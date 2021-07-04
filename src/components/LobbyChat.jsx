import React, { useState, useEffect } from 'react';
import variables from './GlobalVariables';
import socket from '../dist/js/SocketManager';
import ChatMessages from './ChatMessages';

const LobbyChat = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    
    const AddMessage = (message, userName, userId) =>
    {
        if(message)
        {
            let date = new Date();
            date = `${date.getHours()}:${date.getMinutes()} hs`;

            const indexUser = variables.lobby.users.findIndex(x => x.id === userId);
            let messagesAux = [...messages];

            messagesAux.push({
                key: messagesAux.length,
                user: variables.user.id !== userId ? userName : 'Vos',
                message,
                time: date,
                color: variables.userChatColors[indexUser]
            });

            setMessages(messagesAux);
        }
    }

    useEffect(() => {
        socket.on('userSendMessage', (data) =>
        {
            let json = JSON.parse(data);
            setNewMessage(json);
        });

        return () => {
            socket.off('userSendMessage');
        }
    }, []);

    useEffect(() => {
        let bodyMessages = document.getElementById('bodyMessages');
        bodyMessages.scrollTop = bodyMessages.scrollHeight;
    }, [messages]);

    useEffect(() => {
        AddMessage(newMessage.message, newMessage.userName, newMessage.userId);
    }, [newMessage]);

    const SendMessageButton = () => {
        const txtMessage = document.getElementById('txtMessage');
        variables.lobby.SendMessage(variables.user.id, txtMessage.value);

        txtMessage.value = '';
    }

    const OnMessageEnter = (e) => {
        if (e.keyCode === 13)
            SendMessageButton();
    }

    return (
        <div className="messages">
            <div id="bodyMessages" className="body" style={{backgroundColor: props.background}}>
                {
                    messages.map(item =>
                        <ChatMessages
                            key={item.key}
                            user={item.user}
                            message={item.message}
                            time={item.time}
                            color={item.color} />)
                }
            </div>
            <div className="footer">
                <input onKeyUp={OnMessageEnter} id="txtMessage" type="text" placeholder="Enviar mensaje" autoComplete="off" maxLength="200" style={{backgroundColor: props.background}} />
                <button onClick={SendMessageButton}>Enviar</button>
            </div>
        </div>
    );
}

export default LobbyChat;