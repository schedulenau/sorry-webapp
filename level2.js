document.addEventListener('DOMContentLoaded', () => {
    const noWayBackContainer = document.getElementById('no-way-back');
    const lvl2Player = document.getElementById('lvl2-player');
    const startLvl2 = document.getElementById('start-lvl2');

    let playerPositionLvl2 = { top: 0, left: 0 };
    let noWayBackSize = { width: 300, height: 300 };
    let cellSize = 30;
    let gridSize = noWayBackSize.width / cellSize;

    let correctPath = [];

    startLvl2.addEventListener('click', () => {
        playerPositionLvl2 = { top: 0, left: 0 };
        updatePlayerPositionLvl2();

        createGrid();
        correctPath = generatePath();
        console.log(correctPath);
        renderPath();
        setTimeout(() => clearPath(), 10000);
    });

    function updatePlayerPositionLvl2() {
        lvl2Player.style.top = `${playerPositionLvl2.top}px`;
        lvl2Player.style.left = `${playerPositionLvl2.left}px`;

        if (playerPositionLvl2.left === 300) {
            apologyParts.push('прошу');
            document.getElementById('next-level2').classList.remove('hidden');
        }
    }

    function movePlayerLvl2(direction) {
        let newPosition = { ...playerPositionLvl2 };
        switch (direction) {
            case 'up':
                newPosition.top -= cellSize;
                newPosition.top = Math.max(0, newPosition.top);
                break;
            case 'down':
                newPosition.top += cellSize;
                newPosition.top = Math.min(noWayBackSize.height-cellSize, newPosition.top);
                break;
            case 'left':
                newPosition.left -= cellSize;
                newPosition.left = Math.max(0, newPosition.left);
                break;
            case 'right':
                newPosition.left += cellSize;
                newPosition.left = Math.min(noWayBackSize.width, newPosition.left);
                break;
        }

        if (canMoveToLvl2(newPosition)) {
            playerPositionLvl2 = newPosition;
            updatePlayerPositionLvl2();
        } else {
            resetPlayerLvl2();
        }
        console.log(playerPositionLvl2);
    }

    function canMoveToLvl2(position) {
        // Перевірка, чи гра ініціалізована
        if (!correctPath || correctPath.length === 0) {
            console.error('Game not initialized or correctPath is empty');
            return false;
        }

        // Перевірка на можливість руху вліво (на початок рівня)
        if (position.left === 0) {
            return true;
        }

        // Конвертуємо позицію з пікселів у координати сітки
        const gridX = (position.left-cellSize) / cellSize;
        const gridY = position.top / cellSize;

        // Перевірка на можливість руху вправо
        // Перевіряємо, чи поточна позиція є частиною правильного шляху
        return correctPath[gridY] && correctPath[gridY][gridX] === 1;
    }

    function resetPlayerLvl2() {
        playerPositionLvl2 = { top: 0, left: 0 };
        updatePlayerPositionLvl2();
    }

    function createGrid() {
        noWayBackContainer.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('lvl2-cell');
                noWayBackContainer.appendChild(cell);
            }
        }
    }

    function generatePath() {
        const m = gridSize;
        const n = gridSize;
        // Создаем пустую сетку
        const grid = Array(m).fill().map(() => Array(n).fill(0));
            
        // Выбираем случайную начальную и конечную y-координату
        const startY = Math.floor(Math.random() * m);
        const endY = Math.floor(Math.random() * m);
        
        let x = 0;
        let y = startY;
        
        // Функция для проверки, является ли ход допустимым
        const isValidMove = (x, y) => x >= 0 && x < n && y >= 0 && y < m && grid[y][x] === 0;
        
        // Функция для выполнения хода
        const makeMove = () => {
            grid[y][x] = 1;
            
            // Если достигли правого края, завершаем
            if (x === n - 1) return true;
            
            // Определяем возможные направления движения
            const directions = [
                [0, -1], // вверх
                [0, 1],  // вниз
                [1, 0]   // вправо
            ];
            
            // Перемешиваем направления для случайности
            directions.sort(() => Math.random() - 0.5);
            
            // Пробуем сделать ход в каждом направлении
            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;
                if (isValidMove(newX, newY)) {
                    x = newX;
                    y = newY;
                    if (makeMove()) return true;
                    // Если ход не удался, возвращаемся
                    x -= dx;
                    y -= dy;
                    grid[y][x] = 0;
                }
            }
            
            return false;
        }
        
        // Генерируем маршрут
        makeMove();
        
        // Убеждаемся, что конечная точка достигнута
        grid[endY][n-1] = 1;
        
        return grid;
    }

    function renderPath() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const index = j * gridSize + i;
                if (correctPath[j][i] === 1) {
                    noWayBackContainer.children[index].classList.add('correct');
                }
            }
        }
    }

    function clearPath() {
        Array.from(noWayBackContainer.children).forEach(cell => cell.classList.remove('correct'));
    }


    // Обробники подій для кнопок рівня 2
    document.getElementById('up-lvl2').addEventListener('click', () => movePlayerLvl2('up'));
    document.getElementById('down-lvl2').addEventListener('click', () => movePlayerLvl2('down'));
    document.getElementById('left-lvl2').addEventListener('click', () => movePlayerLvl2('left'));
    document.getElementById('right-lvl2').addEventListener('click', () => movePlayerLvl2('right'));
});