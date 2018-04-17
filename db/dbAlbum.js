
var mysql = require('mysql');
var dbconfig = require("../config/database");
var bodyParser = require('body-parser');
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    cerateAlbum:function(req,res,callback) {
        var that = this;
        pool.getConnection(function(err, connection) {
            var reqBody;
            for(var key in req.body){
                reqBody = JSON.parse(key);
            }
            var userid = reqBody.userid;
            var title = reqBody.title;
            var summary = reqBody.summary;
            var albumList = reqBody.albumList;
            var isVideo = reqBody.isVideo;
            var isShare = reqBody.isShare;
            //定义查询语句
            var sql = `INSERT INTO album (USERID, TITLE, SUMMARY, ALBUMLIST, ISVIDEO) 
                    VALUES ("${userid}", "${title}", "${summary}", "${albumList}", "${isVideo}")`;
            connection.query(sql,function(err,result) {
                if(isShare){
                    that.getVideoId(userid,albumList);
                }
                callback(err,result);
                connection.release();
            })
        });
    },
    getAlbumList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var token = req.query.token;

            //定义查询语句
            var sql = `select * from album where USERID="${token}" and ISVIDEO=0`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    uploadAlbumPic:function(req,res,callback) {
        var that = this;
        pool.getConnection(function(err, connection) {
            var reqBody = req.body;
            for(var key in req.body){
                reqBody = JSON.parse(key);
            }
            var albumId = reqBody.albumId;
            var userId = reqBody.userId;
            var isShare = reqBody.isShare;
            var uploadList = JSON.stringify(reqBody.uploadList);
            if(isShare){
                that.addInfo(userId,albumId);
            }
            //定义查询语句
            var sql = `UPDATE album SET ALBUMLIST='${uploadList}' where ALBUMID=${albumId}`;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    addInfo:function(userId,albumId) {
        pool.getConnection(function(err, connection) {
            var myDate = new Date();
            var time = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()} 
                        ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            //定义查询语句
            var sql = `INSERT INTO list (USERID, ALBUMID, TIME) VALUES ("${userId}", "${albumId}", "${time}")`;
            connection.query(sql,function(err,result) {
                connection.release();
            })
        });
    },
    getVideoId:function(userId,albumList) {
        var that = this;
        pool.getConnection(function(err, connection) {
            var sql =`select ALBUMID from album where albumList="${albumList}"`;
            connection.query(sql,function(err,result) {
                var albumId = result[0].ALBUMID;
                console.log(result);
                that.addInfo(userId,albumId);
                connection.release();
            })
        });
    },
}