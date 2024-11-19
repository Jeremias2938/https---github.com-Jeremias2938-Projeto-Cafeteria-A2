const produtos = JSON.parse(localStorage.getItem('produtos')) || [
    {
        id: 1,
        nome: "Café com Leite",
        preco: 9.99,
        precoAntigo: 5.99,
        imagem: "./assets/img/cafe com leite.jpg"
    },
    {
        id: 2,
        nome: "Café coado",
        preco: 7.99,
        precoAntigo: 13.99,
        imagem: "./assets/img/cafe coado.jpg"
    },
    {
        id: 3,
        nome: "Capuccino",
        preco: 10.00,
        precoAntigo: 17.50,
        imagem: "./assets/img/capuccino.jpg"
    },
    {
        id: 4,
        nome: "Achocolatado",
        preco: 10.00,
        precoAntigo: 14.50,
        imagem: "./assets/img/achocolatado.jpg"
    },
    {
        id: 5,
        nome: "Esfiha de Carne",
        preco: 5.50,
        precoAntigo: 9.00,
        imagem: "./assets/img/esfiha.jpg"
    },
    {
        id: 6,
        nome: "Coxinha",
        preco: 3.00,
        precoAntigo: 8.00,
        imagem: "./assets/img/coxinha.jpg"
    }
];

function carregarProdutos() {
    const container = document.querySelector('.caixa-container');
    container.innerHTML = "";

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('caixa-item');
        item.dataset.id = produto.id; 

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <div class="preco">R$${produto.preco.toFixed(2)} <span>R$${produto.precoAntigo.toFixed(2)}</span></div>
            <a href="carrinho.html" class="botao">Ver Carrinho</a>
        `;

        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});


function converterImagemBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

function salvarProduto(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const precoAntigo = parseFloat(document.getElementById('precoAntigo').value);
    const imagemInput = document.getElementById('imagem');
    const id = document.getElementById('form-produto').dataset.id;

    let imagemUrl = "";
    if (imagemInput.files.length > 0) {
        const file = imagemInput.files[0];
        converterImagemBase64(file, function(base64Image) {
            imagemUrl = base64Image;
            salvarProdutoComImagem(imagemUrl); 
        });
    } else {
        salvarProdutoComImagem(imagemUrl);
    }
}

function salvarProdutoComImagem(imagemUrl) {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const precoAntigo = parseFloat(document.getElementById('precoAntigo').value);
    const id = document.getElementById('form-produto').dataset.id;

    if (id) {

        const produto = produtos.find(p => p.id === parseInt(id));
        if (produto) {
            produto.nome = nome;
            produto.preco = preco;
            produto.precoAntigo = precoAntigo || produto.precoAntigo;
            produto.imagem = imagemUrl || produto.imagem;
        }
    } else {
        
        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco,
            precoAntigo,
            imagem: imagemUrl 
        };
        produtos.push(novoProduto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));

    document.getElementById('form-produto').reset();
    document.getElementById('imagemPreview').style.display = 'none';
    delete document.getElementById('form-produto').dataset.id;
    carregarProdutos();
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === parseInt(id));
    if (produto) {
        document.getElementById('nome').value = produto.nome;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('precoAntigo').value = produto.precoAntigo;
        document.getElementById('form-produto').dataset.id = produto.id;


        const imagemPreview = document.getElementById('imagemPreview');
        imagemPreview.src = produto.imagem;
        imagemPreview.style.display = 'block';
    }
}

function excluirProduto(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
    if (confirmacao) {
        
        const produtosAtualizados = produtos.filter(p => p.id !== parseInt(id));
        
        
        localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
        
        produtos.length = 0;
        produtos.push(...produtosAtualizados);

        carregarProdutos();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    document.getElementById('form-produto').addEventListener('submit', salvarProduto);
});

document.addEventListener('DOMContentLoaded', () => {
    const cardLateral = document.getElementById('cardLateral');
    const toggleBtn = document.getElementById('toggleBtn');

    toggleBtn.addEventListener('click', () => {
        cardLateral.classList.toggle('minimizado');
        if (cardLateral.classList.contains('minimizado')) {
            toggleBtn.style.right = '0';
        } else {
            toggleBtn.style.right = '300px';
        }
    });
});

document.querySelectorAll('.excluir').forEach(botao => {
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        excluirProduto(id);
    });
});


function filtrarProdutos() {
    const filtro = document.getElementById('filtro-nome').value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filtro));
    carregarProdutosFiltrados(produtosFiltrados);
}

function carregarProdutosFiltrados(produtosFiltrados) {
    const container = document.querySelector('.caixa-container');
    container.innerHTML = "";

    produtosFiltrados.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('caixa-item');
        item.dataset.id = produto.id;

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <div class="preco">R$${produto.preco.toFixed(2)} <span>R$${produto.precoAntigo.toFixed(2)}</span></div>
            <a href="carrinho.html" class="botao">Ver Carrinho</a>
        `;

        container.appendChild(item);
    });

    
}

let slideIndex = 0;
function mostrarSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(mostrarSlides, 3000);
}

function mudarSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex - 1) ? 'block' : 'none';
    });
}


document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    document.getElementById('form-produto').addEventListener('submit', salvarProduto);
    document.getElementById('filtro-nome').addEventListener('input', filtrarProdutos); 
    mostrarSlides(); 
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filtro-nome').addEventListener('input', filtrarProdutos);
});
