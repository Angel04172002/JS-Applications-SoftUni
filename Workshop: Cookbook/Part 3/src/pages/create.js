import { getToken } from "../auth.js";

const createSection = document.querySelector('.create');
const createForm = createSection.querySelector('form');

createForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    const data = {
        name,
        img,
        ingredients,
        steps
    };
   
    fetch('http://localhost:3030/data/recipes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken()
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Successfully created recipe!');
        })
});

export function renderCreate() {
    createSection.style.display = 'block';
}
