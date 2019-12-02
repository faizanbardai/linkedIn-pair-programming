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

const UpdateProfile = async (body, id) => {
    let URL = baseURL+"/?_id="+id
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