import React from 'react';
import variables from './GlobalVariables';

const BodyCells = (props) => {
    return(
        <tbody>
            {
                props.cells.map(column =>
                    <tr key={'tr' + column.column}>
                        {column.cells.map(cell =>
                            <td key={'td' + cell.column + cell.row}>
                                <img key={'img' + cell.column+ cell.row} alt="cell" draggable="false" onDragStart={(e) => e.preventDefault()} src={variables.images.GetImage(cell).src} row={cell.row} column={cell.column} />
                            </td>
                        )}
                    </tr>
                )
            }
        </tbody>
    );
}

export default BodyCells;