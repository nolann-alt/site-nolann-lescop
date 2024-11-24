const btnGrow = document.getElementById('but1-grow-js');

btnGrow.addEventListener('click', () => {
    btnGrow.classList.add('grow-animation');

setTimeout(() => {
    btnGrow.classList.remove('grow-animation');

}, 300); // Retire l'animation après 300ms
});

