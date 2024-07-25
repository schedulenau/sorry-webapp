// Загальний контекст
let apologyParts = [];

// Загальні функції та обробники подій
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const level1 = document.getElementById('level1');
    const level2 = document.getElementById('level2');
    const finalScreen = document.getElementById('final-screen');
    const startBtn = document.getElementById('start-btn');
    const nextLevel1 = document.getElementById('next-level1');
    const nextLevel2 = document.getElementById('next-level2');
    const apologyMessage = document.getElementById('apology-message');
    
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        level1.classList.remove('hidden');
        apologyMessage.textContent = apologyParts.join(' ');
    });

    nextLevel1.addEventListener('click', () => {
        level1.classList.add('hidden');
        level2.classList.remove('hidden');
        apologyMessage.textContent = apologyParts.join(' ');
    });

    nextLevel2.addEventListener('click', () => {
        level2.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        apologyMessage.textContent = apologyParts.join(' ');
    });
});