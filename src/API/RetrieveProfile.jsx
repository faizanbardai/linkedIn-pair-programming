import authorization from './Authorization';
const credentials = authorization("striveLinkedIn");

const baseURL = credentials.baseURL;
const username = credentials.username;
const password = credentials.password;
const auth = btoa(username + ":" + password);
const headers = new Headers({
    "Authorization": "Basic " + auth,
    "Content-Type": "application/json"
});

const RetrieveProfile = async (user) => {
    let URL = baseURL+user
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

export default RetrieveProfile;