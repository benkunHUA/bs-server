/**
 * @author 田野
 * @description 表关联配置
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
            var sql = "select DISTINCT b.GUESTTABLEINDEX as guestTableIndex ,a.GUESTTABLENAME as guestTableName,a.GUESTTABLECOMMENT as guestTableComment "
                + "from guestdbtableinfo as a,datarelation as b "
                + "WHERE a.GUESTTABLEINDEX = b.GUESTTABLEINDEX ";
            var index = req.query.guestLinkIndex;
            if (index != null && index != ""){
                sql += " AND b.GUESTLINKINDEX = " + index;
            }
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    getDataRelationList:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "select a.GUESTCOLUMNNAME as guestColumnName ,a.GUESTCOLUMNCOMMENT as guestColumnComment,"
                + "b.GUESTTABLENAME as relationTableName,b.GUESTTABLECOMMENT as relationTableComment,"
                + "c.GUESTCOLUMNNAME as relationColumnName,c.GUESTCOLUMNCOMMENT as relationColumnComment,"
                + "d.GUESTCOLUMNINDEX as guestColumnIndex,d.RELATIONTABLEINDEX as relationTableIndex,"
                + "d.RELATIONCOLUMNINDEX as relationColumnIndex,d.DATARELATIONINDEX as dataRelationIndex "
                + "from guestdbcolumninfo as a,guestdbtableinfo as b,guestdbcolumninfo as c,datarelation as d "
                + "WHERE a.GUESTCOLUMNINDEX = d.GUESTCOLUMNINDEX "
                + "AND b.GUESTTABLEINDEX = d.RELATIONTABLEINDEX "
                + "AND c.GUESTCOLUMNINDEX = d.RELATIONCOLUMNINDEX ";
            var index = req.query.guestTableIndex;
            if (index != null && index != ""){
                sql += " AND d.GUESTTABLEINDEX  = " + index;
            }
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    delete:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var index = req.params.id;
            var sql = "delete from datarelation  where DATARELATIONINDEX = " + index;
            console.log(sql);
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    update:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var index = req.params.id;
            var guestColumnIndex = req.body.guestColumnIndex;
            var relationTableIndex = req.body.relationTableIndex;
            var relationColumnIndex = req.body.relationColumnIndex;
            var sql = "update datarelation "
                + " set GUESTCOLUMNINDEX = " + guestColumnIndex
                + ", RELATIONTABLEINDEX = " + relationTableIndex
                + ", RELATIONCOLUMNINDEX = " + relationColumnIndex
                + " where DATARELATIONINDEX = " + index;
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
    insert:function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var guestLinkIndex = req.body.guestLinkIndex;
            var guestTableIndex  = req.body.guestTableIndex;
            var guestColumnIndex = req.body.guestColumnIndex;
            var relationTableIndex = req.body.relationTableIndex;
            var relationColumnIndex = req.body.relationColumnIndex;
            var sql = "insert into datarelation (GUESTLINKINDEX,GUESTTABLEINDEX,GUESTCOLUMNINDEX,RELATIONTABLEINDEX,RELATIONCOLUMNINDEX) values ( "
                       + guestLinkIndex + ", " + guestTableIndex + ", " + guestColumnIndex + ", "
                       + relationTableIndex + ", " + relationColumnIndex  + " )";
            connection.query(sql,function(err,result) {
                callback(err,result);
                connection.release();
            })
        });
    },
}