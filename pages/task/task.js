// pages/task/task.js
import util from "../../utils/util.js";
import Task from "../../utils/task.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      grand:0,
      award:0,
    },
  },
  onLoad: function (options) {
    this.onGetData();
  },
  // 签到
  onSignIn(e){
    let data = this.data.data;
    if(!data.isSign){
      let signDataAll = this.data.signDataAll;
      let currentDate = util.formatTime(new Date());
      for(let i = 0;i < signDataAll.signIn.length;i++){
        if(signDataAll.signIn[i].date == currentDate){
          signDataAll.signIn[i].isNeck = true;
          data.award = signDataAll.signIn[i].award;
        }
      }
      data.isSign = true;
      data.grand += 1;
      this.onSignInTask();
      let signIna = signDataAll.signIn.slice(0,4);
      let signInb = signDataAll.signIn.slice(4,7);
      this.setData({data,signIna,signInb});
      util.check("signDataAll",signDataAll);
    }
  },
  // 获取数据
  onGetData(){
    let signDataAll = util.check("signDataAll");
    let isSuccess = false;
    let data = this.data.data;
    if(signDataAll){
      for(let i = 0;i < signDataAll.signIn.length; i++){
        if(signDataAll.signIn[i].isNeck){
          data.grand += 1;
          if(this.onFulfillDate(signDataAll.signIn[i].date) >= this.onGoOver()){
            isSuccess = true;
          }
        }
      }

      signDataAll.tasksInfo = this.onIsSignIn(signDataAll.signIn,signDataAll.tasksInfo);
      if(isSuccess){
        let signIna = signDataAll.signIn.slice(0,4);
        let signInb = signDataAll.signIn.slice(4,7);
        let tasksInfo = signDataAll.tasksInfo;
        this.setData({signIna,signInb,tasksInfo,signDataAll,data})
      }else{
        util.delStorage("signDataAll");
        Task.request((data)=>{
          this.onResetSign(data);
        })
      }

    }else{
      Task.request((data)=>{
        this.onResetSign(data);
      })
    }

  },
  // 重置
  onResetSign(data){
    let date = new Date().getTime();
    let locData = this.data.data;
    let url = app.globalData.urlBast;
    locData.grand = 0;
    locData.isSign = false;
    for(let i = 0;i < data.signIn.length;i++){
      data.signIn[i].isNeck = false;
      data.signIn[i].date = util.formatTime(new Date(date + (86400000*i)));
      data.signIn[i].moneyImg = url +"imgs/"+ data.signIn[i].gameId + data.signIn[i].moneyImg;
    }

    for(let i = 0;i < data.tasksInfo.length;i++){
      data.tasksInfo[i].status = 1;
      data.tasksInfo[i].finish = 0;
      data.tasksInfo[i].taskImg = url +"imgs/"+ data.tasksInfo[i].gameId + data.tasksInfo[i].taskImg;
      data.tasksInfo[i].taskIcon = url +"imgs/"+ data.tasksInfo[i].gameId + data.tasksInfo[i].taskIcon;
    }

    let signIna = data.signIn.slice(0,4);
    let signInb = data.signIn.slice(4,7);
    let tasksInfo = data.tasksInfo;
    this.setData({signIna,signInb,tasksInfo,signDataAll:data,data:locData});
    util.check("signDataAll",data);
  },
  // 最后一次签到时间
  onFulfillDate(date){
    return new Date(date).getTime();
  },
  // 有效签到时间
  onGoOver(){
    let yesterday = new Date().getTime()-86400000;
    let zero = new Date(util.formatTime(new Date(yesterday))).getTime();
    return zero;
  },
  // 今天是否已签到
  onIsSignIn(arr,tasksInfo){
    let is = false;
    let data = this.data.data;
    let today = util.formatTime(new Date());
    for(let i = 0;i < arr.length;i++){
      if(arr[i].isNeck){
        if(today == arr[i].date){
          is = true;
          data.award = arr[i].award;
        }
      }
    }
    if(is){
      data.isSign = true;
      data.taskFrist = true;
    }else{
      data.isSign = false;
      if(tasksInfo[0].status == 2){

      }
      if(tasksInfo[0].status == 3){
        tasksInfo[0].status = 1;
        tasksInfo[0].finish = 0;
      }
    }
    this.setData(data);
    return tasksInfo;
  },
  // 任务1 签到任务
  onSignInTask(){
    let signDataAll = this.data.signDataAll;
    let taskOne = signDataAll.tasksInfo[0];
    taskOne.date = util.formatTime(new Date());
    signDataAll.tasksInfo[0].finish = Number(taskOne.finish) + 1;
    if(taskOne.finish == Number(taskOne.target)){
      signDataAll.tasksInfo[0].status = 2;
    }
    this.setData({tasksInfo:signDataAll.tasksInfo})
    util.check("signDataAll",signDataAll);
  },
  // 任务1 领取任务奖励
  onDrawAward(){
    let data = this.data.data;
    let signDataAll = this.data.signDataAll;
    let taskOne = signDataAll.tasksInfo[0];
    if(taskOne.finish == Number(taskOne.target)){
      if(data.taskFrist){
        signDataAll.tasksInfo[0].status = 1;
        signDataAll.tasksInfo[0].finish = 0;
      }else{
        signDataAll.tasksInfo[0].status = 3;
      }
    }
    util.check("signDataAll",signDataAll);
    this.setData({tasksInfo:signDataAll.tasksInfo})
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