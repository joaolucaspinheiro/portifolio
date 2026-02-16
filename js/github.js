export async function fetchGithub(translations) {
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
            // Se não houver tradução carregada, usamos um texto padrão (fallback)
            const viewText = translations?.viewRepo || "Ver Projeto";

            return `
                <div class="project-card">
                    <h3>${repo.name}</h3>
                    <a href="${repo.html_url}" target="_blank">${viewText}</a>
                </div>
            `;
        });
        container.innerHTML = cardRepos.join('');
    }catch (error) {
        console.log(error.message);
    }
}