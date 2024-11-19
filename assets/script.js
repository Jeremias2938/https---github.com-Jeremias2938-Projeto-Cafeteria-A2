function logar(){
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    if(login == "admin@admin" && senha == "12345"){
        alert("Logado como Admin!")
        location.href = "home.html"
    }
    else{
        alert("Usuário ou senha incorretos!");
    }
}