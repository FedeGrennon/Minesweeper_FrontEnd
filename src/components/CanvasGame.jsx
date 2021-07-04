import React, { useEffect, useState } from 'react';
import variables from './GlobalVariables';
import Cell from '../classes/Cell';
import BodyCells from './BodyCells';

const maxAcumulative = parseInt(process.env.REACT_APP_MAX_ACUMULATIVE_PERCENTAGE);
const basePointsPerCell = parseInt(process.env.REACT_APP_BASE_POINTS);
const basePercentage = parseInt(process.env.REACT_APP_BASE_PERCENTAGE);
const percentageBonuEnd = parseInt(process.env.REACT_APP_PERCENTAGE_BUNS_END);
const cantFlagsToBonus = parseInt(process.env.REACT_APP_CANT_FLAGS_BONUS);
const bonusPerFlags = parseInt(process.env.REACT_APP_BONUS_PER_FLAGS);
const bonusPerBomb = parseInt(process.env.REACT_APP_BONUS_PER_BOMB);

const CanvasGame = (props) => {
    const { setLocalUser, playing, localUser } = props;
    const [cells, setCells] = useState([]);
    const [flagsLeft, setFlags] = useState(variables.lobby.roundConfiguration.mineCount);
    const [points, setPoints] = useState(0);
    const [minesLeft, setMines] = useState(variables.lobby.roundConfiguration.mineCount);
    const [percentageComplete, setPercentage] = useState(0);
    const [bonus, setBonus] = useState(basePercentage);
    const [consecutivesFlags, setConsecutivesFlags] = useState(0);

    const InitCells = () => {
        const columns = variables.lobby.roundConfiguration.gridWidth;
        const rows = variables.lobby.roundConfiguration.gridHeigth;
        const mines = variables.lobby.roundConfiguration.randomMines;
        let columnsArray = [];
        
        for(let column = 0; column < columns; column++)
        {
            let cellArray = [];

            for(let row = 0; row < rows; row++)
            {
                let cellIndex = cellArray.push(new Cell(row, column)) - 1;
                let mineIndex = (column * rows) + row;
                let isMine = mines.some(mine => mine === mineIndex);
                cellArray[cellIndex].isMine = isMine;
                if(!isMine) cellArray[cellIndex].minesArround = MinesArround(row, column, rows, mines);
            }

            columnsArray.push({ column, cells: cellArray });
        }

        return columnsArray;
    }

    const MinesArround = (cellRow, cellColumn, rows, mines) => {
        let minesArround = 0;
        
        mines.forEach(mine => {
            let column = Math.floor(mine/rows);
            let row = Math.floor(mine - (rows * column));
            if
            (
                (column + 1 === cellColumn && row + 1 === cellRow) ||
                (column + 1 === cellColumn && row === cellRow) ||
                (column + 1 === cellColumn && row - 1 === cellRow) ||
                (column === cellColumn && row + 1 === cellRow) ||
                (column === cellColumn && row - 1 === cellRow) ||
                (column - 1 === cellColumn && row + 1 === cellRow) ||
                (column - 1 === cellColumn && row === cellRow) ||
                (column - 1 === cellColumn && row - 1 === cellRow)
            )
                minesArround++;
        });

        return minesArround;
    }
    
    const GetCellArrond = (cell, index) => {
        let row = cell.row;
        let column = cell.column;

        switch(index) {
            case 0:
                column--;
                row--;
                break;
            case 1:
                column--;
                break;
            case 2:
                column--;
                row++;
                break;
            case 3:
                row--;
                break;
            case 4:
                row++;
                break;
            case 5:
                column++;
                row--;
                break;
            case 6:
                column++;
                break;
            default:
                column++;
                row++;
                break;
            }

            if(column < 0 || row < 0 || 
                column >= variables.lobby.roundConfiguration.gridWidth ||
                row >= variables.lobby.roundConfiguration.gridHeigth)
                return false
            else
                return cells[column].cells[row];
    }

    const ToggleMarkArroundCell = (cell) => {
        for(let i = 0; i < 8; i++) {
            let cellArround = GetCellArrond(cell, i);

            if(cellArround){
                if(!cellArround.isShow && !cellArround.isFlagg)
                cells[cellArround.column].cells[cellArround.row].isMark = true;
            } 
        }

        
    }

    const GetMinesAndFlagsArround = (cell) => {
        let falgsCount = 0;
        let mineShowCount = 0;

        for(let i = 0; i < 8; i++){
            let cellArround = GetCellArrond(cell, i);

            if(cellArround) {
                falgsCount += cellArround.isFlagg ? 1 : 0;
                mineShowCount += cellArround.isShow && cellArround.isMine ? 1 : 0;
            }
        }

        return falgsCount + mineShowCount;
    }

    const ShowArroundCell = (cell) => {
        let points = 0;

        if(GetMinesAndFlagsArround(cell) === cell.minesArround)
            for(let i = 0; i < 8; i++) {
                let cellArround = GetCellArrond(cell, i);

                if(cellArround) {
                    if(!cellArround.isShow && !cellArround.isFlagg) {
                        let cellUpdate = cells[cellArround.column].cells[cellArround.row];

                        cellUpdate.isShow = true;

                        if(cellUpdate.isMine)
                            ClickInMine(cellUpdate);
                        else {
                            points += GetPointsByCell(cellUpdate);
                        
                            if(cellUpdate.minesArround === 0)
                                points += ShowArroundCell(cellUpdate);
                        }
                    }
                }
            }

        return points;
    }

    const GetPercentageComplete = () => {
        let cantComplete = 0;
        cells.forEach(x => x.cells.forEach(y => cantComplete += !y.isMine && y.isShow ? 1 : 0));
        const configs = variables.lobby.roundConfiguration;
        const all = (configs.gridHeigth * configs.gridWidth) - configs.mineCount;
        return parseInt((cantComplete * 100) / all);
    }

    const ResizeTable = () => {
        const table = document.getElementById('tblGame');
        const gameBody = document.querySelector('.game-body');
        const canvasGame = document.querySelector('.canvas-game');

        let tableWidth = table.scrollWidth;

        const innerHeight = gameBody.scrollHeight;

        const maxWidth = canvasGame.scrollWidth;
        const maxHeight = innerHeight;

        const gridWidth = variables.lobby.roundConfiguration.gridWidth;
        const gridHeigth = variables.lobby.roundConfiguration.gridHeigth;


        if(gridWidth < gridHeigth)
        {
            tableWidth = maxWidth - 40;
            let heighTable = ((tableWidth / gridHeigth) - 1) * gridWidth;

            if(heighTable > maxHeight)
                tableWidth = innerHeight - 40;
        }
        else {
            tableWidth = (maxHeight / gridWidth * gridHeigth) - 20;
        }

        table.style.width = `${tableWidth}px`;
    }

    const ClickInMine = (cell) => {
        if(bonus + bonusPerBomb > 0)
            setBonus(bonus + bonusPerBomb);
        else
            setBonus(0);

        setMines(minesLeft - 1);
        cell.isShow = true;
    }

    const GetPointsByCell = (cell) => {
        if(!cell.isMine && cell.minesArround !== 0) {
            return basePointsPerCell * ((bonus / 100) + 1);
        } else
            return 0;
    }

    useEffect(() => {
        setCells(InitCells());
        ResizeTable();
        window.addEventListener('resize', () => ResizeTable());
    }, []);

    useEffect(() => {
        const usr = localUser;

        if(percentageComplete >= 100) {
            const columns = variables.lobby.roundConfiguration.gridWidth;
            const rows = variables.lobby.roundConfiguration.gridHeigth;

            let p = points;
            p += (columns * rows) * (percentageBonuEnd / 100);
            setPoints(points);
        }

        setLocalUser({
            percentage: percentageComplete,
            points: Math.ceil(points),
            mines: usr.mines
        });
    }, [percentageComplete, points]);

    useEffect(() => {
        setPercentage(GetPercentageComplete());
    }, [cells]);

    const MouseButtonDown = (e) => {
        if(e.button === 1)
            e.preventDefault();

        if(e.button === 0)
        {
            if(e.target.nodeName === 'IMG' && playing) {
                let row = parseInt(e.target.getAttribute('row'));
                let column = parseInt(e.target.getAttribute('column'));
                let cellsCopy = [...cells];
                let cell = cellsCopy[column].cells[row];

                if(cell.isShow && !cell.isMine)
                {
                    ToggleMarkArroundCell(cell);

                    setCells(cellsCopy);
                }
            }
        }
    }

    const MouseButtonUp = (e) => {
        if(e.target.nodeName === 'IMG' && playing) {
            let row = parseInt(e.target.getAttribute('row'));
            let column = parseInt(e.target.getAttribute('column'));
            let cellsCopy = [...cells];
            let cell = cellsCopy[column].cells[row];

            cellsCopy.forEach(x => x.cells.forEach(y => y.isMark = false));

            if(e.button === 2)
            {
                if(!cell.isShow)
                {
                    let flags = flagsLeft;
                    let cFlags = consecutivesFlags;

                    if(cell.isFlagg)
                    {
                        flags++;
                        cell.isFlagg = false;

                        if(cell.isMine && cFlags > 0)
                            cFlags--;
                        else
                            cFlags = 0;
                    }
                    else if (flags > 0)
                    {
                        flags--;
                        cell.isFlagg = true;
                        
                        if(cell.isMine && !cell.bonusFlagg) {
                            cFlags++;

                            const maxFlagsToBonus = Math.ceil(variables.lobby.roundConfiguration.mineCount * (cantFlagsToBonus / 100));
                            if(cFlags === maxFlagsToBonus) {
                                if(bonus + bonusPerFlags <= maxAcumulative)
                                    setBonus(bonus + bonusPerFlags);
                                cFlags = 0;
                            }
                        }
                    }

                    setConsecutivesFlags(cFlags);
                    setFlags(flags);
                    setCells(cellsCopy);
                    return;
                }
            }

            if(e.button === 0)
            {
                let pointInClick = points;

                if(cell.isMine && !cell.isFlagg && !cell.isShow)
                {
                    ClickInMine(cell);
                }
                else if(cell.isShow)
                {
                    pointInClick += ShowArroundCell(cell);
                }
                else if(!cell.isFlagg && !cell.isShow)
                {
                    cell.isShow = true;
                    pointInClick += GetPointsByCell(cell);
                    pointInClick += ShowArroundCell(cell);
                }

                setPoints(pointInClick);
                setCells(cellsCopy);
            }
        }
    }

    return (
        <div className="canvas-game">
            <div className="table-game">
                <table id="tblGame" onMouseUp={MouseButtonUp} onMouseDown={MouseButtonDown} onContextMenu={(e) => e.preventDefault()}>
                    <BodyCells cells={cells} />
                </table>
            </div>
        </div>
    );
}

export default CanvasGame;