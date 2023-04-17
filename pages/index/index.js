// index.js
// 获取应用实例
const app = getApp()
const musicApi = require("../../utils/musicApi")
Page({
    data: {
        iconPlayStart: "../../assets/images/playStart.png",
        iconPlayStop: "../../assets/images/playStop.png",
        dataList: [],
        playerSign: ""
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
    toSongList:function(e){
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '../song/song?playId=' + e.currentTarget.dataset.id,
        })
    },

    //歌单列表
    getPlay(){
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
        that.getPlay()
        that.setData({
            playerSign: app.globalData.playerSign
        })
        //根据歌单id 查询歌曲列表数据
    },

    onShow() {
        let that = this
        that.setData({
            playerSign: app.globalData.playerSign
        })
    },
})
