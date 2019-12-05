// "Content-Type":"multipart/form-data"
const baseURL = "https://striveschool.herokuapp.com/api/profile/"
const PostProfileImage = async (img, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        // "Content-Type":"multipart/form-data"
    });
    let URL = baseURL + username + "/picture"
    try {
        let response = await fetch(URL, {
            method: "POST",            
            body: img,
            headers
        })
        if (response) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default PostProfileImage;