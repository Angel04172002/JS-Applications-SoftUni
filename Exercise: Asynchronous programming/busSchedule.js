function solve() {

    const departButtonElement = document.getElementById('depart');
    const arriveButtonElement = document.getElementById('arrive');
    const infoBoxElement = document.querySelector('#info span');

    let stopId = {
        next: 'depot'
    };

    async function depart() {

        departButtonElement.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;

        const response = await fetch(url);
        stopId = await response.json();

        infoBoxElement.textContent = `Next stop ${stopId.name}`;

        arriveButtonElement.disabled = false;
    }

    function arrive() {

        departButtonElement.disabled = false;
        infoBoxElement.textContent = `Arriving at ${stopId.name}`;
        arriveButtonElement.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
