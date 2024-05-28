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
