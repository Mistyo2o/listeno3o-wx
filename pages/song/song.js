// pages/song/song.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 组件所需的参数
        navbarData: {
            showCapsule: 1, // 是否显示左上角图标   1表示显示    0表示不显示
            title: 'o3o liste', // 导航栏 中间的标题
            textColor: '#fff', // 标题颜色
            bgColor: '#fff0', // 导航栏背景颜色
            btnBgColor: '#fff0', // 胶囊按钮背景颜色
            iconColor: 'white', // icon颜色 black/white
            borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
        },
        playerComom:{},
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.systeminfo.statusBarHeight * 2 + 20,
        //歌单id
        playId: "",
        songList: [
            {
                id: "1",
                songName: "黄金甲",
                author: "周杰伦",
                album: "黄金甲",
                playUrl: "http://116.62.50.80:9000/music/%E9%BB%84%E9%87%91%E7%94%B2%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=sh86FzKIyKU7aevF%2F20230411%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230411T025906Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=66ca83ee6c072d369d7b54711fbccaf6c53bb7ffd14998307fd56a5b8026980c"
            },
            {
                id: "2",
                songName: "说好的幸福呢",
                author: "周杰伦",
                album: "魔杰座"
            },
            {
                id: "3",
                songName: "甜甜的",
                author: "周杰伦",
                album: "我很忙"
            },
            {
                id: "4",
                songName: "烟花易冷",
                author: "周杰伦",
                album: "跨时代"
            },
            {
                id: "5",
                songName: "兰亭序",
                author: "周杰伦",
                album: "魔杰座"
            },
            {
                id: "6",
                songName: "青花瓷",
                author: "周杰伦",
                album: "我很忙"
            },
            {
                id: "7",
                songName: "发如雪",
                author: "周杰伦",
                album: "十一月的萧邦"
            },
            {
                id: "8",
                songName: "花海",
                author: "周杰伦",
                album: "魔杰座"
            }
        ],
        songDetails: {
            title: "秋江月",
            img: "https://cdn.staticaly.com/gh/Mistyo2o/some-image@master/20230301/fengmian.webp",
            author: "花月年年"
        },
        playerSign: false
    },

    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },
    tap() {
        for (let i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1],
                    scrollTop: (i + 1) * 200
                })
                break
            }
        }
    },
    tapMove() {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },


    play: function (e) {
        this.setData({
            playerSign: true
        })
        app.globalData.playerSign = true
        this.playerComom = this.selectComponent("#player")
        this.playerComom.songPlay(e.currentTarget.dataset.id)       
    },

    scrolltolowerHandler: function(){
        if(app.globalData.playerSign){
            this.setData({
                playerSign: false
            })
        }
        
    },
    scrollHandler:function(event){
        if(app.globalData.playerSign){
            if(event.detail.scrollTop <= 80){
                this.setData({
                    playerSign: true
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        that.setData({
            //playId: options.playId
        })
        //根据歌单id 查询歌曲列表数据
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            playerSign: app.globalData.playerSign
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 2000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})