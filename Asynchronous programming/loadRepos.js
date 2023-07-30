function loadRepos() {

	let usernameInputElement = document.getElementById('username');
	let repositoryList = document.getElementById('repos');

	const url =  'https://api.github.com/users'

	fetch(`${url}/${usernameInputElement.value}/repos`)
		.then(res => res.json())
		.then(res => {

			repositoryList.innerHTML = '';

			res.forEach(repo => {

				let liElement = document.createElement('li');
				let repoLink = document.createElement('a');

				repoLink.href = repo.html_url;
				repoLink.target = '_blank';
				repoLink.textContent = repo.full_name;

				liElement.appendChild(repoLink);
				repositoryList.appendChild(liElement);
			});
		})
		.catch(err => {
			let liElement = document.createElement('li');
			liElement.textContent = `404 Not Found`;
			repositoryList.appendChild(liElement);
		});
		
}
