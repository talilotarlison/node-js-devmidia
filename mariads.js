// Sim, o processo de conectar um banco de dados **MariaDB** ou **MySQL** com o **Node.js** é basicamente o mesmo. Ambos os bancos de dados usam o mesmo protocolo de comunicação e possuem sintaxe SQL compatível entre si.

// Você pode usar a mesma biblioteca de Node.js para ambos, como o **MySQL2** ou o **mysql**.

// Aqui está um exemplo de como você pode se conectar com **MariaDB** ou **MySQL** no Node.js usando a biblioteca `mysql2`:

// 1. **Instale a biblioteca mysql2**:
//    Você precisa instalar a biblioteca `mysql2` com o npm:

```bash
npm install mysql2
```

// 2. **Conectando-se ao MariaDB ou MySQL**:

```javascript
// Importando a biblioteca
const mysql = require('mysql2');

// Criando uma conexão (comum para MariaDB e MySQL)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados'
});

// Conectando ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado como id ' + connection.threadId);
});

// Realizando uma consulta simples
connection.query('SELECT * FROM sua_tabela', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});

// Fechar a conexão após uso
connection.end();
```

// **Principais pontos a observar:**
// - A sintaxe e as funções são as mesmas para ambos, já que o MariaDB é um fork do MySQL.
// - O método de criação da conexão (`mysql.createConnection()`) e de execução de consultas (`query()`) é o mesmo.

// Portanto, a configuração e a forma de uso são idênticas, permitindo que você use o mesmo código para conectar tanto a um banco **MariaDB** quanto a um banco **MySQL**.