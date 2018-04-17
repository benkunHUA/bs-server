
var mysql = require('mysql');
var dbconfig = require("../config/database");
var bodyParser = require('body-parser');
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    uploadVideo:function(req,res,callback) {
        var that = this;
        pool.getConnection(function(err, connection) {
            var reqBody;
            for(var key in req.body){
                reqBody = JSON.parse(key);
            }
            var userid = reqBody.userid;
            var videoUrl = reqBody.videoUrl;
            that.addInfo(userid,videoUrl);
            //定义查询语句
            var sql = `INSERT INTO video (USERID, VIDEOURL) VALUES ("${userid}", "${videoUrl}")`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    getVideoList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var token = req.query.token;

            //定义查询语句
            var sql = `select * from album where USERID="${token}" and ISVIDEO=1`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    
    addInfo:function(userId,videoUrl) {
        pool.getConnection(function(err, connection) {
            var myDate = new Date();
            var time = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()} 
                        ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            //定义查询语句
            var sql = `INSERT INTO list (USERID, TIME, VIDEOURL) VALUES ("${userId}", "${time}", "${videoUrl}")`;
            connection.query(sql,function(err,result) {
                connection.release();
            })
        });
    },
}