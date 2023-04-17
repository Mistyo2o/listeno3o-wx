//创建播放对象
const songAudio = wx.createInnerAudioContext()
const app = getApp()
Component({
    /**
     * 页面的初始数据
     */
    data: {
        //播放标记
        tridPlay: ""
    },

    attached: function () {
        this.setData({
            tridPlay: app.globalData.playerBtn
        })
    },



    methods: {
        //播放按钮
        songPlay: function (playUrl) {
            let that = this
            songAudio.src = playUrl
            if (that.data.tridPlay) {
                //暂停
                songAudio.pause();
                that.setData({ tridPlay: false })
                app.globalData.playerBtn = false
            } else {
                songAudio.play();
                that.setData({ tridPlay: true })
                app.globalData.playerBtn = true
                songAudio.onEnded(function(){
                    console.log('播放结束')
                    that.setData({ tridPlay: false })
                    app.globalData.playerBtn = false
                })
            }
        },
        //点击播放
        cickPlay:function(playUrl){
            let that = this
            songAudio.src = playUrl
            songAudio.play();
            that.setData({ tridPlay: true })
            app.globalData.playerBtn = true
            songAudio.onEnded(function(){
                console.log('播放结束')
                that.setData({ tridPlay: false })
                app.globalData.playerBtn = false
            })
        }
    }
})
