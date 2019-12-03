// https://striveschool.herokuapp.com/api/profiles/userName/experiences

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

const AddExperience = async (exp, user) => {
    let URL = baseURL+user+"/experiences"
    try {
        let response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(exp),
            headers
        })
        if (response) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default AddExperience;