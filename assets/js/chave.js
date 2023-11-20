const equipes = JSON.parse(localStorage.getItem('equipes')) || [];

function sortear(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function gerarCompeticao() {
    const container = document.getElementById('torneio');
    container.innerHTML = '';

    sortear(equipes);

    const competicao = {
        equipes: equipes,
        rodada: 1
    };

    equipes.forEach((equipe, index) => {
        if (index % 2 === 0) {
            const disputaContainer = document.createElement('div');
            disputaContainer.classList.add('disputa-container');

            const equipe1 = equipe;
            const equipe1Div = document.createElement('div');
            equipe1Div.classList.add('equipe');
            equipe1Div.innerHTML = `<img src="${equipe1.imagem}" alt="Imagem de ${equipe1.nome}" draggable="true"><p>${equipe1.nome}</p>`;

            equipe1Div.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ imagem: equipe1.imagem }));
            });

            disputaContainer.appendChild(equipe1Div);

            if (index + 1 < equipes.length) {
                const vsDiv = document.createElement('div');
                vsDiv.textContent = 'VS';
                vsDiv.classList.add('vs');

                const equipe2 = equipes[index + 1];
                const equipe2Div = document.createElement('div');
                equipe2Div.classList.add('equipe');
                equipe2Div.innerHTML = `<img src="${equipe2.imagem}" alt="Imagem de ${equipe2.nome}" draggable="true"><p>${equipe2.nome}</p>`;

                equipe2Div.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ imagem: equipe2.imagem }));
                });

                disputaContainer.appendChild(vsDiv);
                disputaContainer.appendChild(equipe2Div);
            } else {
                const aguardandoDiv = document.createElement('div');
                aguardandoDiv.classList.add('bye');
                aguardandoDiv.textContent = 'Aguardando...';
                disputaContainer.appendChild(aguardandoDiv);
            }

            container.appendChild(disputaContainer);
        }
    });
}

function exibirCompeticao(competicao) {
    const container = document.getElementById('torneio');
    container.innerHTML = '';

    competicao.equipes.forEach((equipe, index) => {
        if (index % 2 === 0) {
            const disputaContainer = document.createElement('div');
            disputaContainer.classList.add('disputa-container');

            const equipe1 = equipe;
            const equipe1Div = document.createElement('div');
            equipe1Div.classList.add('equipe');
            equipe1Div.innerHTML = `<img src="${equipe1.imagem}" alt="Imagem de ${equipe1.nome}" draggable="true"><p>${equipe1.nome}</p>`;

            equipe1Div.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ imagem: equipe1.imagem }));
            });

            disputaContainer.appendChild(equipe1Div);

            if (index + 1 < competicao.equipes.length) {
                const vsDiv = document.createElement('div');
                vsDiv.textContent = 'VS';
                vsDiv.classList.add('vs');

                const equipe2 = competicao.equipes[index + 1];
                const equipe2Div = document.createElement('div');
                equipe2Div.classList.add('equipe');
                equipe2Div.innerHTML = `<img src="${equipe2.imagem}" alt="Imagem de ${equipe2.nome}" draggable="true"><p>${equipe2.nome}</p>`;

                equipe2Div.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ imagem: equipe2.imagem }));
                });

                disputaContainer.appendChild(vsDiv);
                disputaContainer.appendChild(equipe2Div);
            } else {
                const aguardandoDiv = document.createElement('div');
                aguardandoDiv.classList.add('bye');
                aguardandoDiv.textContent = 'Aguardando...';
                disputaContainer.appendChild(aguardandoDiv);
            }

            container.appendChild(disputaContainer);
        }
    });
}

const quadros = document.querySelectorAll('.quadro');
quadros.forEach((quadro) => {
    quadro.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    quadro.addEventListener('drop', (e) => {
        e.preventDefault();

        const droppedData = JSON.parse(e.dataTransfer.getData('text/plain'));

        const imagemSrc = droppedData.imagem;
        const imagem = document.createElement('img');
imagem.src = imagemSrc;
imagem.alt = 'Imagem arrastada';

imagem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ imagem: imagemSrc }));
});

        // Remove o conteúdo existente da div "quadro" antes de adicionar a nova imagem
        while (quadro.firstChild) {
            quadro.removeChild(quadro.firstChild);
        }

        // Defina a largura e altura da imagem para que ela caiba perfeitamente no quadro
        imagem.style.maxWidth = '100%';
        imagem.style.maxHeight = '100%';

        quadro.appendChild(imagem);
    });
});

const botaoGerarCompeticao = document.querySelector('.gerar-btn');
botaoGerarCompeticao.addEventListener('click', function() {
    const confirmacao = confirm('Deseja realmente gerar uma nova competição?');
    if (confirmacao) {
        gerarCompeticao();
    }
});

document.getElementById('select-equipes').addEventListener('change', function () {
    var selectedCompetidores = this.value;

    var chaves = document.querySelectorAll('.chave');
    chaves.forEach(function (chave) {
        chave.style.display = 'none';
    });

    var chaveSelecionada = document.querySelector('.' + selectedCompetidores);
    if (chaveSelecionada) {
        chaveSelecionada.style.display = 'block';
    }
});

document.getElementById('mostrar-regular').addEventListener('click', function () {
    document.querySelector('.container-regular').style.display = 'block';
    document.querySelector('.container-repescagem').style.display = 'none';
});

document.getElementById('mostrar-repescagem').addEventListener('click', function () {
    
    document.querySelector('.container-regular').style.display = 'none';
    document.querySelector('.container-repescagem').style.display = 'block';
});

document.getElementById('mostrar-ambas').addEventListener('click', function () {
    document.querySelector('.container-regular').style.display = 'block';
    document.querySelector('.container-repescagem').style.display = 'block';
});