import { loadTranslations, updateInterface } from './i18n.js';

async function init() {
    // Carrega o idioma padrão (pt) ao iniciar
    const data = await loadTranslations('pt');
    updateInterface(data);
}

const languageButtons = document.querySelectorAll('.language-switcher button');
// Seta a linguagem como PT-BR ao carregar
languageButtons[0].classList.add('active');
// Altera entre os idiomas
languageButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const lang = button.textContent.toLowerCase();
        languageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const data = await loadTranslations(lang);
        updateInterface(data);
    });
});

init();