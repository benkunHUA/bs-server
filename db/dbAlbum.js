
var mysql = require('mysql');
var dbconfig = require("../config/database");
var bodyParser = require('body-parser');
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    cerateAlbum:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var reqBody;
            for(var key in req.body){
                reqBody = JSON.parse(key);
            }
            var userid = reqBody.userid;
            var title = reqBody.title;
            var summary = reqBody.summary;

            //定义查询语句
            var sql = `INSERT INTO album (USERID, TITLE, SUMMARY) VALUES ("${userid}", "${title}", "${summary}")`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    getAlbumList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var token = req.query.token;

            //定义查询语句
            var sql = `select * from album where USERID="${token}"`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}