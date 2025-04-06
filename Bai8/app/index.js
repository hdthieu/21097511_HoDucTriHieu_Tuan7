const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Kết nối tới MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb'
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
    return;
  }
  console.log('Kết nối MySQL thành công!');
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi truy vấn DB');
    }
    res.send(`Thời gian hiện tại trong DB là: ${results[0].now}`);
  });
});

app.listen(port, () => {
  console.log(`App đang chạy tại http://localhost:${port}`);
});
