/**
 * @author 田野
 * @description 数据库连接信息
 * date 2018.2.28
 */
var mysql = require('mysql');
var dbconfig = require("../config/database");
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    getLinkList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "select * from guestdblinkinfo";
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}