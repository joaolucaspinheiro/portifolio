
export async function loadTranslations(lang) {
    try {
        // Busca o arquivo específico baseado no idioma (pt ou en)
        const response = await fetch(`./js/i18n/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Erro ao carregar a tradução (${lang}):`, error);
        return null;
    }
}

export function updateInterface(data) {
    if (!data) return;
    // 1. Traduz elementos de texto (h1, p, a, button, label, etc.)
    // Procura por qualquer tag que tenha o atributo data-i18n
    const textElements = document.querySelectorAll('[data-i18n]');
    textElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            el.textContent = data[key];
        }
    });
    // 2. Traduz placeholders de campos de entrada (input, textarea)
    // Procura por qualquer tag que tenha o atributo data-i18n-placeholder
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (data[key]) {
            el.placeholder = data[key];
        }
    });
}