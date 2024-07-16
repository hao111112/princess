const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();

// Reuse the existing database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'princess'
});

app.get('/export-to-csv', (req, res) => {
    // 从 user 表中查询所有数据,按 create_time 字段排序
    connection.query('SELECT * FROM user ORDER BY create_time DESC', (err, results) => {
        if (err) throw err;
    
        // 将数据转换为 CSV 格式
        let csvData = 'region,phone,create_time\n';
        results.forEach((row) => {
          csvData += `${row.region},${row.phone},${row.create_time}\n`;
        });
    
        // 将 CSV 数据写入文件
        const csvFilePath = path.join(__dirname, 'user_data.csv');
        fs.writeFile(csvFilePath, csvData, (err) => {
          if (err) throw err;
          console.log('CSV file created successfully!');
    
          // 提供文件下载
          res.download(csvFilePath, 'user_data.csv', (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error downloading file');
            }
          });
        });
      });
});

const options = {
    key: fs.readFileSync('./ssl/register.key'),
    cert: fs.readFileSync('./ssl/register_princesscantdefend_com.crt'),
    ca: fs.readFileSync('./ssl/register_princesscantdefend_com.ca-bundle')
};

https.createServer(options, app).listen(8443, () => {
    console.log('CSV export service running on https://localhost:8443');
});