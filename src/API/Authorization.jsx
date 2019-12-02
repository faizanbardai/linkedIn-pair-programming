const authorization = (serverName) => {
    const credentials =
    {
        "striveLinkedIn": {
            "baseURL": "https://strive-school-testing-apis.herokuapp.com/api/profile/",
            "username": "user24",
            "password": "48D4vaVh6Ra3DD8w"
        }
    };
    return credentials[serverName];
};
export default authorization;