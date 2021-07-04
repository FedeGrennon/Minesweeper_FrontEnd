class Cell
{
    constructor(row, column)
    {
        this.row = row;
        this.column = column;
        this.minesArround = 0;
        this.isMine = false;
        this.isShow = false;
        this.isFlagg = false;
        this.isMark = false;
        this.bonusFlagg = false;
    }
}

export default Cell;