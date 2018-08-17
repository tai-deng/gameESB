
/**
 * 点击
 */

const app = getApp();

const request = (id,callback)=>{
    wx.request({
        url: app.globalData.url + `api/push_click?game_id=${id}`,
        data: {
            game_id:id
        },
        method:'POST',
        header: {
            'content-type': 'application/json',
        },
        success: function(res) {
            if(typeof callback == "function"){
                callback(res.data)
            }
        }
    })
}

module.exports = {
    request
}