O SQL não é nativo no Node.js. Para interagir com bancos de dados SQL (como MySQL, PostgreSQL, SQLite, etc.), você precisa instalar pacotes adicionais. O Node.js oferece suporte para conectar-se a bancos de dados relacionais, mas para isso é necessário usar bibliotecas específicas para cada tipo de banco de dados.
 
Aqui estão alguns exemplos de bibliotecas populares para trabalhar com SQL em Node.js:
 
1. **MySQL**: Para conectar-se a um banco de dados MySQL, você pode usar o pacote `mysql2` ou `mysql`.
   - Para instalar:
     ```bash
     npm install mysql2
     ```
   - Exemplo de uso:
     ```js
     const mysql = require('mysql2');
     const connection = mysql.createConnection({ host: 'localhost', user: 'root', database: 'test' });
 
     connection.query('SELECT * FROM users', (err, results, fields) => {
       if (err) throw err;
       console.log(results);
     });
 
     connection.end();
     ```
 
2. **PostgreSQL**: Para PostgreSQL, você pode usar o pacote `pg`.
   - Para instalar:
     ```bash
     npm install pg
     ```
   - Exemplo de uso:
     ```js
     const { Client } = require('pg');
     const client = new Client({
       user: 'user',
       host: 'localhost',
       database: 'test',
       password: 'password',
       port: 5432,
     });
 
     client.connect();
 
     client.query('SELECT * FROM users', (err, res) => {
       if (err) throw err;
       console.log(res.rows);
     });
 
     client.end();
     ```
 
3. **SQLite**: Para SQLite, você pode usar o pacote `sqlite3` ou `better-sqlite3`.
   - Para instalar:
     ```bash
     npm install sqlite3
     ```
   - Exemplo de uso:
     ```js
     const sqlite3 = require('sqlite3').verbose();
     const db = new sqlite3.Database('./mydb.db');
 
     db.all('SELECT * FROM users', [], (err, rows) => {
       if (err) {
         throw err;
       }
       console.log(rows);
     });
 
     db.close();
     ```
 
Portanto, para trabalhar com SQL no Node.js, você realmente precisa instalar essas dependências, pois o Node.js, por si só, não tem suporte direto para SQL.
 
https://www.bezkoder.com/node-js-sql-server-crud/
 
https://www.sqlitetutorial.net/sqlite-nodejs/
 
https://www.javascripttutorial.net/nodejs-tutorial/nodejs-sqlite/