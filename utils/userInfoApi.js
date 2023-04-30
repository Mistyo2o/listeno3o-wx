const req = require("./request")
module.exports = {
    //获取用户登录信息
    getUserInfo(openId){
        let url = "weChatUser/getInfo/" + openId
        return req.get(url, {})
    },
    //获取用户添加的qq账号
    getUserQqList(openId){
        let url = "weChatUser/getQq/" + openId
        return req.get(url, {})
    },
    //保存用户相关信息
    saveUserInfo(obj){
        let url = "weChatUser/save"
        return req.post(url ,obj)
    },
    saveUserQq(obj){
        let url = "weChatUser/saveUserQq"
        return req.post(url ,obj)
    },
    updateUserQqDef(qq){
        let url = "weChatUser/uDef/" + qq
        return req.get(url ,{})
    }
}