import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import variables from './GlobalVariables';

const GameEndUsers = (props) => {
    let display = '';

    let minutes = Math.floor((props.timeInMilliseconds / 1000) / 60);
    let seconds = Math.floor((props.timeInMilliseconds / 1000));
    let milliseconds = Math.floor((props.timeInMilliseconds % 1000));

    seconds = minutes > 0 ? seconds - (60 * minutes) : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let time =  `${minutes}:${seconds}.${milliseconds}`;

    if(props.end) {
        if(props.number === 1)
            display = <tr className={(props.percentageComplete < 100) ? 'timeEnd' : ''}>
                        <td>{props.number}</td>
                        <td><FontAwesomeIcon style={{color:'#f7ff00'}} icon={faCrown} /> {(variables.user.id === props.id) ? 'Vos' : props.name}</td>
                        <td>{props.points}</td>
                        <td>{props.percentageComplete}</td>
                        <td>{(props.percentageComplete < 100) ? 'Agotado' : time}</td>
                    </tr>
        else
            display = <tr className={(props.percentageComplete < 100) ? 'timeEnd' : ''}>
                        <td>{props.number}</td>
                        <td>{(variables.user.id === props.id) ? 'Vos' : props.name}</td>
                        <td>{props.points}</td>
                        <td>{props.percentageComplete}</td>
                        <td>{(props.percentageComplete < 100) ? 'Agotado' : time}</td>
                    </tr>
    } else {
        display = <tr className="playing">
                    <td>{props.number}</td>
                    <td>{(variables.user.id === props.id) ? 'Vos' : props.name}</td>
                    <td>{props.points}</td>
                    <td>{props.points}</td>
                    <td>{props.percentageComplete}</td>
                    <td>Jugando</td>
                </tr>;
    }

    return (
        display
    );
}

export default GameEndUsers;