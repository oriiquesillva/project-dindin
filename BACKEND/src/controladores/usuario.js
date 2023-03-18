const { query } = require("../bancodedados/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const usuario = await query("select * from usuarios where email = $1", [email]);

    if (usuario.rowCount > 0) {
      return res
        .status(400)
        .json({ mensagem: "Já existe um usuario cadastrado com esse email" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryCadastro = "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *";
    const paramsCadastro = [nome, email, senhaCriptografada];
    const usuarioCadastrado = await query(queryCadastro, paramsCadastro)

    if (usuarioCadastrado.rowCount <= 0 ) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
    }

    const {senha: _, ...cadastro} = usuarioCadastrado.rows[0]

    return res.status(201).json(cadastro);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
  }
};

const obterPerfilUsuario = async (req, res) => {
  return res.json(req.usuario)
}

const editarPerfilUsuario = async (req,res) => {
  const { usuario } = req;
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const usuarioEncontrado = await query("select * from usuarios where email = $1", [email]);

    if (usuarioEncontrado.rowCount > 0 && usuarioEncontrado.rows[0].id !== usuario.id ) {
      return res.status(400).json({ mensagem: "Já existe um usuario cadastrado com esse email" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryEdicao = "update usuarios set nome = $1, email = $2, senha = $3 where id = $4";
    const paramsEdicao = [nome, email, senhaCriptografada, usuario.id];
    const usuarioEditado = await query(queryEdicao, paramsEdicao)

    if (usuarioEditado.rowCount <= 0 ) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
  }

}

module.exports = {
    cadastrarUsuario,
    obterPerfilUsuario,
    editarPerfilUsuario
};
