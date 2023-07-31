async function getInfo() {
    
    const stopIdElement = document.getElementById('stopId');
    const stopNameDiv = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdElement.value}`;

    busesList.innerHTML = '';
    const response = await fetch(url);

    if(response.status !== 200) {
        stopNameDiv.textContent = 'Error';
        return;
    };

    const data = await response.json();
    stopNameDiv.textContent = data.name;
   

    Object.entries(data.buses).forEach(x => {

        let liElement = document.createElement('li');
        liElement.textContent = `Bus ${x[0]} arrives in ${x[1]} minutes`;
        busesList.appendChild(liElement);
    });
}
