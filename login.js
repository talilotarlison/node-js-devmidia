// como posso salvar o cokokie no navegador para pegar e usar para saber se o usuarioesta logado para deixar navegar nas paginas
// O ChatGPT disse:
// ChatGPT
// Para salvar o cookie no navegador e usá-lo para verificar se o usuário está logado, você pode usar o JavaScript para definir e ler o cookie. Abaixo estão as etapas básicas para definir o cookie quando o usuário se loga e como verificar sua existência para controlar o acesso às páginas.

// 1. Salvando o Cookie no Navegador
// Quando o usuário faz login, você pode salvar um cookie com um valor que indica que ele está autenticado. Aqui está como você pode definir o cookie:


function setLoginCookie() {
    // Defina o cookie para a sessão (ajuste os parâmetros conforme necessário)
    document.cookie = "auth_token=usuario_logado; path=/; secure; HttpOnly; max-age=3600"; // 1 hora de duração
  }
  
  // Chame essa função após a validação do login
  setLoginCookie();
  Parâmetros importantes:
  
  // path=/: O cookie estará disponível para todo o site.
  // secure: Só será transmitido sobre HTTPS.
  // HttpOnly: Não pode ser acessado via JavaScript (ajuda na segurança contra XSS).
  // max-age=3600: O cookie expira em uma hora (1 hora = 3600 segundos).
  // 2. Verificando o Cookie para Saber se o Usuário Está Logado
  // Você pode ler o cookie no navegador para verificar se ele existe e, com isso, decidir se o usuário está logado ou não. Aqui está um exemplo para verificar o cookie:
  
  
  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  function isLoggedIn() {
    const authToken = getCookie('auth_token');
    return authToken !== null; // Se o cookie existir, o usuário está logado
  }
  
  // Usando a função para permitir navegação ou redirecionar
  if (!isLoggedIn()) {
    window.location.href = '/login'; // Redireciona para a página de login se não estiver logado
  }
  
  // 3. Usando o Cookie para Controlar o Acesso às Páginas
  // Com base no valor do cookie, você pode redirecionar o usuário para a página de login se ele não estiver autenticado, ou permitir que ele navegue normalmente. Aqui está um exemplo simples de como aplicar isso ao carregar páginas protegidas:
  
  
  window.onload = function() {
    if (!isLoggedIn()) {
      window.location.href = '/login'; // Redireciona para o login se não estiver autenticado
    }
  }
  
  // 4. Considerações de Segurança
  // HttpOnly e Secure: Para cookies de autenticação, sempre defina o atributo HttpOnly para impedir que o cookie seja acessado por scripts JavaScript e o atributo Secure para garantir que o cookie seja enviado apenas em conexões HTTPS.
  // Expiração: Defina um tempo de expiração apropriado para o cookie. Se for um cookie de sessão, você pode optar por não definir max-age, e o cookie será removido quando o navegador for fechado. Caso contrário, defina um tempo adequado de expiração.
  // SameSite: Defina a flag SameSite para prevenir ataques de CSRF, limitando o envio do cookie a requisições de origem cruzada.
  // Exemplo de configuração de cookie com segurança adicional:
  
  
  document.cookie = "auth_token=usuario_logado; path=/; secure; HttpOnly; max-age=3600; SameSite=Strict";
  // Resumo:
  // Salvar o cookie: Defina o cookie quando o usuário se autenticar.
  // Verificar o cookie: Leia o cookie nas páginas que precisam verificar se o usuário está logado.
  // Controlar o acesso: Redirecione para a página de login se o cookie não for encontrado.
  // Isso é um modelo básico para autenticação com cookies em JavaScript.