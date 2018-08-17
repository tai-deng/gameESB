// pages/index/moreGame.js
import util from "../../utils/util.js";
import tap from "../../utils/tap.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.data)
  },
  // 预览图片跳转游戏
  bindQrCode(e){
    let id = e.currentTarget.dataset.gameId;
    let image = e.currentTarget.dataset.qrcode;
    util.preview(image,id);
  },
  // 跳转点击收集
  bindGather(e){
    let id = e.currentTarget.dataset.gameId;
    tap.request(id,(res)=>{
      // console.log('点击1',res)
    })
  },
  getData(name){
    let that = this;
    wx.request({
        url: app.globalData.url + `api/discover_detail?detail_name=${name}`,
        data: {
            detail_name:name
        },
        method:'POST',
        header: {
            'content-type': 'application/json',
        },
        success: function(res) {
          that.setData({
            data:res.data
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})