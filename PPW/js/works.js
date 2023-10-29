const githubUsername = 'donmaruko';
const numberOfRepos = 5;

const projectsContainer = document.getElementById('projects');

async function fetchGitHubRepos(username, limit) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`);
        const repos = await response.json();

        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

function displayGitHubRepos(repos) {
    if (repos.length === 0) {
        projectsContainer.innerHTML = '<p>No GitHub repositories found.</p>';
    } else {
        projectsContainer.innerHTML = '<h2>My GitHub Projects</h2>';
        const ul = document.createElement('ul');

        repos.forEach((repo) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = '_blank';
            li.appendChild(link);
            ul.appendChild(li);
        });

        projectsContainer.appendChild(ul);
    }
}

fetchGitHubRepos(githubUsername, numberOfRepos)
    .then(displayGitHubRepos)
    .catch((error) => {
        console.error('Failed to fetch and display GitHub repositories:', error);
    });
