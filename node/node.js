const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8084;
app.use(cors());
// 使用 express.json() 中间件解析 JSON 请求体
app.use(express.json());

// 创建数据库连接
const connection = mysql.createConnection({
    host: '18.142.183.247',
    user: 'root',
    password: 'root',
    database: 'princess'
  });
  app.use(express.static(path.join(__dirname, './frontend/finalPrincess')));
// 处理 POST 请求,接收手机号和地区信息
app.post('/api/commitPhone', (req, res) => {
    const { region, phone } = req.body;
    if (!region || !phone) {
      return res.status(400).json({ error: '参数不完整' });
    }
    // 查询数据库是否已经存在相同的 region 和 phone 值
    connection.query(
      'SELECT * FROM user WHERE region = ? AND phone = ?',
      [region, phone],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: '提交失败,数据库查询出错' });
        }
  
        // 如果数据库中不存在相同的 region 和 phone 值,则插入新数据
        if (results.length === 0) {
          connection.query(
            'INSERT INTO user (region, phone, create_time) VALUES (?, ?, NOW())',
            [region, phone],
            (error, results, fields) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ error: '提交失败,数据库插入出错' });
              }
              console.log(`收到手机号: ${phone}, 地区: ${region}`);
              res.json({ message: '提交成功' });
            }
          );
        } else {
          res.json({ error: '手机号和地区已存在' });
        }
      }
    );
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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });