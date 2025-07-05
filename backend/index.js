const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conexao = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "patrimonio"
});

conexao.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    return;
  }
  console.log("Conectado ao banco de dados!");
});

// ------------------------ LOGIN ------------------------
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const senhaCriptografada = crypto.createHash("sha256").update(senha).digest("hex");

  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  conexao.query(sql, [email, senhaCriptografada], (error, resultado) => {
    if (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ erro: "Erro no servidor." });
    }

    if (resultado.length > 0) {
      return res.json({ success: true, mensagem: "Login bem-sucedido!" });
    } else {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }
  });
});

// ------------------------ CADASTRAR USUÁRIO ------------------------
app.post("/cadastrar_usuario", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const senhaCriptografada = crypto.createHash("sha256").update(senha).digest("hex");

  const sql = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
  conexao.query(sql, [email, senhaCriptografada], (error) => {
    if (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }

    return res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
});

// ------------------------ CADASTRAR SETORES ------------------------
app.post("/cadastrar_setores", (req, res) => {
  const { nome, responsavel } = req.body;

  if (!nome || !responsavel) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const sql = `INSERT INTO setores (nome, responsavel) VALUES (?, ?)`;
  conexao.query(sql, [nome, responsavel], (error) => {
    if (error) {
      console.error("Erro ao cadastrar setor:", error);
      return res.status(500).json({ erro: "Erro ao cadastrar setor." });
    }

    return res.json({ mensagem: "Setor cadastrado com sucesso!" });
  });
});

// ------------------------ LANÇAR PATRIMÔNIO ------------------------
app.post("/lancar_patrimonio", (req, res) => {
  const { numero_identificacao, descricao, setor_id } = req.body;

  if (!numero_identificacao || !descricao || !setor_id) {
    return res.status(400).json({ success: false, erro: "Dados incompletos" });
  }

  const sql = "INSERT INTO patrimonios (numero_identificacao, descricao, setor_id) VALUES (?, ?, ?)";
  conexao.query(sql, [numero_identificacao, descricao, setor_id], (error) => {
    if (error) {
      console.error("Erro ao inserir patrimônio:", error);
      return res.status(500).json({ success: false, erro: "Erro no servidor" });
    }

    return res.json({ success: true, mensagem: "Item registrado com sucesso!" });
  });
});

// ------------------------ LISTAR SETORES ------------------------
app.get("/listar_setores", (req, res) => {
  const sql = "SELECT id, nome FROM setores";
  conexao.query(sql, (error, resultado) => {
    if (error) {
      console.error("Erro ao buscar setores:", error);
      return res.status(500).json({ erro: "Erro ao buscar setores." });
    }

    return res.json(resultado);
  });
});

// ------------------------ LISTAR PATRIMÔNIOS ------------------------
app.get("/listar_patrimonios", (req, res) => {
  const { setor_id } = req.query;

  let sql = `
    SELECT p.id, p.numero_identificacao AS ni, p.descricao, s.nome AS setor
    FROM patrimonios p
    JOIN setores s ON p.setor_id = s.id
  `;

  if (setor_id) {
    sql += ` WHERE s.id = ?`;
    conexao.query(sql, [setor_id], callback);
  } else {
    conexao.query(sql, callback);
  }

  function callback(error, resultado) {
    if (error) {
      console.error("Erro ao buscar patrimônios:", error);
      return res.status(500).json({ erro: "Erro ao buscar patrimônios." });
    }

    return res.json(resultado);
  }
});

// ------------------------ CADASTRAR PATRIMÔNIO MANUAL ------------------------
app.post("/cadastrar_patrimonio", (req, res) => {
  const { numero_identificacao, descricao, setor_id } = req.body;

  if (!numero_identificacao || !descricao || !setor_id) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const sql = `INSERT INTO patrimonios (numero_identificacao, descricao, setor_id) VALUES (?, ?, ?)`;

  conexao.query(sql, [numero_identificacao, descricao, setor_id], (error) => {
    if (error) {
      console.error("Erro ao cadastrar patrimônio:", error);
      return res.status(500).json({ erro: "Erro ao cadastrar patrimônio." });
    }

    return res.json({ mensagem: "Patrimônio cadastrado com sucesso!" });
  });
});

// ------------------------ HASH TEST ------------------------
app.post('/hash', (req, res) => {
  const { senha } = req.body;

  if (!senha) {
    return res.status(400).json({ erro: "Senha não informada." });
  }

  const hash_gerada = crypto.createHash("sha256").update(senha).digest("hex");
  res.json({ senha_original: senha, senha_criptografada: hash_gerada });
});

// ------------------------ ROTA RAIZ ------------------------
app.get('/', (req, res) => {
  res.send('API do Patrimônio está rodando!');
});

// ------------------------ INICIAR SERVIDOR ------------------------
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
