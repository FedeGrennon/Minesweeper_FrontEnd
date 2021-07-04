import User from './User';

class RoundUser extends User
{
    constructor(user)
    {
        super(user.id, user.name);
        this.end = false;
        this.lose = false;
        this.percentageComplete = 0;
        this.points = 0;
        this.timeInMilliseconds = 0;
    }
}

export default RoundUser;