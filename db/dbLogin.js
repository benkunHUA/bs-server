
var mysql = require('mysql');
var dbconfig = require("../config/database");
var bodyParser = require('body-parser');
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    checkLogin:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var email = req.query.email;
            var password = req.query.password;
            //定义查询语句
            var sql = `select * from user where USERNAME="${email}"`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}