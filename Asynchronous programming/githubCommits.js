function loadCommits() {

    let usernameElement = document.getElementById('username');
    let repositoryElement = document.getElementById('repo');
    let commitListElement = document.getElementById('commits');

    const url = `https://api.github.com/repos/${usernameElement.value}/${repositoryElement.value}/commits`;

    fetch(url)
        .then(res => res.json())
        .then(res => {

            commitListElement.innerHTML = '';

            res.forEach(x => {

                let liElement = document.createElement('li');
                liElement.textContent = `${x.commit.author.name}: ${x.commit.message}`
                commitListElement.appendChild(liElement);
            });
        })
        .catch(err => {

            let liElement = document.createElement('li');
            liElement.textContent = `Error: 404 (Not Found)`;
            commitListElement.appendChild(liElement);
        });

}
