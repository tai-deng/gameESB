/**
 * 任务数据
 */

const app = getApp();

const request = (callback)=>{
    wx.request({
        url: app.globalData.urlBast + 'task.json',
        data: {},
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
module.exports={
    request
}