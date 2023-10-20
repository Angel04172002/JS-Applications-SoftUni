import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const mainSection = document.getElementById('allCats');
mainSection.addEventListener('click', toggle);

const allCatsTemplate = (cats) => html` 
<ul>
         ${cats.map(catTemplate)}

</ul>

`;


const catTemplate = (cat) => html` 

            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">${cat.showInfo ? 'Hide status code' : 'Show status code'}</button>
                    <div class="status" style= ${cat.showInfo ? "display: block" : "display: none"} id=${cat.id}>
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>

`


const root = document.getElementById('allCats');

cats.forEach(c => c.showInfo = false);

update();


function update() {
    render(allCatsTemplate(cats), root);
}


function toggle(e) {

    e.preventDefault();

    const statusId = e.target.parentNode.querySelector('.status').id;
    const currentCat = cats.find(x => x.id == statusId);
    currentCat.showInfo = !currentCat.showInfo;

    update();

}



