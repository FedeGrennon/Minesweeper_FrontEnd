import socket from '../dist/js/SocketManager';

class Lobby
{
    constructor(id, number, name, shortId, maxPlayers, users, isPrivate, password, isStarted, userLider, gameMode, roundConfiguration)
    {
        this.id = id;
        this.number = number;
        this.name = name;
        this.shortId = shortId;
        this.maxPlayers = maxPlayers;
        this.users = users;
        this.isPrivate = isPrivate;
        this.password = password;
        this.isStarted = isStarted;
        this.userLider = userLider;
        this.gameMode = gameMode;
        this.roundConfiguration = roundConfiguration;
    }

    ApplyData(obj){
        Object.assign(this, obj);
    }

    SearchGame(userId)
    {
        socket.emit('searchGame', userId);
    }

    SendMessage(userId, message)
    {
        let lobbyId = this.id;
        message.substr(0, 200);
        let json = JSON.stringify({ userId, lobbyId, message });
        socket.emit('sendMessage', json);
    }

    CreateLobby(userId)
    {
        let password = this.password.substr(0, 10);
        let maxPlayers = this.maxPlayers;
        let json = JSON.stringify({ userId, password, maxPlayers });
        socket.emit('createLobby', json);
    }

    JoinLobby(userId, shortId, password)
    {
        let json = JSON.stringify({ userId, shortId, password });
        socket.emit('joinLobby', json);
    }

    KickPlayer(userLiderId, userKickId)
    {
        let lobbyId = this.id;
        let json = JSON.stringify({ lobbyId, userLiderId, userKickId });
        socket.emit('kickPlayer', json);
    }

    LeftLobby(userId)
    {
        let lobbyId = this.id;
        let json = JSON.stringify({ lobbyId, userId });
        socket.emit('leftLobby', json);
    }

    PlayGame(userId)
    {
        let lobbyId = this.id;
        let json = JSON.stringify({ lobbyId, userId });
        socket.emit('playGame', json);
    }

    RefreshUserGame(points, userId, percentage, timeInMilliseconds, endGame)
    {
        let lobbyId = this.id;
        socket.emit('refreshUserGame', JSON.stringify({ points, userId, lobbyId, percentage, timeInMilliseconds, endGame }));
    }
}

export default Lobby;