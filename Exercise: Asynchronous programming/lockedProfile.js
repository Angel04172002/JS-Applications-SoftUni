async function lockedProfile() {

    const mainElement = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    const data = await response.json();
    const info = Object.values(data);

    for (let { username, email, age } of info) {

        const profileDiv = div(
            { class: 'profile' },
            img(
                { src: './iconProfile2.png', class: 'userIcon' }
            ),
            label('Lock'),
            input({ type: 'radio', name: 'user1Locked', value: 'lock', checked: true }),
            label('Unlock'),
            input({ type: 'radio', name: 'user1Locked', value: 'unlock' }),
            createElement('br'),
            createElement('hr'),
            label('Username'),
            input({ type: 'text', name: 'user1Username', value: `${username}`, disabled: true, readonly: true }),
            div(
                { id: 'user1HiddenFields', style: 'display: none' },
                createElement('hr'),
                label('Email:'),
                input({ type: 'email', name: 'user1Email', value: `${email}`, disabled: true, readonly: true }),
                label('Age:'),
                input({ type: 'email', name: 'user1Age', value: `${age}`, disabled: true, readonly: true }),
            ),

            button({}, 'Show more')
        );

        mainElement.appendChild(profileDiv);
    };



    mainElement.addEventListener('click', showMoreInfo);


    function showMoreInfo(e) {


        if (e.target.tagName !== 'BUTTON') {
            return;
        };

        const hiddenDiv = e.target.previousElementSibling;
        const checkbox = e.target.parentNode.querySelector("input[value='lock']");

        if (checkbox.checked) {
            return;
        };

        if (e.target.textContent === 'Show more') {

            e.target.textContent = 'Show less';
            hiddenDiv.style.display = 'block';
            return;
        };


        e.target.textContent = 'Show more';
        hiddenDiv.style.display = 'none';
    }


    function label(...data) {
        return createElement('label', {}, ...data);
    }

    function input(props) {
        return createElement('input', props);
    }

    function div(props, ...data) {
        return createElement('div', props, ...data);
    }

    function img(props) {
        return createElement('img', props);
    }

    function button(props, ...data) {
        return createElement('button', props, ...data);
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

}
