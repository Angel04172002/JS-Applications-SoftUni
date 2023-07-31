async function solution() {

    const mainElement = document.getElementById('main');
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(baseUrl);
    const data = await response.json();


    for (let item of data) {

        const articleUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${item._id}`;

        const articleResponse = await fetch(articleUrl);
        const articleData = await articleResponse.json();

        const accordionDiv = div(
            { class: 'accordion' },
            div(
                { class: 'head' },
                span({}, `${item.title}`),
                button(
                    { class: 'button', id: `${item._id}` },
                    'More'
                ),
            ),
            div(
                {class: 'extra'},
                p(articleData.content)
            ),
        );

        mainElement.appendChild(accordionDiv);
        mainElement.addEventListener('click', toggle);
    }

    function toggle(e) {

        if (e.target.tagName !== 'BUTTON') {
            return;
        };

        const extraDivElement = e.target.parentNode.parentNode.querySelector('.extra');
        
        if(e.target.textContent === 'More') {

            e.target.textContent = 'Less';
            extraDivElement.style.display = 'block';
            return;
        };

        e.target.textContent = 'More';
        extraDivElement.style.display = 'none';
    }

    function createElement(type, props, ...data) {

        const element = document.createElement(type);

        for (let prop in props) {

            if (prop === 'class') {
                element.classList.add(props[prop]);
                continue;
            };

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

    function button(props, ...data) {
        return createElement('button', props, ...data);
    }

    function div(props, ...data) {
        return createElement('div', props, ...data);
    }

    function span(props, ...data) {
        return createElement('span', props, ...data);
    }

    function p(...data) {
        return createElement('p', {}, ...data);
    }

}
