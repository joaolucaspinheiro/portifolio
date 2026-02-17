export async function fetchGithub() {
    try {
        const response = await fetch("https://api.github.com/users/joaolucaspinheiro/repos");
        if (!response.ok) {
            console.log('no such response');
            return [];
        }
        const repos = await response.json();
        return repos.filter(repo => repo.topics.includes("portifolio"));
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export function renderProjects(repos, translations) {
    const container = document.getElementById('project-list');
    if (!container) return;

    const viewText = translations?.viewRepo || "Ver Projeto";
    const baseHTML = Array.isArray(repos) ? repos.map(repo => `
        <div class="project-card">
            <h3>${repo.name}</h3>
            <a href="${repo.html_url}" target="_blank">${viewText}</a>
        </div>
    `).join('') : '';

    // Multiplicamos o conteúdo para não haver buracos no carrossel
    container.innerHTML = baseHTML + baseHTML + baseHTML;
}