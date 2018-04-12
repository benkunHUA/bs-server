/**
 * @author 田野
 * @description 数据列信息
 * date 2018.2.28
 */
var mysql = require('mysql');
var dbconfig = require("../config/database");
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    getColumnList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "select * from guestdbcolumninfo WHERE 1 =1";

            var index = req.query.guestTableIndex;
            if (index != null && index != ""){
                sql += " AND GUESTTABLEINDEX = " + index;
            }
            var comment =   req.query.comment;
            if (comment != null && comment != ""){
                sql += " AND  GUESTCOLUMNCOMMENT   like CONCAT('%','" + comment + "','%') ";
            }
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    updateIndicator:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var guestColumnIndex = req.body.guestColumnIndex;
            var indicatorIndex = req.body.indicatorIndex;
            //定义查询语句
            var sql = "update guestdbcolumninfo set INDICATORINDEX = " + indicatorIndex
                     + " where GUESTCOLUMNINDEX = " + guestColumnIndex;
            console.log(sql);
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}