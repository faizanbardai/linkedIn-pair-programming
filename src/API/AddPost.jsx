import authorization from "./Authorization";
const credentials = authorization("striveLinkedIn")
const baseUrl = "https://striveschool.herokuapp.com/api/posts/";
const username = credentials.username;
const password = credentials.password;
const auth = btoa(username + ":" + password);
const headers = new Headers({
    "Authorization": "Basic " + auth,
    "Content-Type": "application/json"
});

const AddPost = async (text) => {
    let URL = baseUrl

    try {
        let response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(text),
            headers
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default AddPost;