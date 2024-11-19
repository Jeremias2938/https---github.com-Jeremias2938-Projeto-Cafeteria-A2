document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('formulario_login').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = document.querySelector('input[name="email"]').value;
        const senha = document.querySelector('input[name="senha"]').value;

        if (email == "Admin@Admin.com" && senha == "Admin") {
            alert("Logado como Admin!")

            const usuario = usuarios.find(user => user.email === email && user.senha === senha);
            usuarioLogado = usuario;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

            location.href = "homeAdm.html"
        }
        else {
            const usuario = usuarios.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                alert(`Bem-vindo, ${usuario.nome}!`);
                usuarioLogado = usuario;
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                window.location.href = 'home.html';
            } else {
                alert("E-mail ou senha incorretos. Tente novamente.");
            }
        }
        

    });

    
});