import * as ideaService from "../services/ideaService.js";
import { createNewIdeaPost } from "../utils/creator.js";
import { showDetails } from "./details.js";
import { renderEmptyDashboardSection } from "./emptyDashboard.js";

const dashboardSection = document.querySelector('#dashboard-holder');
dashboardSection.addEventListener('click', showDetails);

export function renderDashBoard() {

    dashboardSection.style.display = 'block';

    ideaService.showAllIdeas()
        .then(data => {

            const newIdeaPosts = data.map(createNewIdeaPost);

            if (newIdeaPosts.length === 0) {
               renderEmptyDashboardSection();
               return;
            };

            dashboardSection.replaceChildren(...newIdeaPosts);
        });
}

