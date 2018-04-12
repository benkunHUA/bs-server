var express = require('express');
var dbinfo = require('../db/dbinfo');
var resultUtil = require('../util/resultUtil');
var objUtil = require('../util/objUtil');
var router = express.Router();

router.get('/getInfoList', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbinfo.getInfoList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
		res.json(resultUtil.getSuccess(result));
    });
});

module.exports = router;