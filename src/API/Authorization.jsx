const authorization = (serverName, username, password) => {
    const credentials =
    {
        "striveLinkedIn": {
            "baseURL": "https://strive-school-testing-apis.herokuapp.com/api/profile/",
            "username" : {username},
            "password" : {password}
            // "username": "user24",
            // "password": "48D4vaVh6Ra3DD8w"
            // "username": "user22",
            // "password": "ykeZdCYNLs2dqbMc"
        }
    };
    return credentials[serverName];
};
export default authorization;