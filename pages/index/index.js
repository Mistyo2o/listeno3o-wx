// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        iconPlayStart: "../../assets/images/playStart.png",
        iconPlayStop: "../../assets/images/playStop.png",
        dataList: [
            {
                id:"1",
                cover: "https://cdn.staticaly.com/gh/Mistyo2o/some-image@master/20230301/fengmian.webp",
                title: "秋江月",
                isPlay: false
            },
            {
                id:"2",
                cover: "https://cdn.staticaly.com/gh/Mistyo2o/some-image@master/20230301/fengmian.webp",
                title: "风凛冽",
                isPlay: false
            },
            {
                id:"3",
                cover: "https://cdn.staticaly.com/gh/Mistyo2o/some-image@master/20230301/fengmian.webp",
                title: "见君意",
                isPlay: false
            }
        ],
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

    onLoad(options) {
        let that = this
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
