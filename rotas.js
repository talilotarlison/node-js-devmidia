// estou usando node express e exporess-sessao,  a pagina login esta no meu servidor como redirecionar o usuario para a pagina html caso nao esteja logado
// ChatGPT said:
// ChatGPT
// Para redirecionar um usuário para a página de login caso ele não esteja logado, você pode usar a middleware express-session no seu servidor Node com Express. Vamos criar uma middleware que verifica se o usuário está logado e, caso não esteja, o redireciona para a página de login.

// Aqui está um exemplo básico de como fazer isso:

// Passo 1: Configurar o Express e o express-session
// Primeiro, você precisa instalar o express-session no seu projeto.


npm install express-session
// Depois, configure o Express com o middleware express-session e defina uma sessão para o usuário.

// Passo 2: Código do Servidor (Node + Express)

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do express-session
app.use(session({
  secret: 'seu-segredo-aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina `secure: true` se estiver usando HTTPS
}));

// Middleware para verificar se o usuário está logado
function verificarLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login'); // Redireciona para a página de login caso não esteja logado
  }
  next(); // Se o usuário estiver logado, continua com a requisição
}

// Serve o HTML da página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Página protegida (somente para usuários logados)
app.get('/dashboard', verificarLogin, (req, res) => {
  res.send('Bem-vindo ao seu painel! Você está logado.');
});

// Simulando o login (apenas para fins de exemplo)
app.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  // Verifique as credenciais aqui
  if (req.body.usuario === 'admin' && req.body.senha === '1234') {
    req.session.usuario = req.body.usuario; // Armazena o usuário na sessão
    res.redirect('/dashboard'); // Redireciona para a página do painel
  } else {
    res.send('Credenciais inválidas');
  }
});

// Página de logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Erro ao tentar sair');
    }
    res.redirect('/login'); // Redireciona para a página de login após o logout
  });
});

// Servir arquivos estáticos (caso precise servir imagens, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Passo 3: Página HTML de Login (login.html)
// Aqui está um exemplo simples de como a página de login pode ser:


<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <h2>Faça login</h2>
  <form action="/login" method="POST">
    <label for="usuario">Usuário:</label>
    <input type="text" id="usuario" name="usuario" required><br><br>

    <label for="senha">Senha:</label>
    <input type="password" id="senha" name="senha" required><br><br>

    <button type="submit">Entrar</button>
  </form>
</body>
</html>

Explicação:
express-session: Usado para armazenar dados de sessão do usuário. Quando o usuário faz login com sucesso, o nome do usuário é armazenado em req.session.usuario.

Middleware de Verificação: A função verificarLogin verifica se a sessão contém um usuário. Se não houver, o usuário é redirecionado para a página de login (/login).

Rota de Login (/login): Quando o usuário acessa a página de login, o formulário é exibido. Ao enviar o formulário com as credenciais, o servidor verifica e, se forem corretas, armazena o nome do usuário na sessão e redireciona para a página de dashboard.

Rota Protegida (/dashboard): A página do painel só pode ser acessada por usuários autenticados. Caso contrário, o middleware verificarLogin redireciona para o login.

Logout: A rota /logout destrói a sessão do usuário, efetivamente desconectando-o e redirecionando-o para a página de login.

Considerações:
Se o seu site for utilizado em produção, sempre use HTTPS e defina secure: true na configuração do cookie do express-session.
A autenticação (no exemplo acima) é simples, você pode substituí-la por um sistema mais robusto usando um banco de dados ou algum serviço de autenticação externo.
Esse é um exemplo simples para você começar. Se tiver mais alguma dúvida ou precisar de ajustes, fique à vontade para perguntar!