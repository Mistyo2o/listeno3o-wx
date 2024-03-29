const userInfoApi = require("./utils/userInfoApi")
App({
    onLaunch: function () {
        // 展示本地存储能力
        //   var logs = wx.getStorageSync('logs') || []
        //     logs.unshift(Date.now())
        //     wx.setStorageSync('logs', logs)
        //右上角胶囊能背景


        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    // wx.getUserInfo({
                    //     success: res => {
                    //         // 可以将 res 发送给后台解码出 unionId
                    //         this.globalData.userInfo = res.userInfo

                    //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    //         // 所以此处加入 callback 以防止这种情况
                    //         if (this.userInfoReadyCallback) {
                    //             this.userInfoReadyCallback(res)
                    //         }
                    //     }
                    // })
                }
            }
        })
        // 获取设备信息
        wx.getSystemInfo({
            success: (res) => {
                // console.log(res);
                this.globalData.systeminfo = res
            },
        })
        // 获得胶囊按钮位置信息
        this.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect()
    },
    globalData: {
        userInfo: null,
        systeminfo: {}, // 系统信息
        headerBtnPosi: {}, // 胶囊按钮位置信息
        playerSign: false, //播放器组件展示标记
        playerBtn: false //播放按钮状态
    }
})