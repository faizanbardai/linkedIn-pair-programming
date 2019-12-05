const baseUrl = "https://striveschool.herokuapp.com/api/profile/";
const DeleteExperience = async (item, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        "Content-Type": "application/json"
    });
    let URL = baseUrl + username + "/experiences/" + item

    try {
        let response = await fetch(URL, {
            method: "DELETE",
            headers
        })
        if (response.ok) {
            return await response
        }
    } catch (error) {
        console.log(error);
    }
}

export default DeleteExperience;