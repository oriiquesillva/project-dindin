const { query } = require("../bancodedados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
  }

  try {
    const { rowCount, rows } = await query(
      "select * from usuarios where email = $1", [email]);

    if (rowCount <= 0) {
      return res.status(400).json({ mensagem: "Dados de login invalidos, verifique e tente novamente" });
    }

    const [usuario] = rows;

    const verificarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!verificarSenha) {
      return res.status(400).json({ mensagem: "Dados de login invalidos, verifique e tente novamente" });
    }

    const token = jwt.sign({ id: usuario.id }, "senhaseguradotoken", {expiresIn: "4h",});

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

module.exports = {
  login,
};
