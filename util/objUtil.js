/**
 * @author 田野
 * @description 对象转换工具
 * date 2018.2.28
 */
module.exports = {
    getDbLInk:function(result) {
        var array = new Array();
        for (var i = 0; i< result.length ;i++){
            var obj =  result[i];
            var newObj = {};
            newObj.guestLinkIndex = obj.GUESTLINKINDEX
            newObj.guestDbName = obj.GUESTDBNAME;
            newObj.connectionStr = obj.CONNECTIONSTR;
            newObj.username = obj.USERNAME;
            newObj.password = obj.PASSWORD;
            newObj.dbtype = obj.DBTYPE;
            newObj.mtime =obj.MTIME;
            array[i] = newObj;
        }
        return array;
    },
    getDbTable:function(result) {
        var array = new Array();
        for (var i = 0; i< result.length ;i++){
            var obj =  result[i];
            var newObj = {};
            newObj.guestTableIndex = obj.GUESTTABLEINDEX;
            newObj.guestLinkIndex = obj.GUESTLINKINDEX;
            newObj.guestTableName = obj.GUESTTABLENAME;
            newObj.guestTableComment = obj.GUESTTABLECOMMENT;
            newObj.guestTableLastUpdate= obj.GUESTTABLELASTUPDATE;
            newObj.matchTag = obj.MATCHTAG;
            array[i] = newObj;
        }
        return array;
    },
    getDbColumn:function(result) {
        var array = new Array();
        for (var i = 0; i< result.length ;i++){
            var obj =  result[i];
            var newObj = {};
            newObj.guestColumnIndex = obj.GUESTCOLUMNINDEX;
            newObj.guestTableIndex = obj.GUESTTABLEINDEX;
            newObj.guestColumnName = obj.GUESTCOLUMNNAME;
            newObj.guestColumnDataType = obj.GUESTCOLUMNDATATYPE;
            newObj.guestColumnCharacter = obj.GUESTCOLUMNCHARACTER;
            newObj.guestColumnType = obj. GUESTCOLUMNTYPE;
            newObj.guestColumnComment = obj. GUESTCOLUMNCOMMENT;
            newObj.indicatorIndex = obj. INDICATORINDEX;
            newObj.matchTag = obj.MATCHTAG;
            newObj.columnTag = obj.COLUMNTAG;
            array[i] = newObj;
        }
        return array;
    },
}