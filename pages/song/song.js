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
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.systeminfo.statusBarHeight * 2 + 20,
        //歌单id
        playId: "",
        songList: [],
        songDetails: {
            title: "秋江月",
            img: "https://cdn.staticaly.com/gh/Mistyo2o/some-image@master/20230301/fengmian.webp",
            author: "花月年年"
        }
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        that.setData({
            playId: options.playId
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