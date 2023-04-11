//创建播放对象
const songAudio = wx.createInnerAudioContext()
Component({
    /**
     * 页面的初始数据
     */
    data: {
        //播放标记
        tridPlay: false,
    },

    attached: function () {
        console.log(111)
        songAudio.src = "http://116.62.50.80:9000/music/%E6%98%8E%E6%98%8E%E5%B0%B1%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=sh86FzKIyKU7aevF%2F20230411%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230411T025908Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=cc996bdaa2b748dc3362c42e181bacdb1b7d6d7dc54eae66ca8d283eae151a34"
    },



    methods: {

        //播放按钮
        songPlay: function () {
            console.log('play')
            let that = this
            if (that.data.tridPlay) {
                //暂停
                songAudio.pause();
                that.setData({ tridPlay: false })
            } else {
                songAudio.play();
                that.setData({ tridPlay: true })
                songAudio.onEnded(function(){
                    console.log('播放结束')
                    that.setData({ tridPlay: false })
                })
            }
        },
    }
})
