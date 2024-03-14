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

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/api/customers', (req, res) =>{
  res.send([
    {
      "id": 1,
      "image": "https://picsum.photos/id/1/200/150",
      "name": "홍길동",
      "birthday": "950117",
      "gender": "남자",
      "job": "대학생"
  },
  {
      "id": 2,
      "image": "https://picsum.photos/id/2/200/150",
      "name": "백재근",
      "birthday": "950117",
      "gender": "남자",
      "job": "백수"
  },
  {
      "id": 3,
      "image": "https://picsum.photos/id/3/200/150",
      "name": "이도한",
      "birthday": "950117",
      "gender": "남자",
      "job": "개발자"
  }
  ])
})


// app.get('/api/:alias', async (request, res) => {
  //   try {
    //     res.send(await req.db(request.params.alias, request.body.param, request.body.where));
    //   } catch (err) {
//     res.status(500).send({
//       error: err
//     });
//   }
// });

// app.post('/api/:alias', async (request, res) => {
  //   try {
    //     res.send(await req.db(request.params.alias, request.body.param, request.body.where));
    //   } catch (err) {
      //     res.status(500).send({
        //       error: err
//     });
//   }
// });


        
        app.listen(
          port,
          () => console.log(`Example app listening at http://localhost:${port}`)
        );