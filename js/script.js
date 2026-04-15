import { loadTranslations, updateInterface } from './i18n.js';
import { fetchGithub, renderProjects } from './github.js';
let cachedRepos = [];
// Tradução do site
const languageButtons = document.querySelectorAll('.language-switcher button');

// Função principal para inicializar o site
async function init() {
    renderSkills();
    setupContactForm();
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
export function renderSkills() {
    const techs = [
        { name: "Java (Spring)", category: "Backend", icon: "springboot.svg" },
        { name: "React + Vite", category: "Frontend", icon: "react.svg" },
        { name: "TypeScript (Nest)", category: "Backend", icon: "nestjs.svg" },
        { name: "Prisma ORM", category: "Database", icon: "prisma.svg" }
    ];

    const container = document.getElementById('skills-list');
    if (!container) return;

    container.innerHTML = techs.map(tech => `
        <li class="tech-card">
            <span class="tech-category">${tech.category}</span>
            <div class="icon-wrapper">
                <img src="assets/icons/${tech.icon}" alt="${tech.name}" class="tech-icon">
            </div>
            <span class="tech-name">${tech.name}</span>
        </li>
    `).join('');
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit');
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('current-char');

    // Contador de caracteres
    textarea.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCount.textContent = length;
        if (length > 1000) charCount.style.color = 'red';
        else charCount.style.color = '#888';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset de erros
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const formData = {
            name: form.name.value.trim(),
            message: form.message.value.trim()
        };

        // Validação básica
        let hasError = false;

        if (formData.name.length < 3) {
            document.getElementById('error-name').textContent = "Nome muito curto";
            hasError = true;
        }

        if (hasError) return;

        btnSubmit.disabled = true;
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = 'Enviando...';

        // Simula o delay do envio
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Integração WhatsApp apenas com Nome e Mensagem
        const whatsappNumber = "5544991486466";
        const text = `Olá! Meu nome é ${encodeURIComponent(formData.name)}%0A%0AMensagem: ${encodeURIComponent(formData.message)}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Sucesso
        btnSubmit.style.backgroundColor = "#28a745";
        btnSubmit.innerHTML = 'Sucesso! Abrindo Whats...';

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            form.reset();
            charCount.textContent = '0';
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
            btnSubmit.style.backgroundColor = "";
        }, 1000);
    });
}


// Executa a inicialização
init();