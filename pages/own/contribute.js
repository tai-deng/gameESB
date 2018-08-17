// pages/own/contribute.js
import util from "../../utils/util.js";
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
  
  },
  // 上传
  onUploading(e){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var isUpImage = res.tempFilePaths
        console.log(isUpImage)
        that.setData({isUpImage})
      }
    })
  },
  // 提交
  onSubmit(e){
    let appId = e.detail.value.appId.trim();
    let email = e.detail.value.email.trim();
    let name = e.detail.value.name.trim();
    let phone = e.detail.value.phone.trim();
    let title = e.detail.value.title.trim();
    let isUpImage = this.data.isUpImage;
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let contribute = util.check("contribute");
    if(!contribute) contribute = [];
    if(appId && email && name && myreg.test(phone) && title && isUpImage){
      wx.showToast({title:"提交成功!"});
      let obj = {appId,email,name,phone,title,isUpImage};
      contribute.push(obj);
    }else{
      let info = '';
      if(!title){
        info = "游戏名不能为空"
      }else if(!name){
        info = "姓名不能为空"
      }else if(!myreg.test(phone)){
        info = "电话不能为空"
      }else if(!email){
        info = "邮箱不能为空"
      }else if(!appId){
        info = "appId不能为空"
      }else if(!isUpImage){
        info = "游戏图片不能为空"
      }
      wx.showToast({title:info,icon:"none"});
    }
  },
  // 删除图片
  onDelImg(e){
    let isUpImage = this.data.isUpImage;
    this.setData({isUpImage:''})
  },
  onRecord(e){
    let contribute = util.check("contribute");
    let title='';
    if(contribute){
      title = "共有"+contribute.length + "记录";
    }else{
      title = "暂时没有任何记录"
    }
    wx.showToast({title,icon:"none"});
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