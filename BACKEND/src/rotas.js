const express = require("express");
const { login } = require("./controladores/login");
const { cadastrarUsuario, obterPerfilUsuario, editarPerfilUsuario } = require("./controladores/usuario");
const { verificarLogin } = require("./intermediarios/autenticacao");
const { listarCategorias } = require("./controladores/categorias");
const { listarTransacoes, detalharTransacao, cadastrarTransacao, editarTransacao, deletarTransacao, consultarExtrato } = require("./controladores/transacoes");

const rotas = express ();

rotas.post("/usuario", cadastrarUsuario); 
rotas.post("/login", login);

rotas.use(verificarLogin);

rotas.get("/usuario", obterPerfilUsuario);
rotas.put("/usuario", editarPerfilUsuario);

rotas.get("/categorias", listarCategorias);

rotas.get("/transacoes", listarTransacoes);
rotas.get("/transacoes/extrato", consultarExtrato)
rotas.get("/transacoes/:id", detalharTransacao);
rotas.post("/transacoes", cadastrarTransacao)
rotas.put("/transacoes/:id", editarTransacao);
rotas.delete("/transacoes/:id", deletarTransacao);

module.exports = rotas;