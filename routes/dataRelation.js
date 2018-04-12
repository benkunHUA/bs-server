/**
 * @author 田野
 * @description 表关联路由
 * date 2018.3.1
 */
var express = require('express');
var dblink = require('../db/dbLink');
var dbTable = require('../db/dbTable');
var dbDataRelation = require('../db/dbDataRelation');
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
router.get('/get/tableList', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbDataRelation.getTableList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(result));
    });
});
router.get('/get/dataRelation', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbDataRelation.getDataRelationList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(result));
    });
});
router.post('/delete/dataRelation/:id', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //参数判断
    var index = req.params.id;
    if ( index == null ||  index == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    dbDataRelation.delete(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(""));
    });
});
router.post('/update/dataRelation/:id', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //参数判断
    var index = req.params.id;
    if ( index == null ||  index == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var guestColumnIndex = req.body.guestColumnIndex;
    if ( guestColumnIndex == null ||  guestColumnIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var relationTableIndex = req.body.relationTableIndex;
    if ( relationTableIndex == null ||  relationTableIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var relationColumnIndex = req.body.relationColumnIndex;
    if ( relationColumnIndex == null ||  relationColumnIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    dbDataRelation.update(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(""));
    });
});
router.post('/insert/dataRelation', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //参数判断
    var guestLinkIndex = req.body.guestLinkIndex;
    if ( guestLinkIndex == null ||  guestLinkIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var guestTableIndex  = req.body.guestTableIndex;
    if ( guestTableIndex  == null ||  guestTableIndex  == ""){
        res.json(resultUtil.getERROR(""));
        return
    }

    var guestColumnIndex = req.body.guestColumnIndex;
    if ( guestColumnIndex == null ||  guestColumnIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var relationTableIndex = req.body.relationTableIndex;
    if ( relationTableIndex == null ||  relationTableIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    var relationColumnIndex = req.body.relationColumnIndex;
    if ( relationColumnIndex == null ||  relationColumnIndex == ""){
        res.json(resultUtil.getERROR(""));
        return
    }
    dbDataRelation.insert(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        res.json(resultUtil.getSuccess(""));
    });
});
module.exports = router;
