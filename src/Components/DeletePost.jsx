const baseUrl = "https://striveschool.herokuapp.com/api/posts/";
const DeletePost = async (item, username, password) => {
    const auth = btoa(username + ":" + password);
    const headers = new Headers({
        "Authorization": "Basic " + auth,
        "Content-Type": "application/json"
    });
    let URL = baseUrl + item
    try {
        let response = await fetch(URL, {
            method: "DELETE",
            headers
        })
        if (response.ok) {
            return response.status
        }
    } catch (error) {
        console.log(error);
    }
}

export default DeletePost;