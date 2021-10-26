const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'hoge',
  password: 'postgres',
  port: 5432
});

client.connect();

(async() => {
  const query = {
    text: 'select now();'
  }
  try {
    const res = await client.query(query);
    console.log(res.rows);
  } catch (err) {
    console.error(err.stack);
  } finally {
    client.end();
  }
})();
