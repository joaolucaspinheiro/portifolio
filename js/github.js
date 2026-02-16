export async function fetchGithub() {
    try {
        const response = await fetch("https://api.github.com/users/joaolucaspinheiro/repos");// Buscando dados
        if (!response.ok) {
            console.log('No such response');
            return;
        }

        const repos = await response.json();
        const container = document.getElementById('project-list');
        container.innerHTML = '';
        const cardRepos = repos.map(repo => {
            return `
                <div class="project-card">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>
            `;
        });
        container.innerHTML = cardRepos.join('');
    }catch (error) {
        console.log(error.message);
    }
}