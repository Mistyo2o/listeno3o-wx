const req = require("./request")
module.exports = {
    //歌单
    playList(id){
        let url = "music/getPlay/" + id
        return req.get(url, {})
    },
    //歌曲列表
    songList(playId){
        let url = "music/getSong/" + playId
        return req.get(url, {})
    }
}