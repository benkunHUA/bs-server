var express = require('express');
var dbAlbum = require('../db/dbAlbum');
var resultUtil = require('../util/resultUtil');
var objUtil = require('../util/objUtil');
var router = express.Router();

router.post('/cerateAlbum', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:POST");
    res.header("Access-Control-Allow-Headers:x-requested-with,content-type");
    dbAlbum.cerateAlbum(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
		res.json(resultUtil.getSuccess("success"));
    });
});

router.get('/getAlbumList', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbAlbum.getAlbumList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
		res.json(resultUtil.getSuccess(result));
    });
});

module.exports = router;