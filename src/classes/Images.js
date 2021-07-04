class Images
{
    constructor()
    {
        this.imgMine = new Image();
        this.imgFlagg = new Image();
        this.imgUnpressed = new Image();
        this.imgMarked = new Image();
        this.img0 = new Image();
        this.img1 = new Image();
        this.img2 = new Image();
        this.img3 = new Image();
        this.img4 = new Image();
        this.img5 = new Image();
        this.img6 = new Image();
        this.img7 = new Image();
        this.img8 = new Image();
        this.InstanceImages();
    }

    InstanceImages()
    {
        this.imgMine.src = '../dist/assets/sprites/Mine.png';
        this.imgFlagg.src = '../dist/assets/sprites/Flagg.png';
        this.imgUnpressed.src = '../dist/assets/sprites/Unpressed.png';
        this.imgMarked.src = '../dist/assets/sprites/Marked.png';
        this.img0.src = '../dist/assets/sprites/0.png';
        this.img1.src = '../dist/assets/sprites/1.png';
        this.img2.src = '../dist/assets/sprites/2.png';
        this.img3.src = '../dist/assets/sprites/3.png';
        this.img4.src = '../dist/assets/sprites/4.png';
        this.img5.src = '../dist/assets/sprites/5.png';
        this.img6.src = '../dist/assets/sprites/6.png';
        this.img7.src = '../dist/assets/sprites/7.png';
        this.img8.src = '../dist/assets/sprites/8.png';
    }

    GetImage(cell)
    {
        if(cell.isMine && cell.isShow)
            return this.imgMine;

        if(cell.isFlagg)
            return this.imgFlagg;

        if(cell.isMark)
            return this.imgMarked;

        if(cell.isShow)
        {
            switch(cell.minesArround)
            {
                case 1:
                    return this.img1;
                case 2:
                    return this.img2;
                case 3:
                    return this.img3;
                case 4:
                    return this.img4;
                case 5:
                    return this.img5;
                case 6:
                    return this.img6;
                case 7:
                    return this.img7;
                case 8:
                    return this.img8;
                default:
                    return this.img0;
            }
        }

        return this.imgUnpressed;
    }
}

export default Images;