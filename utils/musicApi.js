const req = require("./request")
const devUrl = "http://127.0.0.1:8090/"
module.exports = {
    //歌单
    playList(id){
        let url = devUrl + "music/getPlay/" + id
        return req.get(url, {})
    },
    //歌曲列表
    songList(playId){
        let url = devUrl + "music/getSong/" + playId
        return req.get(url, {})
    }
}