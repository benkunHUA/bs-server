var express = require('express');
var bodyParser = require('body-parser');
var dbLogin = require('../db/dbLogin');
var resultUtil = require('../util/resultUtil');
var objUtil = require('../util/objUtil');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    dbLogin.checkLogin(req,res,function(err,result) {
        if(err){
            res.json(resultUtil.getERROR(""));
            return;
        }
        var password = req.query.password;
        if(password == result[0].PASSWORD){
			res.json(resultUtil.getSuccess(result[0]));
        }
    });
});

module.exports = router;