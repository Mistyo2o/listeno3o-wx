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
        qqUsers:[
            // {
            //     "name":"账号1",
            //     "qq":"2548635937"
            // },
            // {
            //     "name":"账号2",
            //     "qq":"2548635937"
            // },
            // {
            //     "name":"账号3",
            //     "qq":"2548635937"
            // },
            // {
            //     "name":"账号4",
            //     "qq":"2548635937"
            // }
        ]
    },
    //添加用户
    addUser:function(){
        wx.showModal({
          title: '添加账号',
          editable: true,
          placeholderText: '请输入需要添加的账号',
          complete: (res) => {
            if (res.cancel) {
                console.log('取消添加')
            }
        
            if (res.confirm) {
                //获取账号和微信用户绑定
                console.log(res.content)
            }
          }
        })
    },

    //切换用户
    switchUser: function(e){
        //获取账号 加载歌单列表
        console.log(e.currentTarget.dataset.id)

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
    getPlay() {
        musicApi.playList("2548635937").then(res => {
            this.setData({
                dataList: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    },

    onLoad(options) {
        let that = this
        if(!app.globalData.userInfo){
            wx.login({
                success: res => {
                    let code = res.code
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                        url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx9c51377ee8928c15&secret=69a82eae213ee12fb04cbe60d8660fbe&js_code=${code}&grant_type=authorization_code`,
                        success: res => {
                            var openId = res.data.openid
                            var sessionKey = res.data.session_key
                            userInfoApi.getUserInfo(openId).then(userInfo => {
                                if (userInfo.data) {
                                    //存在用户信息
                                    app.globalData.userInfo = userInfo.data
                                    //根据用户信息 查询绑定的QQ账号 未绑定账号用户无歌单数据 有绑定加载上一次选择的账号加载歌单

                                } else {
                                    //用户首次进入
                                    wx.showModal({
                                        title: '提示框',
                                        content: '为了更好的用户体验，我们将获取您的微信头像和名称',
                                        complete: (sm) => {
                                            if (sm.cancel) {
                                                //取消
                                            }
                                            if (sm.confirm) {
                                                //获取用户信息并保存
                                                wx.getUserProfile({
                                                    desc: '您的信息仅作为个人展示',
                                                    success: up => {
                                                        console.log(up)
                                                        let userInfo = {
                                                            openId: openId,
                                                            sessionKey: sessionKey,
                                                            avatarUrl: up.userInfo.avatarUrl,
                                                            nickName: up.userInfo.nickName
                                                        }
                                                        app.globalData.userInfo = userInfo
                                                        userInfoApi.saveUserInfo(userInfo).then(res=>{
                                                            console.log(res)
                                                        }).catch(res =>{
    
                                                        })
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
                }
            })
        }
    },

    initPlayList(){
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
