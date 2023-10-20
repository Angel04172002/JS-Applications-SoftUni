import { towns } from "./towns.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";


const listTemplate = (ctx) => html`  

         <article>
               <div id="towns">
                     ${ctx.towns.map(t => townTemplate(t, ctx.match))}
               </div>
               <input type="text" id="searchText" />
               <button @click = ${search}>Search</button>
               <div id="result">${countMatches(ctx.towns, ctx.match)}</div>
         </article>
`;


const townTemplate = (town, match) => html`
   <li class = ${(match && town.toLowerCase().includes(match)) ? 'active' : ''}>${town}</li>`;


const root = document.body;


update();

const searchboxElement = document.getElementById('searchText');


function search(e) {

   e.preventDefault();

   if(searchboxElement.value == '') {
      return;
   };

   const searchValue = searchboxElement.value.toLowerCase();

   update(searchValue);

}

function update(match = "") {

   render(listTemplate({ towns, match }), root)
}


function countMatches(towns, match) {

   const filteredTowns = towns.filter(x => match && x.toLowerCase().includes(match.toLowerCase()));

   return `${filteredTowns.length} matches found`;

}


