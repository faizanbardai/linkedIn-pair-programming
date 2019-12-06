const baseURL = "https://striveschool.herokuapp.com/api/profile/"
const AddExperienceWithImage = async (img, id, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
    });
    let URL = baseURL + username + "/experiences/" + id + "/picture";
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

export default AddExperienceWithImage;