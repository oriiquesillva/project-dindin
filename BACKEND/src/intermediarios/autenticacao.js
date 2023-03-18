const { query } = require("../bancodedados/conexao");
const jwt = require("jsonwebtoken");

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({mensagem: "Acesso não autorizado"});
    }

    try {
        const token = authorization.replace("Bearer", "").trim();

        const { id } = jwt.verify(token, "senhaseguradotoken");

        const { rowCount, rows } = await query(
            "select * from usuarios where id = $1", [id]);
      
          if (rowCount <= 0) {
            return res.status(401).json({ mensagem: "Acesso não autorizado" });
          };

          const [usuario] = rows;

          const { senha: _, ...dadosUsuario } = usuario;

          req.usuario = dadosUsuario;

          next();    
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
        
    }
}

module.exports = {
    verificarLogin
}