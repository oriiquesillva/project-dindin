const { query } = require("../bancodedados/conexao");

const listarTransacoes = async (req,res) => {
    const { usuario } = req;
    const { filtro } = req.query;

    if (filtro && !Array.isArray(filtro)) {
        return res.status(400).json({mensagem: "O filtro precisa ser um array"});
    };

    try {
        let queryLike = "";
        let arrayFiltro;

        if (filtro) {
            arrayFiltro = filtro.map((item) => `%${item}%`);
            queryLike += `and c.descricao ilike any($2)` 
        }
        const queryTransacoes = `
        select t.*, c.descricao as categoria_nome from transacoes t
        left join categorias c
        on t.categoria_id = c.id
        where t.usuario_id = $1
        ${queryLike}
        `;

        const paramsFiltro = filtro ? [usuario.id, arrayFiltro] : [usuario.id]

        const transacoes = await query(queryTransacoes, paramsFiltro);
        return res.json(transacoes.rows)
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
    };
};

const detalharTransacao = async (req, res) => {
    const { usuario } = req
    const { id } = req.params

    try {
        const { rowCount, rows } = await query("select * from transacoes where usuario_id = $1 and id = $2", [usuario.id, id]);

        if (rowCount <=0) {
            return res.status(404).json({mensagem: "Desculpe, não encontramos nenhuma transação"})
        }

        const [transacao] = rows;

        return res.json(transacao);
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
    }

};

const cadastrarTransacao = async (req, res) => {
    const { usuario } = req;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    };

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({mensagem: "O tipo da transação deve ser entrada ou saida"});
    };

    try {
        const categoria = await query("select * from categorias where id = $1", [categoria_id]);

        if (categoria.rowCount <=0) {
            return res.status(404).json({mensagem: "Desculpe, não encontramos nenhuma categoria"});
        };

        const queryCadastro = "insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) values ($1, $2, $3, $4, $5, $6) returning *";
        const paramsCadastro = [descricao, valor, data, categoria_id, tipo, usuario.id];

        const {rowCount, rows} = await query(queryCadastro, paramsCadastro);

        if (rowCount <=0) {
            return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
        };

        const [transacao] = rows
        transacao.categoria_nome = categoria.rows[0].descricao;

        return res.status(201).json(transacao);
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
    }



};

const editarTransacao = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    };

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({mensagem: "O tipo da transação deve ser entrada ou saida"});
    };

    try {
        const transacao = await query("select * from transacoes where usuario_id = $1 and id = $2", [usuario.id, id]);

        if (transacao.rowCount <= 0) {
            return res.status(404).json({mensagem: "Desculpe, não encontramos nenhuma transação"});
        };

        const categoria = await query("select * from categorias where id = $1", [categoria_id]);

        if (categoria.rowCount <=0) {
            return res.status(404).json({mensagem: "Desculpe, não encontramos nenhuma categoria"});
        };

        const queryEdicao = "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6"
        const paramsEdicao = [descricao, valor, data, categoria_id, tipo, id]
        const transacaoEditada = await query(queryEdicao, paramsEdicao)

        if (transacaoEditada.rowCount <= 0) {
            return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
        }

        return res.status(200).send()        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
        
    };

};

const deletarTransacao = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params

    try {
        const transacao = await query("select * from transacoes where usuario_id = $1 and id = $2", [usuario.id, id]);

        if (transacao.rowCount <= 0) {
            return res.status(404).json({mensagem: "Desculpe, não encontramos nenhuma transação"});
        };

        const deletarTransacao = await query("delete from transacoes where id = $1", [id])

        if (deletarTransacao.rowCount <= 0) {
            return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});            
        }          
    
        return res.status(200).send()        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});
        
    };


    
};

const consultarExtrato = async (req, res) => {
    const { usuario } = req;

    try {
        const queryExtrato = "select sum(valor) as saldo from transacoes where usuario_id = $1 and tipo = $2";
        const saldoEntrada = await query(queryExtrato, [usuario.id, "entrada"]);
        const saldoSaida = await query(queryExtrato, [usuario.id, "saida"]);

        return res.json({
            entrada: Number(saldoEntrada.rows[0].saldo) ?? 0,
            saida: Number(saldoSaida.rows[0].saldo) ?? 0
        });        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}`});      
        
    };

};

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    editarTransacao,
    deletarTransacao,
    consultarExtrato
};