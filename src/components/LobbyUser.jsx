import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faTimes } from "@fortawesome/free-solid-svg-icons";
import variables from './GlobalVariables';

const LobbyUser = (props) => {
    const KickUser = (userId) => {
        variables.lobby.KickPlayer(variables.user.id, userId);
    }

    return (
        <tr>
            { props.user && 
                <td>{props.number}</td>
            }

            { props.user && props.userLider === props.userId && props.number === 1 &&
                <td colSpan="2">
                    <FontAwesomeIcon style={{color:'#f7ff00'}} icon={faCrown} /> {props.userId === variables.user.id ? "Vos" : props.user}
                </td>
            }

            { props.user && props.userLider === variables.user.id && props.number > 1 && 
                <Fragment>
                    <td>{props.userId === variables.user.id ? "Vos" : props.user}</td>
                    <td onClick={() => KickUser(props.userId)} className="kick">
                        <FontAwesomeIcon icon={faTimes} />
                    </td>
                </Fragment>
            }


            { props.user && props.userLider !== props.userId && props.userLider !== variables.user.id &&
                <td>{props.userId === variables.user.id ? "Vos" : props.user}</td>
            }

            { !props.user && 
                <Fragment>
                    <td>-</td>
                    <td colSpan="2">----Vacio----</td>
                </Fragment>
            }
        </tr>
    );
}

export default LobbyUser;