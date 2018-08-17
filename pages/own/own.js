// pages/own/own.js
const app = getApp();
import own from "../../utils/own.js";
import util from "../../utils/util.js";
import tap from "../../utils/tap.js";
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
    this.getmineGame();
  },
  getmineGame(){
    let userInfo = util.check("userInfo");
    if(!userInfo){
      userInfo = {};
      userInfo["avatarUrl"] = "../imgs/defult.png";
      userInfo["gender"] = 1;
      userInfo["nickName"] = "游戏小鹿";
    }
    own.request((data)=>{
      let url = app.globalData.urlBast;
      for(let i = 0;i < data.length;i++){
        data[i].gameIcon = url +"imgs/"+ data[i].gameId + data[i].gameIcon;
        data[i].qrCode = url +"imgs/"+ data[i].gameId + data[i].qrCode;
      }
      this.setData({data,userInfo})
    })
  },
  bindgetuserinfo(event){
    let userInfo = event.detail.userInfo;
    this.setData({userInfo})
    util.check("userInfo",userInfo);
  },
  // 预览图片跳转游戏
  bindQrCode(e){
    let image = e.currentTarget.dataset.qrcode;
    let id = e.currentTarget.dataset.gameid;
    util.preview(image);
  },
  // 跳转点击收集
  // bindGather(e){
  //   let id = e.currentTarget.dataset.gameid;
  //   tap.request(id,(res)=>{
  //     console.log('点击1',res)
  //   })
  // },
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