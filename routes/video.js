var express = require('express');
var dbVideo = require('../db/dbVideo');
var resultUtil = require('../util/resultUtil');
var objUtil = require('../util/objUtil');
var router = express.Router();

router.post('/uploadVideo', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbVideo.uploadVideo(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
		res.json(resultUtil.getSuccess(result));
    });
});

router.get('/getVideoList', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbVideo.getVideoList(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
		res.json(resultUtil.getSuccess(result));
    });
});

module.exports = router;