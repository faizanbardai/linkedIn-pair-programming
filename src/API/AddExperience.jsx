// https://striveschool.herokuapp.com/api/profiles/userName/experiences

// import authorization from './Authorization';
// const credentials = authorization("striveLinkedIn");

const baseURL = "https://striveschool.herokuapp.com/api/profile/"
// const username = credentials.username;
// const password = credentials.password;


const AddExperience = async (exp, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        "Content-Type": "application/json"
    });
    let URL = baseURL + username + "/experiences"
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