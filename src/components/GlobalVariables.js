const { default: User } = require("../classes/User");
const { default: Lobby } = require("../classes/Lobby");
const { default: Images } = require("../classes/Images");

let user = new User();
let lobby = new Lobby();
const images = new Images();
const userChatColors = [ '#F0E85B', '#61DC52', '#49DED4', '#5E61FF', '#FF4B4C', '#DB9D6F' ];

let variables = {
    user,
    lobby,
    images,
    userChatColors
};

export default variables;