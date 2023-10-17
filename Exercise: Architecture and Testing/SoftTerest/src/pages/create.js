import { createNewIdea } from "../services/ideaService.js";
import { router } from "./router.js";

const createSection = [...document.querySelectorAll('body > .container')][3];

const form = createSection?.querySelector('form');

form?.addEventListener('submit', createNewPost);



export function createNewPost(e) {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageURL');

    try {

        if(title.length < 6) {
            throw new Error('Title must be at least 6 characters long');
        };

        if(description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        };

        if(imageUrl.length < 5) {
            throw new Error('Image must be at least 5 characters long');
        };


        createNewIdea(title, description, imageUrl)
            .then(() => {
                form.reset();
                router('/dashboard');
            });

    } catch(e) {
        console.log(e.message);
    }
}

export function renderCreate() {
    createSection.style.display = 'block';
}

