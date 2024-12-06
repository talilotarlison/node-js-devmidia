// como acessar o cokkie de login para saber se ele esta logado e nao deixar navegar nas pagina caso cotrairio
// O ChatGPT disse:
// ChatGPT
// Para acessar o cookie de login e verificar se o usuário está autenticado em uma aplicação web, você pode seguir as etapas abaixo. Este processo geralmente envolve o uso de cookies de sessão ou autenticação, que são armazenados no navegador do usuário para indicar se ele está logado ou não.

// Aqui está uma abordagem simples usando JavaScript no lado do cliente, que pode ser adaptada dependendo da sua implementação específica (por exemplo, se você está usando JSON Web Tokens (JWT) ou cookies de sessão).

// 1. Verificar o cookie de login com JavaScript:
// Geralmente, o cookie que indica se o usuário está logado tem um nome específico, como session_id, auth_token, user_logged_in, entre outros. Para verificar se o usuário está logado, você pode buscar esse cookie diretamente e avaliar seu valor.

// Exemplo de código JavaScript para verificar se o usuário está logado:


// Função para obter o valor de um cookie específico
function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Retorna null se o cookie não existir
  }
  
  // Verifica se o cookie de login existe
  function isLoggedIn() {
    const authCookie = getCookie('auth_token'); // Substitua 'auth_token' pelo nome do cookie correto
    return authCookie !== null;
  }
  
  // Redireciona ou bloqueia o acesso se não estiver logado
  if (!isLoggedIn()) {
    alert("Você não está logado. Redirecionando para a página de login.");
    window.location.href = '/login'; // Redireciona para a página de login
  }
  
  // 2. Impedir o acesso às páginas sem login:
  // Se você quiser impedir que o usuário navegue pelas páginas sem estar autenticado, pode implementar uma lógica semelhante em todas as páginas protegidas. Aqui está um exemplo básico de como pode ser feito:
  
  
  window.onload = function() {
    if (!isLoggedIn()) {
      window.location.href = '/login'; // Redireciona para a página de login
    }
  }
  
  // 3. Trabalhando com cookies de sessão ou JWT:
  // Se você estiver usando um cookie de sessão, ele geralmente é gerido automaticamente pelo servidor e contém um identificador de sessão. Se for um JWT, o token é armazenado no cookie ou no localStorage e é verificado no servidor a cada requisição.
  
  // Exemplo de verificação de JWT (usando localStorage ou cookies):
  
  
  // Verificar se o token JWT existe
  function isLoggedIn() {
    const token = getCookie('jwt_token'); // Ou localStorage.getItem('jwt_token')
    return token !== null;
  }
  
  
  // 4. Implementação no lado do servidor:
  // Se você precisa de uma verificação no lado do servidor (por exemplo, em uma API REST), você pode usar o valor do cookie para verificar se o usuário está autenticado. Aqui está um exemplo de como você pode verificar isso no servidor, dependendo do framework que você está usando (por exemplo, Node.js com Express):
  
  
  const express = require('express');
  const app = express();
  
  // Middleware para verificar se o usuário está logado
  function checkAuth(req, res, next) {
    const token = req.cookies['auth_token']; // Supondo que o cookie de autenticação seja 'auth_token'
    
    if (!token) {
      return res.redirect('/login'); // Redireciona se não houver token
    }
  
    // Verifique o token (por exemplo, JWT) ou a sessão do usuário
    // Se o token for válido, continue para a próxima função
    next();
  }
  
  app.use('/dashboard', checkAuth); // Aplicando a verificação para páginas específicas
  
  app.get('/dashboard', (req, res) => {
    res.send('Bem-vindo ao painel!');
  });
  
  // Conclusão:
  // Verifique o cookie de login (com JavaScript ou no servidor) para ver se o usuário está autenticado.
  // Bloqueie o acesso às páginas privadas ou redirecione o usuário para a página de login se o cookie não for encontrado.
  // Proteja as rotas no servidor para garantir que apenas usuários autenticados possam acessar dados sensíveis.
  // Esse é um guia básico de como implementar isso. Dependendo do framework ou biblioteca que você está utilizando (como React, Angular, Vue.js, ou Express no servidor), a implementação pode variar um pouco, mas a lógica geral permanece a mesma.
  
  
  // Você disse:
  // como pegar cokkie value da sessao
  // O ChatGPT disse:
  // ChatGPT
  // Para pegar o valor do cookie de sessão, você pode utilizar diferentes abordagens dependendo de onde você precisa acessar o cookie (no lado do cliente ou no lado do servidor).
  
  // 1. No lado do cliente (JavaScript)
  // No lado do cliente, os cookies podem ser acessados diretamente usando o document.cookie. Porém, document.cookie retorna todos os cookies em um único string no formato key=value, separados por ponto e vírgula. Para obter o valor de um cookie específico, você pode criar uma função para buscar esse valor.
  
  // Exemplo: Como pegar o valor de um cookie de sessão no JavaScript
  
  // Função para obter o valor de um cookie específico
  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Retorna null se o cookie não existir
  }
  
  // Exemplo de uso
  const sessionCookieValue = getCookie('session_id'); // Substitua 'session_id' pelo nome do seu cookie de sessão
  console.log(sessionCookieValue); // Imprime o valor do cookie
  // No exemplo acima:
  
  // document.cookie é uma string contendo todos os cookies do site.
  // A função getCookie(name) procura o cookie com o nome especificado e retorna seu valor. Se não encontrar, retorna null.
  // 2. No lado do servidor
  // No lado do servidor, a maneira de acessar os cookies depende do framework que você está utilizando. Abaixo estão exemplos para alguns frameworks populares.
  
  // Node.js com Express (usando o middleware cookie-parser)
  // Se você está usando Express no servidor e deseja acessar o cookie de sessão, você pode usar o middleware cookie-parser. Ele facilita o acesso aos cookies.
  
  // Instalar cookie-parser:
  
  npm install cookie-parser
  Código do servidor (Express):
  
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const app = express();
  
  // Use o middleware cookie-parser
  app.use(cookieParser());
  
  // Rota protegida, verifica se o cookie de sessão existe
  app.get('/dashboard', (req, res) => {
    const sessionCookie = req.cookies['session_id']; // Aqui 'session_id' é o nome do cookie da sessão
    if (!sessionCookie) {
      return res.status(401).send('Você não está logado');
    }
  
    res.send(`Bem-vindo ao painel! Cookie de sessão: ${sessionCookie}`);
  });
  
  // Inicializar o servidor
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
  
  // No exemplo acima, usamos o middleware cookie-parser para facilitar o acesso ao cookie. A função req.cookies['session_id'] acessa o valor do cookie de nome session_id.
  
  // PHP (Acessando cookies no PHP)
  // No PHP, os cookies são armazenados em uma superglobal chamada $_COOKIE. Para acessar um cookie de sessão, você pode fazer o seguinte:
  
  
  <?php
  // Verifica se o cookie de sessão está setado
  if(isset($_COOKIE['session_id'])) {
      $sessionCookieValue = $_COOKIE['session_id'];
      echo "Valor do cookie de sessão: " . $sessionCookieValue;
  } else {
      echo "Cookie de sessão não encontrado.";
  }
  ?>
  
  // No exemplo acima, usamos $_COOKIE['session_id'] para acessar o valor do cookie session_id.
  
  // 3. Considerações sobre Cookies de Sessão
  // Cookies de Sessão são armazenados pelo navegador e geralmente expiram quando a sessão do navegador é fechada (ou seja, não têm uma data de expiração definida).
  // Se você estiver usando cookies persistentes, eles terão uma data de expiração e serão armazenados por um período de tempo especificado.
  // Quando você usa um cookie de sessão no lado do servidor (como no Express), é importante configurar a opção httpOnly para impedir o acesso ao cookie via JavaScript, o que aumenta a segurança.
  // 4. Segurança
  // Ao trabalhar com cookies de sessão, é importante ter em mente as melhores práticas de segurança:
  
  // HttpOnly: Para proteger contra ataques de XSS, defina os cookies como HttpOnly, o que impede que sejam acessados por JavaScript no lado do cliente.
  // Secure: Use a flag Secure para garantir que o cookie só seja enviado em conexões HTTPS.
  // SameSite: A flag SameSite ajuda a proteger contra ataques de CSRF, limitando o envio do cookie para o mesmo site.
  // Exemplo de cookie seguro (no lado do servidor, Express):
  
  
  res.cookie('session_id', 'valor_do_cookie', {
    httpOnly: true,
    secure: true, // Só em conexões HTTPS
    sameSite: 'Strict' // Ou 'Lax'
  });
  
  // Com isso, você tem uma solução tanto no lado do cliente quanto no lado do servidor para pegar o valor do cookie de sessão.