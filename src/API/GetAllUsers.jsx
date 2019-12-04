// import authorization from './Authorization';
// const credentials = authorization("striveLinkedIn");

const baseURL = "https://strive-school-testing-apis.herokuapp.com/api/profile/";
// const username = credentials.username;
// const password = credentials.password;


const GetAllUsers = async (username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        "Content-Type": "application/json"
    });
    let URL = baseURL
    try {
        let response = await fetch(URL, {
            method: "GET",
            headers
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default GetAllUsers;