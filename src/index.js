//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
let id = 1;
let livros = [{
    id: 1,
    ISBN: "0000",
    titulo: " Nome do Livro",
    descricao: "Descrição do livro",
    edicao: " Edição 1",
    autor: "Autor do livro"

}];

/*Requisição GET*/
app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
});

/*Requisição POST */
app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        ISBN: req.body.ISBN,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor
    }
    livros.push(livro)
    res.status(201).json(livros)
});

/*Requisição PUT */
app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.ISBN = req.body.ISBN,
                livro.titulo = req.body.titulo,
                livro.descricao = req.body.descricao,
                livro.edicao = req.body.edicao,
                livro.autor = req.body.autor
        }
    })
    res.status(200).json(livros);
});

/*Requisição DELETE */
app.delete("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            const index = livros.indexOf(livro, 0)
            livros.splice(index, 1);
        }
    })
    res.status(200).json(livros)
});

/*Requisição delete Por ID */
app.delete('/livros/:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) => {
        if (livro.id == idLivroDeletado) {
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros)
});