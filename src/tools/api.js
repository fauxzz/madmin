import { baseUri, prefixUri } from "./constants"

const headerjson = {"Content-Type": "application/json"};
export const headerBearer = (token) => {return {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}};
export const headerBearerFormData = (token) => {return {"Authorization": `Bearer ${token}`}};


export const post = async (path, data, headers = null) => await new Promise((resolve, reject) => {
    fetch(`${baseUri}${prefixUri}${path}`, {
        method: "post",
        body: JSON.stringify(data),
        headers: headers ?? headerjson
    }).then(response =>response.json())
    .then(result => resolve(result))
    .catch(err => reject(err))
})

export const postFormData = async (path, data, headers = null) => await new Promise((resolve, reject) => {
    let fd = new FormData();
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            fd.append(key, data[key]);
        }
    }
    fetch(baseUri+prefixUri+path, {
        method: "post",
        body: fd,
        // mode: "cors",
        headers: headers !== null ? headers : headerjson
    }).then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error))
})

export const get = async (path, headers = null) => await new Promise((resolve, reject) => {
    fetch(baseUri+prefixUri+path, {
        method: "get",
        headers: headers !== null ? headers : headerjson
    }).then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error))
})

export const remove = async (path, headers = null) => await new Promise((resolve, reject) => {
    fetch(baseUri+prefixUri+path, {
        method: "delete",
        headers: headers !== null ? headers : headerjson
    }).then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error));
});