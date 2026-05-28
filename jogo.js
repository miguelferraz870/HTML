// Elementos do HTML
        const player = document.getElementById('player');
        const farmGrid = document.getElementById('farm-grid');
        const sellBox = document.getElementById('sell-box');
        
        // Elementos da UI (Textos)
        const displayMoney = document.getElementById('display-money');
        const displayInventory = document.getElementById('display-inventory');

        // Lógica de Economia e Inventário
        let money = 0;
        let inventory = 0;
        const tomatoPrice = 15; // Cada tomate vale 15 moedas de ouro

        // Movimentação
        let playerX = 280;
        let playerY = 280;
        const playerSpeed = 15;
        const maxCoord = 555;
        const minCoord = 5;

        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'w' && playerY > minCoord) playerY -= playerSpeed;
            if (key === 's' && playerY < maxCoord) playerY += playerSpeed;
            if (key === 'a' && playerX > minCoord) playerX -= playerSpeed;
            if (key === 'd' && playerX < maxCoord) playerX += playerSpeed;

            player.style.top = playerY + 'px';
            player.style.left = playerX + 'px';
        });

        // Criar o Grid
        for (let i = 0; i < 25; i++) {
            const plot = document.createElement('div');
            plot.classList.add('plot');
            plot.dataset.state = 'grama'; 

            plot.addEventListener('click', () => {
                interagirComLote(plot);
            });

            farmGrid.appendChild(plot);
        }

        // Sistema de Plantação e Colheita
        function interagirComLote(plot) {
            let estado = plot.dataset.state;

            if (estado === 'grama') {
                plot.classList.add('arada');
                plot.dataset.state = 'arada';
            } 
            else if (estado === 'arada') {
                plot.dataset.state = 'plantada';
                plot.innerHTML = '🌱';
            } 
            else if (estado === 'plantada') {
                plot.classList.add('regada');
                plot.dataset.state = 'regada';

                setTimeout(() => {
                    if (plot.dataset.state === 'regada') {
                        plot.innerHTML = '🍅';
                        plot.dataset.state = 'pronto';
                    }
                }, 5000);
            }
            else if (estado === 'pronto') {
                // Ao colher, agora vai para o INVENTÁRIO
                plot.innerHTML = '';
                plot.classList.remove('arada', 'regada');
                plot.dataset.state = 'grama';
                
                inventory++; // Adiciona 1 tomate
                atualizarHUD();
            }
        }

        // Sistema de Vendas
        sellBox.addEventListener('click', () => {
            if (inventory > 0) {
                const totalGanho = inventory * tomatoPrice;
                money += totalGanho; // Adiciona o dinheiro
                inventory = 0;       // Esvazia os tomates do bolso
                
                atualizarHUD();
                
                // Pequeno feedback visual na caixa
                sellBox.style.backgroundColor = '#2ecc71';
                setTimeout(() => sellBox.style.backgroundColor = '#8e44ad', 200);
            }
        });

        // Função para atualizar os textos na tela
        function atualizarHUD() {
            displayInventory.innerText = inventory;
            displayMoney.innerText = money;
        }