function attachEvents() {

    const weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    const locationInputElement = document.getElementById('location');
    const getWeatherButtonElement = document.getElementById('submit');

    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');
    const labelUpcomingDivElement = document.querySelector('#upcoming .label');
    const labelCurrentDivElement = currentDiv.querySelector('.label');

    getWeatherButtonElement.addEventListener('click', showWeather);


    async function showWeather(e) {

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';

        const response = await fetch(url);
        const data = await response.json();
        const locationObj = data.find(x => x.name === locationInputElement.value);
        forecastDiv.style.display = 'block';


        if (!locationObj) {

   
            const forecastInfoDiv = document.querySelector('.forecast-info');
            const forecastsDivElement = document.querySelector('.forecasts');


            if (forecastInfoDiv) { 

                forecastInfoDiv.innerHTML = '';
                forecastInfoDiv.classList.remove('forecast-info');
            };

            if (forecastsDivElement) { 
                forecastsDivElement.innerHTML = '' ;
                forecastsDivElement.classList.remove('forecasts');
            };

            labelCurrentDivElement.textContent = 'Error';
            labelUpcomingDivElement.textContent = '';
            labelUpcomingDivElement.classList.remove('label');
            return;
        };

        labelUpcomingDivElement.classList.add('label');
        labelUpcomingDivElement.textContent = 'Three-day forecast';
        const codeOfLocationObj = locationObj.code;

        const currentConditionsUrl = `http://localhost:3030/jsonstore/forecaster/today/${codeOfLocationObj}`;
        const threeDaysForecastUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${codeOfLocationObj}`;

        const conditionsResponse = await fetch(currentConditionsUrl);
        const conditionsData = await conditionsResponse.json();
        labelCurrentDivElement.textContent = conditionsData.name;

        const threeDaysForecastResponse = await fetch(threeDaysForecastUrl);
        const threeDaysForecastData = await threeDaysForecastResponse.json();


        const forecastsDiv = div(

            { class: 'forecasts' },
            span({ class: 'condition', class: 'symbol' }, weatherSymbols[conditionsData.forecast.condition]),
            span({ class: 'condition' },

                span({ class: 'forecast-data' }, conditionsData.name),
                span({ class: 'forecast-data' }, `${conditionsData.forecast.low}${weatherSymbols.Degrees}/${conditionsData.forecast.high}${weatherSymbols.Degrees}`),
                span({ class: 'forecast-data' }, conditionsData.forecast.condition)
            ),
        );


        const forecastInfoDiv = div(

            { class: 'forecast-info' },

            span(
                { class: 'upcoming' },
                span(
                    { class: 'symbol' },
                    weatherSymbols[threeDaysForecastData.forecast[0].condition]
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[0].low}${weatherSymbols.Degrees}/${threeDaysForecastData.forecast[0].high}${weatherSymbols.Degrees}`
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[0].condition}`
                ),
            ),
            span(
                { class: 'upcoming' },
                span(
                    { class: 'symbol' },
                    weatherSymbols[threeDaysForecastData.forecast[1].condition]
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[1].low}${weatherSymbols.Degrees}/${threeDaysForecastData.forecast[1].high}${weatherSymbols.Degrees}`
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[1].condition}`
                ),
            ),
            span(
                { class: 'upcoming' },
                span(
                    { class: 'symbol' },
                    weatherSymbols[threeDaysForecastData.forecast[2].condition]
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[2].low}${weatherSymbols.Degrees}/${threeDaysForecastData.forecast[2].high}${weatherSymbols.Degrees}`
                ),
                span(
                    { class: 'forecast-data' },
                    `${threeDaysForecastData.forecast[2].condition}`
                ),
            ),
        );

        currentDiv.appendChild(forecastsDiv);
        upcomingDiv.appendChild(forecastInfoDiv);

    }

    function div(props, ...data) {
        return createElement('div', props, ...data);
    }

    function span(props, ...data) {
        return createElement('span', props, ...data);
    }


    function createElement(type, props, ...data) {

        const element = document.createElement(type);

        for (let prop in props) {

            if (prop === 'class') {
                element.classList.add(props[prop]);
                continue;
            }

            element[prop] = props[prop];
        }

        for (let entry of data) {

            if (typeof entry === 'string' || typeof entry === 'number') {
                entry = document.createTextNode(entry);
            }

            element.appendChild(entry);
        }

        return element;
    }
}


attachEvents();
