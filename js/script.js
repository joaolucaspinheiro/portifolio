const languageButtons = document.querySelectorAll('.language-switcher button');
// Seta a linguagem como PT-BR ao carregar
languageButtons[0].classList.add('active');
// Altera entre os idiomas
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        languageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
