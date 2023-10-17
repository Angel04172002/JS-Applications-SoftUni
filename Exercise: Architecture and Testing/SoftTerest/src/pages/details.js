import { createPostDetails } from "../utils/creator.js";
import { hideContent } from "../services/auth.js";
import { router } from "./router.js";
import * as ideaService from "../services/ideaService.js";


const detailsSection = document.querySelector('#details-holder');

export function showDetails(e) {

    e.preventDefault();

    ideaService.showIdeaDetails(e.target.id)
        .then((idea) => {
            detailsSection.replaceChildren(createPostDetails(idea));
            hideContent();
            detailsSection.style.display = 'block';
        });
    
    detailsSection.addEventListener('click', deleteIdea);
}


function deleteIdea(e) {

    e.preventDefault();

    if(e.target.tagName === 'A' && e.target.classList.contains('detb')) {

        ideaService.deleteIdea(e.target.id)
            .then(() => {
                router('/dashboard');
            });
    };
}
