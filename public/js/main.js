
var campo = $(".campo-digitacao"); // variavel campo esta pegando a class campo-digitação
var tempoInicial = $("#tempo-digitacao").text(); // Para imprimirmos exatamente o texto da frase, teremos de utilizar outra função text()

$(function(){  // função de inicialização das funções 
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcador();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {  
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras); // atribuindo um valor, pois a função text() esta recebendo um parametro que é numPalavras
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
               
            }
        }, 1000);
    });
}

function finalizaJogo() {
   campo.attr("disabled", true);
    campo.toggleClass("campo-desativado"); // adicionando classe campo-desativado, poderia adicionar tbm pelo toggle class
    inserePlacar();
}

// função para aparecer bordas, ira aparecer borda vermelha se os digitos no input forem diferentes da variavel "comparavel"
// e verde se forem iguais
function inicializaMarcador() {
    var frase = $(".frase").text(); 

campo.on("input",function() {
    var digitado = campo.val() //armazenando o valor do campo na variavel digitado ...
    var comparavel = frase.substr(0,digitado.length); // O método substr () extrai partes de uma string, começando no caractere na posição especificada, e retorna o número especificado de caracteres.
                                                     // Dica: para extrair caracteres do final da string, use um número inicial negativo (isso não funciona no IE 8 e anteriores).
    console.log("Digitado" + digitado);
    console.log("Frase C.:" + comparavel);
    if (digitado == comparavel) {   // condicional 
        campo.addClass("campo-correto");  // adicionado class
        campo.removeClass("campo-errado"); // removendo class
    }else {
        campo.addClass("campo-errado")  // adicionado class
        campo.removeClass("campo-correto"); // removendo class
    }
})
}


// função do botão reinicia jogo 
function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");  // desativando classe campo-desativado pelo toggleClass, o toggleClas verifica se o objeto tem a classe ativada se não ele ativa ou desativa
    campo.removeClass("campo-errado");
    campo.removeClass("campo-correto");
    campo.toggleClass("campo-desativado"); //novo
};


