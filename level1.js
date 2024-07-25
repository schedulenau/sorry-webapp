document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze');
    const player = document.getElementById('player');
    let playerPosition = { top: 0, left: 0 };
    let mazeSize = { width: 300, height: 300 };
    let cellSize = 20;

    const maze = generateMaze(mazeSize.width / cellSize, mazeSize.height / cellSize);
    renderMaze(maze, mazeContainer);

    document.getElementById('up-lvl1').addEventListener('click', () => movePlayer('up'));
    document.getElementById('down-lvl1').addEventListener('click', () => movePlayer('down'));
    document.getElementById('left-lvl1').addEventListener('click', () => movePlayer('left'));
    document.getElementById('right-lvl1').addEventListener('click', () => movePlayer('right'));

    function updatePlayerPosition() {
        player.style.top = `${playerPosition.top}px`;
        player.style.left = `${playerPosition.left}px`;
        console.log(playerPosition.top, playerPosition.left);
        checkExit();
    }

    function movePlayer(direction) {
        let newPosition = { ...playerPosition };
        switch (direction) {
            case 'up':
                newPosition.top -= cellSize;
                break;
            case 'down':
                newPosition.top += cellSize;
                break;
            case 'left':
                newPosition.left -= cellSize;
                break;
            case 'right':
                newPosition.left += cellSize;
                break;
        }
        if (canMoveTo(newPosition)) {
            playerPosition = newPosition;
            updatePlayerPosition();
        }
    }

    function canMoveTo(position) {
        const row = position.top / cellSize;
        const col = position.left / cellSize;
        return maze[row] && maze[row][col] === 0;
    }

    function checkExit() {
        console.log(playerPosition.top, playerPosition.left);
        console.log(mazeSize.width - cellSize, mazeSize.height - cellSize);
        if (playerPosition.top >= mazeSize.width - cellSize && playerPosition.left >= mazeSize.height - cellSize) {
            apologyParts.push('Я');
            document.getElementById('next-level1').classList.remove('hidden');
            console.log('exit');
        }
    }

    function generateMaze(rows, cols) {
        const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
        const stack = [];
        const directions = [
            { x: 0, y: -2 },
            { x: 2, y: 0 },
            { x: 0, y: 2 },
            { x: -2, y: 0 }
        ];

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function carve(x, y) {
            maze[x][y] = 0;
            stack.push({ x, y });

            while (stack.length > 0) {
                const current = stack[stack.length - 1];
                shuffle(directions);

                let carved = false;
                for (const { x: dx, y: dy } of directions) {
                    const nx = current.x + dx;
                    const ny = current.y + dy;

                    if (nx > 0 && nx < rows - 1 && ny > 0 && ny < cols - 1 && maze[nx][ny] === 1) {
                        maze[nx - dx / 2][ny - dy / 2] = 0;
                        maze[nx][ny] = 0;
                        stack.push({ x: nx, y: ny });
                        carved = true;
                        break;
                    }
                }

                if (!carved) {
                    stack.pop();
                }
            }
        }

        carve(1, 1);
        maze[0][0] = 0;
        maze[0][1] = 0;

        maze[rows - 1][cols - 2] = 0;
        maze[rows - 1][cols - 1] = 0;

        return maze;
    }

    function renderMaze(maze, container) {
        container.innerHTML = '';
        maze.forEach(row => {
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                if (cell === 1) {
                    cellDiv.classList.add('wall');
                }
                container.appendChild(cellDiv);
            });
        });
    }
});