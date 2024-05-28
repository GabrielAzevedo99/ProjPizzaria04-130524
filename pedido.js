/* 
==================================================
    Projeto: Pizzaria
    Autor: Gabriel Santos Azevedo
    Data: 27/o5/2024
    Descrição: 
"/" -> Index.html
"/cardapio" -> Montagem da Pizza
"/pedido" -> Recebe o conteúdo da pizza montada em JSON e apresenta as opções (Retornar ou Confirmar);
"/bebidas" -> Recebe o conteúdo da pizza montada em JSON e apresenta as opções de bebidas em tabelas, com pelo menos 5 bebidas e uma gestão de estoque. Ao ser adicionado é limitado a quantidade, chegando em 0 é apresentado "SEM ESTOQUE" e destacado em vermelho. 
No final da seleção é apresentado o pedido completo com o valor completo. 
==================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    const retornarButton = document.getElementById('retornar-button');
    retornarButton.addEventListener('click', function() {
        window.location.href = 'cardapio.html';
    });

    const confirmarButton = document.getElementById('confirmar-button');
    confirmarButton.addEventListener('click', function() {
        window.location.href = 'bebida.html';
    });
});
