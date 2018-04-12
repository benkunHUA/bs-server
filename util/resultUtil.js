/**
 * @author 田野
 * @description 返回信息
 * date 2018.2.28
 */
module.exports = {
    getSuccess:function(res) {
       var result = {
           resResult:"OK",
           resContent:res,
           resCode:"0",

       }
       return result;
    },
    getERROR:function(res) {
        var result = {
            resResult:"ERROR",
            resContent:res,
            resCode:"1",

        }
        return result;
    },
}