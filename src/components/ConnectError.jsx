import React, { Fragment } from 'react';

const ConnectError = () => {
    return (
        <Fragment>
            <label className="error">Error al intentar conectar con el servidor.</label>
            <label className="error">Espere unos momentos e intente nuevamente.</label>
        </Fragment>
    );
}

export default ConnectError;