import { loadTranslations, updateInterface } from './i18n.js';
import { fetchGithub, renderProjects } from './github.js';
let cachedRepos = [];
// Tradução do site
const languageButtons = document.querySelectorAll('.language-switcher button');

// Função principal para inicializar o site
async function init() {
    // 1. Carrega a tradução inicial (PT)
    const initialData = await loadTranslations('pt');
    // Garante que o botão PT esteja visualmente ativo no início
    languageButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === 'pt') {
            btn.classList.add('active');
        }
    });
    // 2. Aplica a tradução na interface estática
    updateInterface(initialData);
    // 3. Caso não tenha os repositorios em cache, busca na api do github
    if(cachedRepos.length === 0){
        cachedRepos = await fetchGithub();
    }
    // monta os repositorios com a tradução
    renderProjects(cachedRepos,initialData);
    // 4. Configura os botões de troca de idioma
    languageButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const lang = button.textContent.toLowerCase();

            // Visual dos botões
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Recarrega tudo com o novo idioma
            const newData = await loadTranslations(lang);
            updateInterface(newData);
            renderProjects(cachedRepos,newData);
        });
    });
}

// Executa a inicialização
init();