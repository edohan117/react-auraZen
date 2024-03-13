const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const session = require('express-session');
const fs = require('fs');


app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 //쿠키 유효시간 1시간
  }
}));

app.use(express.json({
  limit: '50mb'
}));

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경시 재시작 없이 반영되도록 함.');
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
});

const db = {
  database: "edohan_aurazen",
  connectionLimit: 10,
  host: "152.67.212.132",
  port: '3306',
  user: "edohan",
  password: "edohan"
};

const dbPool = require('mysql').createPool(db);


const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
};

app.listen(
  port,
  () => console.log(`Example app listening at http://localhost:${port}`)
);
 

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello Express!'})
})