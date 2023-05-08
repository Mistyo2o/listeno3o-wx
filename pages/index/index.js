// index.js
// 获取应用实例
const app = getApp()
const musicApi = require("../../utils/musicApi")
const userInfoApi = require("../../utils/userInfoApi")

Page({
    data: {
        iconPlayStart: "../../assets/images/playStart.png",
        iconPlayStop: "../../assets/images/playStop.png",
        dataList: [],
        playerSign: "",
        qqUsers: [],
        user: app.globalData.userInfo
    },
    //添加用户
    addUser: function () {
        wx.showModal({
            title: '添加账号',
            editable: true,
            placeholderText: '请输入需要添加的账号',
            complete: (res) => {
                if (res.confirm) {
                    //获取账号和微信用户绑定
                    console.log(res.content)
                    let data = {
                        openId: app.globalData.userInfo.openId,
                        qq: res.content,
                        option: 0
                    }
                    userInfoApi.saveUserQq(data).then(res => {
                        console.log(res, '添加账号成功')
                        //刷新账号列表
                        userInfoApi.getUserQqList(app.globalData.userInfo.openId).then(res => {
                            console.log(res.data)
                            this.setData({
                                qqUsers: res.data
                            })
                        })
                    })
                }
            }
        })
    },

    //切换用户
    switchUser: function (e) {
        let that = this
        userInfoApi.updateUserQqDef(e.currentTarget.dataset.id)
            .then(res1 => {
                console.log(res1, '更新选中成功')
                //重新加载账号列表
                userInfoApi.getUserQqList(app.globalData.userInfo.openId).then(res => {
                    this.setData({
                        qqUsers: res.data
                    })
                    res.data.forEach(function (item) {
                        //加载默认选中的歌单列表
                        if (item.def == 1) {
                            //获取账号 加载歌单列表
                            that.getPlay(item.qq)
                        }
                    })
                })
            })
        // this.getPlay(e.currentTarget.dataset.id)
    },

    //点击播放icon
    playCheck: function (e) {
        let checkObjId = e.target.dataset.id;
        let list = this.data.dataList;
        //获取当前按钮当前状态
        let checkObj = list.filter(item => item.id == checkObjId)[0];
        let sta = !checkObj.isPlay;
        list.filter(item => {
            //切换当前按钮状态
            if (item.id == checkObjId) {
                item.isPlay = sta
            }
            //切换其他按钮状态
            if (item.isPlay == sta && item.id != checkObjId) {
                item.isPlay = false
            }
        })
        this.setData({
            dataList: list
        })
    },

    //跳转歌曲列表页面
    toSongList: function (e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../song/song?playId=' + e.currentTarget.dataset.id,
        })
    },

    //歌单列表
    getPlay(qq) {
        musicApi.playList(qq).then(res => {
            this.setData({
                dataList: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    },

    onLoad(options) {
        let that = this
        if (!app.globalData.userInfo) {
            that.weChatUserLogin()
        } else {
            var userInfo = app.globalData.userInfo
            userInfoApi.getUserQqList(userInfo.openId).then(res => {
                this.setData({
                    qqUsers: res
                })
                res.data.forEach(function (item) {
                    //加载默认选中的歌单列表
                    if (item.def == 1) {
                        console.log(1)
                        that.getPlay(item.qq)
                    }
                })
            })
        }
    },

    //登录获取openid 
    weChatUserLogin: function () {
        let that = this
        wx.login({
            success: res => {
                let code = res.code
                //换取openid
                userInfoApi.getOpenId(code).then(codeRes => {
                    if(200 == codeRes.code){
                       let _openid = codeRes.data.openid
                       let _sessionKey = codeRes.data.sessionKey
                        userInfoApi.getUserInfo(_openid).then(resUser => {
                            if(200 == resUser.code){
                                if (resUser.data) {
                                    //存在用户信息
                                    app.globalData.userInfo = resUser.data
                                    this.setData({
                                        user: resUser.data
                                    })
                                    //根据用户信息 查询绑定的QQ账号
                                    userInfoApi.getUserQqList(resUser.data.openId).then(res => {
                                        this.setData({
                                            qqUsers: res.data
                                        })
                                        //加载上一次选择的账号加载歌单
                                        res.data.forEach(function (item) {
                                            //加载默认选中的歌单列表
                                            if (item.def == 1) {
                                                console.log(1)
                                                that.getPlay(item.qq)
                                            }
                                        })
                                    })
                                } else {
                                    //用户首次进入
                                    wx.showModal({
                                        title: '提示框',
                                        content: '为了更好的用户体验，我们将获取您的微信头像和名称',
                                        complete: (sm) => {
                                            if (sm.confirm) {
                                                //获取用户信息并保存
                                                wx.getUserProfile({
                                                    desc: '您的信息仅作为个人展示',
                                                    success: up => {
                                                        let userInfo = {
                                                            openId: _openid,
                                                            sessionKey: _sessionKey,    
                                                            avatarUrl: up.userInfo.avatarUrl,
                                                            nickName: up.userInfo.nickName
                                                        }
                                                        app.globalData.userInfo = userInfo
                                                        userInfoApi.saveUserInfo(userInfo).then(res => {
                                                            if( 200 == res.code){
                                                                //重新加载页面
                                                                that.weChatUserLogin()
                                                            }
                                                        }).catch(res => {
            
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                    
                }).catch(err => {

                })
            }
        })
    },

    initPlayList() {
        //根据openid 关联出当前用户绑定的QQ音乐账号
        that.getPlay()
        that.setData({
            playerSign: app.globalData.playerSign
        })
    },

    onShow() {
        let that = this
        that.setData({
            playerSign: app.globalData.playerSign
        })
    },
})
