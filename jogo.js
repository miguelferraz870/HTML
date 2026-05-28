// Configurações e Elementos
        const gameContainer = document.getElementById('game-container');
        const player = document.getElementById('player');
        const farmGrid = document.getElementById('farm-grid');

        // Posição Inicial do Jogador
        let playerX = 280;
        let playerY = 280;
        const playerSpeed = 15;

        // Limites do mapa
        const maxCoord = 555;
        const minCoord = 5;

        // Movimentação do Jogador (WASD)
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'w' && playerY > minCoord) playerY -= playerSpeed;
            if (key === 's' && playerY < maxCoord) playerY += playerSpeed;
            if (key === 'a' && playerX > minCoord) playerX -= playerSpeed;
            if (key === 'd' && playerX < maxCoord) playerX += playerSpeed;

            // Atualiza posição visual
            player.style.top = playerY + 'px';
            player.style.left = playerX + 'px';
        });

        // Criar o Grid de Plantação (5x5)
        for (let i = 0; i < 25; i++) {
            const plot = document.createElement('div');
            plot.classList.add('plot');
            
            // Estado do lote: 'grama', 'arada', 'plantada', 'regada', 'pronto'
            plot.dataset.state = 'grama'; 

            plot.addEventListener('click', () => {
                interagirComLote(plot);
            });

            farmGrid.appendChild(plot);
        }

        // Lógica de Fazenda (Estados do clique)
        function interagirComLote(plot) {
            let estado = plot.dataset.state;

            if (estado === 'grama') {
                // 1. Ara a terra
                plot.classList.add('arada');
                plot.dataset.state = 'arada';
            } 
            else if (estado === 'arada') {
                // 2. Planta a semente
                plot.dataset.state = 'plantada';
                plot.innerHTML = '🌱'; // Broto
            } 
            else if (estado === 'plantada') {
                // 3. Rega a planta
                plot.classList.add('regada');
                plot.dataset.state = 'regada';

                // Inicia o tempo de crescimento (5 segundos)
                setTimeout(() => {
                    progredirCrescimento(plot);
                }, 5000);
            }
            else if (estado === 'pronto') {
                // 4. Colhe a planta amadurecida
                plot.innerHTML = '';
                plot.classList.remove('arada', 'regada');
                plot.dataset.state = 'grama';
                alert('🍅 Você colheu um tomate fresco!');
            }
        }

        // Transição de crescimento pós-rega
        function progredirCrescimento(plot) {
            if (plot.dataset.state === 'regada') {
                plot.innerHTML = '🍅'; // Virou um tomate pronto!
                plot.dataset.state = 'pronto';
            }
        }