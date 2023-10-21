import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/table';

const table = document.querySelector('.container');


await update();


async function solve() {

   const searchBtn = table.querySelector('#searchBtn');
   searchBtn.addEventListener('click', onClick);


   function onClick() {
      console.log('clicked')
      const searchboxElement = document.getElementById('searchField');
      update(searchboxElement.value);
      searchboxElement.value = '';

   }

}

function checkForMatch(name, email, course, match) {
   return name?.toLowerCase().includes(match) ||
          email?.toLowerCase().includes(match) ||
          course?.toLowerCase().includes(match);
}


function tableTemplate(data, match) {

      
   return html`  
     <thead>
            <tr>
                <th>Student name</th>
                <th>Student email</th>
                <th>Student course</th>
            </tr>
        </thead>

        <tbody>

            ${data.map(x => tableRowTemplate(x, match))}
           
        </tbody>

        <tfoot>
            <tr>
                <td colspan="3">
                    <input type="text" id="searchField" />
                    <button type="button" id="searchBtn">Search</button>
                </td>
            </tr>
        </tfoot> 
   `
}


function tableRowTemplate(x, match) {


   return html`   
         <tr class = ${match && checkForMatch(x.name, x.email, x.course, match.toLowerCase()) ? 'select' : ''}>
            <td>${x.firstName} ${x.lastName}</td>
            <td>${x.email}</td>
            <td>${x.course}</td>
         </tr>
   `;
}

   
async function update(match = '') {
   const data = await getData();
   render(tableTemplate(Object.values(data), match), table);
}

async function getData() {
   const response = await fetch(url);
   return response.json();
}



solve();




