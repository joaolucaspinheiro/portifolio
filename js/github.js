export async function fetchGithub() {
    try {
        const response = await fetch("https://api.github.com/users/joaolucaspinheiro/repos");
        if (!response.ok) {
            console.log('no such response');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export function renderProjects(repos, translations) {
    const container = document.getElementById('project-list');
    if (!container) return;

    container.innerHTML = Array.isArray(repos) ? repos.map(repo => {
        const viewText = translations?.viewRepo || "Ver Projeto";
        return `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}" target="_blank">${viewText}</a>
            </div>
        `;
    }).join(''): '';
}