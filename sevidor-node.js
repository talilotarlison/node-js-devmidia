const mariadb = require('mariadb');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const md5 = require('md5');

const hashByLength = require('./hash.js');// cria hash 

// express 
const app = express();
const port = 3000;

// Middleware para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// permisao
app.use(express.static(__dirname + '/public'));
// Configuração da sessão
app.use(session({
    secret: hashByLength(20),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


// Configuração de conexão banco de dados
const pool = mariadb.createPool({
    host: '127.0.0.1',  // Endereço do servidor MariaDB
    user: 'root', // Nome de usuário do MariaDB
    password: '', // Senha do usuário
    database: 'financeiro', // Nome do banco de dados
    connectionLimit: 5 // Número máximo de conexões simultâneas
});


// Rota para obter os dados da tabela banco
app.get('/dados',isAuthenticated, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM fluxocaixa'); // Substitua "sua_tabela" pelo nome da tabela
        res.json(rows); // Retorna os dados no formato JSON
    } catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).json({ error: 'Erro ao acessar os dados do banco.' });
    } finally {
        if (conn) conn.end(); // Fecha a conexão
    }
});

// adicionar dados banco
app.get('/post',isAuthenticated,async (req, res) => {
    // Recebendo as notas como parâmetros da query
    const dado = {
        coluna1: req.query.tipo,
        coluna2: req.query.nome,
        coluna3: parseFloat(req.query.preco),
        datas: new Date()
    }
    if (!dado.coluna1 || !dado.coluna2 || !dado.coluna3) {
        return res.status(400).json({ error: 'Dados insuficientes fornecidos.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO fluxocaixa (id,tipo, nome,preco,disc, data ) VALUES (?, ? ,?,?,?,?)', // (0,"Saida", "preco produto",24,"null",null)
            [0, dado.coluna1, dado.coluna2, parseFloat(dado.coluna3), "null", dado.datas] // Parâmetros para evitar SQL Injection
        );
        res.json({ message: 'Dados inseridos com sucesso!', insertId: result.insertId.toString() });
    } catch (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao inserir os dados.' });
    } finally {
        if (conn) conn.end(); // Fecha a conexão
    }
});


// delete dados banco
app.delete('/delete', async (req, res) => {
    const id = parseInt(req.query.id); // Obtém o ID da URL e converte para número
    console.log(id)
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'DELETE FROM fluxocaixa WHERE id = ?',
            [id] // Passa o ID como parâmetro para evitar SQL Injection
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado.' });
        }

        res.json({ message: 'Registro deletado com sucesso!', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('Erro ao deletar o registro:', err);
        res.status(500).json({ error: 'Erro ao deletar o registro.' });
    } finally {
        if (conn) conn.end();
    }
});

// Rota para processar o login
app.post('/login', async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    
    const user = {
        username: username,
        password: md5(password)
    }
    console.log(user.username, user.password)

    if (!user.username || !user.password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios.' });
    }

    let conn;
    try {
        // Obter conexão do pool
        conn = await pool.getConnection();

        // Consulta ao banco de dados
        const query = 'SELECT * FROM login WHERE nome = ? AND senha = ?';
        const results = await conn.query(query, [user.username, user.password]);
        console.log(results.length)
        if (results.length > 0) {
            // Usuário encontrado, cria a sessão
            req.session.user = results[0].nome; // Armazena o nome do usuário na sessão
            // res.json({ message: 'Login realizado com sucesso!' });
            // Serve o HTML da página de login
            res.redirect('/');
        } else {
            // Usuário ou senha inválidos
            res.status(401).json({ error: 'Credenciais inválidas. Tente novamente.' });
        }
    } catch (err) {
        console.error('Erro na consulta ao banco de dados:', err);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    } finally {
        if (conn) conn.release(); // Libera a conexão de volta ao pool
    }
});

// Middleware de autenticação
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/');
    }
}
// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Erro ao fazer logout.');
        }
        res.redirect('/');
    });
});


// Rota principal
app.get('/', (req, res) => {
    if (req.session.user) {
        // res.send(`Bem-vindo, ${req.session.user}! <a href="/logout">Logout</a>`);
        res.sendFile(path.join(__dirname, './home.html'));
    } else {
        // res.send('Você não está logado. <a href="/login">Login</a>');
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Rota protegida
app.get('/pagina-protegida', isAuthenticated, (req, res) => {
    res.send('Você está logado e pode acessar esta página.');
});


// Rota protegida
app.get('/cadastro', isAuthenticated, (req, res) => {
    // res.send('Você está logado e pode acessar esta página.');
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});

app.listen(port, () =>
    console.log('Servidor iniciado na porta 3000')
);
