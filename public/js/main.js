var campo = $(".campo-digitacao"); // variavel campo esta pegando a class campo-digitação
var tempoInicial = $("#tempo-digitacao").text(); 

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
    tamanhoFrase.text(numPalavras);
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
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");  // adicionando classe campo-desativado, poderia adicionar tbm pelo toggle class 
            }
        }, 1000);
    });
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

// var cor = $("div").css("background-color"); -- pegando a cor da div pela função css() e colocando na var cor

// Também é possivel recuperar mais de um valor passando um array de propriedades, por exemplo:
// var valores = $("div").css(["background-color","width"]);

/*
Vimos  que podemos facilmente adicionar e remover uma classe com jQuery:

Ao selecionar um elemento:

var campo = $(".campo-digitacao");
Podemos adicionar a classe desejada através da função .addClass, por exemplo:

campo.addClass("campo-desativado");
Também podemos remover uma classe:

campo.removeClass("campo-desativado");
*/ 

/*

Há casos que queremos adicionar uma classe se não existe, e remover se já existe. Qual função devemos utilizar?

A função correta é toggleClass por exemplo:

var campo = $(".campo-digitacao");
campo.toggleClass("campo-desativado");COPIAR CÓDIGO
Essa função toggleClass também pode receber um segundo parâmetro que define se quisermos adicionar ou remover a classe:

campo.toggleClass("campo-desativado", true); //sempre adicionaCOPIAR CÓDIGO
No vídeo você já viu que adicionamos uma borda verde ou vermelha, dependendo se o usuário acertou ou erro:

if(digitado == comparavel) {
    campo.addClass("borda-verde");
    campo.removeClass("borda-vermelha");
} else {
    campo.addClass("borda-vermelha");
    campo.removeClass("borda-verde");
}COPIAR CÓDIGO
Podemos reescrever esse código sem if, apenas usando o toggleClass. Repare o segundo parâmetro:

var ehCorreto = (digitado == comparavel);

campo.toggleClass("borda-verde", ehCorreto);
campo.toggleClass("borda-vermelha", !ehCorreto);COPIAR CÓDIGO
O código fica mais enxuto mas talvez menos legível. De qualquer forma, no curso continuaremos com o if!

$('h1').css('color', 'blue');

*/

