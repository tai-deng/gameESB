/**
 * 分类
 */
const app = getApp();
const request = (callback)=>{
    wx.request({
        url: app.globalData.url + 'api/classify',
        data: {},
        header: {
            'content-type': 'application/json',
        },
        method:'POST',
        success: function(res) {
            if(typeof callback == "function"){
                callback(res.data)
            }
        }
    })
}

module.exports = {
    request,
}