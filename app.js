// import axios from "axios"

let uri = "https://jsonplaceholder.typicode.com/";


let getUsers = async () => {
    let res = await axios.get(uri + "users")

    return [...res.data]
}
let getUser= async (id) => {
    let res = await axios.get(uri + "users"+`/${id}`)
    return res.data
}
let getPosts = async () => {
    let res = await axios.get(uri + "posts")
    return res.data
}

getPosts().then(posts => {
    console.log(posts)
})
let getComments = async (id) => {
    let res = await axios.get(uri + `posts/${id}/comments`)
    return res.data
}

let makePost = async (data) => {
    let res = await axios.post(uri + "posts", data)
    return res
}

// Export functions to be used in index.js
// export { getUsers, getPosts, getComments, makePost };

// if (import.meta.url === `file://${process.argv[1]}`) {
//     console.log('Returning index.js');
//     import('./index.js');
// }
