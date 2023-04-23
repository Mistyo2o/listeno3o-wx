const devUrl = "http://127.0.0.1:8090/"

const request = function (url, options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: devUrl + url,
            method: options.method,
            data: options.method == "GET" ? options.data : JSON.stringify(options.data),
            success: (res) => {
                if (res.data.code === 200) {
                    //成功
                    resolve(res.data)
                } else {
                    //失败
                    console.log(res)
                    reject(res.msg)
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

module.exports = {
    //get
    get(url, data){
        return request(url,{method:"GET", data})
    },

    //post
    post(url, data){
        return request(url,{method:"POST", data})
    }
}