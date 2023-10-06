function div(props, ...data) {
    return createElement('div', props, ...data);
}

function span(props, ...data) {
    return createElement('span', props, ...data);
}
function p(props, ...data) {
    return createElement('p', {}, ...data);
}

function img(props) {
    return createElement('img', props);
}

function timeCreate(...data) {
    return createElement('time', {}, ...data);
}

function heading(number, props, ...data) {
    return createElement(`h${number}`, props, ...data);
}

function a(props, ...data) {
    return createElement('a', props, ...data);
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

export function createPostComponent(obj) {

    const result = div(
        { className: 'topic-container' },
        div(
            { className: 'topic-name-wrapper' },
            div(
                { className: 'topic-name' },
                a(
                    { href: '#', class: 'normal', id: obj._id },
                    heading(
                        2,
                        {},
                        obj.topicName
                    ),
                ),
                div(
                    { className: 'columns' },
                    div(
                        {},
                        p({}, `Date: `, timeCreate(obj.timeCreated)),
                        div(
                            { className: 'nick-name' },
                            p(
                                {},
                                `Username: ${obj.username}`
                            ),
                        ),
                    ),
                ),
            ),
        ),
    );

    result._id = obj._id;

    return result;
}

export function createPostHeader(title, username, postContent, time) {

   
    return div(
        { className: 'header' },
        img(
            { src: '../static/profile.png', alt: 'avatar' }
        ),
        p(
            {},
            `${span({}, username).textContent} posted on ${time}`,
        ),
        p(
            { className: 'post-content' },
            postContent
        ),
    );

}

export function createCommentStructure(obj) {
    return div(
        { id: 'user-comment' },
        div(
            { className: 'topic-name-wrapper' },
            div(
                { className: 'topic-name' },
                p(
                    {},
                    `${obj.username} commented on ${obj.date}`

                ),
                div(
                    { className: 'post-content' },
                    p(
                        {},
                        obj.postText
                    ),
                ),
            ),
        ),
    );
}



