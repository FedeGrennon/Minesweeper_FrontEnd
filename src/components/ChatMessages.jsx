import React from 'react';

const ChatMessages = (props) => {
    return (
        <p><span style={{color: props.color}}>{props.user}: </span>{props.message}<i>{props.time}</i></p>
    );
}

export default ChatMessages;