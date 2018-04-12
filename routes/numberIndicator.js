/**
 * @author 田野
 * @description 数值指标路由
 * date 2018.2.28
 */
var express = require('express');
var dblink = require('../db/dbLink');
var dbTable = require('../db/dbTable');
var dbColumn = require('../db/dbColumn');
var resultUtil = require('../util/resultUtil');
var objUtil = require('../util/objUtil');
var router = express.Router();

router.get('/get/guestdbLink', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dblink.getLinkList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        var arr = objUtil.getDbLInk(result);
        res.json(resultUtil.getSuccess(arr));
    });
});
router.get('/get/guestdbTable', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbTable.getTableList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        var arr = objUtil.getDbTable(result);
        res.json(resultUtil.getSuccess(arr));
    });
});
router.get('/get/guestdbColumn', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbColumn.getColumnList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        var arr = objUtil.getDbColumn(result);
        res.json(resultUtil.getSuccess(arr));
    });
});
router.post('/update/updateIndicatorByIndex', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //参数判断
    var guestColumnIndex = req.body.guestColumnIndex;
    if ( guestColumnIndex == null ||  guestColumnIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var indicatorIndex = req.body.indicatorIndex;
    if (indicatorIndex == null || indicatorIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    dbColumn.updateIndicator(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(""));
    });
});
module.exports = router;
