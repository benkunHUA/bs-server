
var mysql = require('mysql');
var dbconfig = require("../config/database");
var bodyParser = require('body-parser');
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    getInfoList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = `select * from list`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}