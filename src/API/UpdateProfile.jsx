// import authorization from './Authorization';
// const credentials = authorization("striveLinkedIn");

const baseURL = "https://strive-school-testing-apis.herokuapp.com/api/profile/";
// const username = credentials.username;
// const password = credentials.password;


const UpdateProfile = async (body, id, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        "Content-Type": "application/json"
    });
    let URL = baseURL + "/?_id=" + id
    try {
        let response = await fetch(URL, {
            method: "PUT",
            body: JSON.stringify(body),
            headers
        })
        if (response) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default UpdateProfile;