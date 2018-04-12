/**
 * @author 田野
 * @description 数据表信息
 * date 2018.2.28
 */
var mysql = require('mysql');
var dbconfig = require("../config/database");
//使用连接池
var pool = mysql.createPool(dbconfig.mysql);
module.exports = {
    getTableList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "select * from guestdbtableinfo WHERE 1 =1";
            var index = req.query.guestLinkIndex;
            if (index != null && index != ""){
                sql += " AND GUESTLINKINDEX = " + index;
            }
            var comment =   req.query.comment;
            if (comment != null && comment != ""){
                sql += " AND  GUESTTABLECOMMENT  like CONCAT('%','" + comment + "','%') ";
            }
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}