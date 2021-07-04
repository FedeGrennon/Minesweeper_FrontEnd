class User
{
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
        this.token = null;
    }

    async LoginUser(password)
    {
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            'Content-Type': 'application/json',
        }

        let bodySend = { name: this.name, password };
        console.log(bodySend);
        let response = await fetch(`/account/login`, { method: 'POST', headers, body: JSON.stringify(bodySend) });
        console.log(response);
    }
}

export default User;