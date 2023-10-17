import * as request from "./request.js";

const ideasUrl = 'http://localhost:3030/data/ideas';
const ideasShowUrl = `${ideasUrl}?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`;


export function showAllIdeas() {
    return request.get(ideasUrl);
}


export function createNewIdea(title, description, image) {
    return request.post(ideasUrl, { title, description, image });
}

export function deleteIdea(id) {
    return request.del(`${ideasUrl}/${id}`);
}

export function showIdeaDetails(id) {
    return request.get(`${ideasUrl}/${id}`);
}

