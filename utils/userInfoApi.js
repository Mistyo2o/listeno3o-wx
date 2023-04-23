const req = require("./request")
module.exports = {
    //获取用户登录信息
    getUserInfo(openId){
        let url = "weChatUser/getInfo/" + openId
        return req.get(url, {})
    },
    saveUserInfo(obj){
        let url = "weChatUser/save"
        return req.post(url ,obj)
    }
}