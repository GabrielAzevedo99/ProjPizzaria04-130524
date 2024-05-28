// Importação dos módulos:
const express = require('express');
const fs = require('fs');
const path = require('path');

// Criação do servidor:
const app = express();

// Definindo o diretório raiz dos arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Definindo os endpoints para cada página HTML
app.get('/cardapio', (req, res) => {
    serveStaticPage('cardapio.html', res);
});

app.get('/pedido', (req, res) => {
    serveStaticPage('pedido.html', res);
});

app.get('/bebidas', (req, res) => {
    serveStaticPage('bebidas.html', res);
});

app.get('/', (req, res) => {
    serveStaticPage('index.html', res);
});

// Função para servir páginas estáticas
function serveStaticPage(pageName, res) {
    const pagePath = path.join(__dirname, pageName);
    fs.readFile(pagePath, (err, data) => {
        if (err) {
            res.status(500).send('Erro interno do servidor');
        } else {
            res.status(200).type('text/html').send(data);
        }
    });
}

// Tratamento de erro para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
});

// Tratamento de erro genérico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro no servidor');
});

// Configurando o servidor para escutar na porta 4500
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Servidor criado na porta: ${PORT}`);
});
