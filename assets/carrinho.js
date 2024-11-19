let carrinho = [];

function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const totalElemento = document.getElementById('total');
    carrinhoLista.innerHTML = ''; 

    let total = 0;
    const listaItensCarrinho = document.getElementById('itens-carrinho'); 

    listaItensCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} 
                        <button onclick="removerDoCarrinho(${item.id})">Remover</button>`;
        listaItensCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalElemento.textContent = total.toFixed(2); 
}


function adicionarAoCarrinho(id, nome, preco) {
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 }); 
    }
    console.log(carrinho); 
    atualizarCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    console.log(carrinho);
    atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function (event) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const nome = event.target.getAttribute('data-nome');
            const preco = parseFloat(event.target.getAttribute('data-preco'));

            console.log(`Adicionando ao carrinho: ${nome} - R$${preco}`); 
            adicionarAoCarrinho(id, nome, preco); 
        });
    });
});

document.getElementById('finalizar-compra').addEventListener('click', function () {
    if (carrinho.length > 0) {
        alert('Compra finalizada! Total: R$' + document.getElementById('total').textContent);
        carrinho = [];
        atualizarCarrinho();
    } else {
        alert('Carrinho vazio! Adicione itens antes de finalizar.');
    }
});

window.onload = function () {
    atualizarCarrinho();
};

const produtos = JSON.parse(localStorage.getItem('produtos'));

function carregarProdutos() {
    const container = document.querySelector('.caixa-container');
    container.innerHTML = "";

    if (produtos) {
        produtos.forEach(produto => {
            const item = document.createElement('div');
            item.classList.add('caixa-item');
            item.dataset.id = produto.id;

            item.innerHTML = `
     <img src="${produto.imagem}" alt="${produto.nome}">
     <h3>${produto.nome}</h3>
     <div class="preco">R$${produto.preco.toFixed(2)} <span>R$${produto.precoAntigo.toFixed(2)}</span></div>
     <button class="botao add-to-cart" data-id="${produto.id}" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</button>
     `;

            container.appendChild(item);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function (event) {
                const id = parseInt(event.target.getAttribute('data-id'));
                const nome = event.target.getAttribute('data-nome');
                const preco = parseFloat(event.target.getAttribute('data-preco'));

                console.log(`Adicionando ao carrinho: ${nome} - R$${preco}`);
                adicionarAoCarrinho(id, nome, preco);
            });
        });
    } else {
        container.innerHTML = '<p>Produtos não encontrados.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
