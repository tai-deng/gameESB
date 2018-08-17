//index.js
const app = getApp();
import choiceness from "../../utils/choiceness.js";
import discover from "../../utils/discover.js";
import classify from "../../utils/classify.js";
import circle from "../../utils/circle.js";
import util from "../../utils/util.js";
import tap from "../../utils/tap.js";
//获取应用实例
Page({
  data: {
    // 默认选择第一个
    select:1,
    // 默认分类列表
    tabIndex:0,
  },
  onLoad: function () {
    this.getHandpicData();
    wx.showShareMenu({
      withShareTicket: true
    })
    // let data = choiceness.test;
    // console.log(data.signIn)
    // console.log(JSON.stringify(data))
  },
  // TAB 选项
  bindtap(e){
    let select = e.currentTarget.dataset.select;
    if(select == 1){
      this.getHandpicData();
    }else if(select == 2){
      this.getDiscoverData();
    }else if(select == 3){
      this.getClassifyData();
    }else if(select == 4){
      this.getCirclData();
    }
    this.setData({select})
  },
  // 获取精选数据
  getHandpicData(){
    choiceness.request((data)=>{
      let handpicData = data;
      this.setData({handpicData})
    });
  },
  // 获取发现数据
  getDiscoverData(){
    discover.request((data)=>{
      let mvpData = data.gameMvp;
      let heatData = data.heatData;
      let partMvpData = data.gameMvp;
      this.setData({
                  partMvpData,
                  heatData,
                  mvpData:JSON.stringify(mvpData),
                })
    })
  },
  // 获取分类数据 action
  getClassifyData(){
    classify.request((data)=>{
      let classifyData = data;
      let scrollWidth = data.length * 140 + 37*data.length;
      let classifyDataItem = data[0].gameList;
      this.setData({classifyData,scrollWidth,classifyDataItem})
    })
  },
  // 获取圈子数据
  getCirclData(){
    let circleDataAll = util.check("circleDataAll");
    let circleData = '';
    let circleUser = [];
    
    if(circleDataAll){
      circleData = circleDataAll.circleData;
      circleUser = circleDataAll.circleUser;
      this.setData({
        circleData,
        circleUser,
      })
    }else{
      circle.request((data)=>{
        circleData = this.manageData(data);
        for(let i = 0;i < circleData.length;i++){
          let publish = circleData[i].publish;
          for(let j = 0;j < publish.length;j++){
            publish[j]["userIcon"] = circleData[i]["userIcon"];
            publish[j]["isAttention"] = circleData[i]["isAttention"];
            circleUser.push(publish[j]);
          }
        }
        this.setData({
          circleData,
          circleUser,
        })
      });
    }
  },
  // 分类TAB
  bindClassifyTab(e){
    let index = e.currentTarget.dataset.index;
    let classifyDataItem = this.data.classifyData[index].gameList;
    this.setData({classifyDataItem,tabIndex:index})
  },
  // 预览图片跳转游戏
  bindQrCode(e){
    let image = e.currentTarget.dataset.qrcode;
    let id = e.currentTarget.dataset.gameid;
    console.log(id)
    util.preview(image,id);
  },
  // 发现关注
  bindFindAttention(e){
    let id = e.currentTarget.dataset.id;
    let circleData = this.data.circleData;
    let circleUser = this.data.circleUser;
    let title = '';
    for(let i = 0;i < circleData.length;i++){
      if(id == circleData[i].id){
        if(circleData[i].isAttention){
          circleData[i].isAttention = false;
          title = "取关成功!"
        }else{
          circleData[i].isAttention = true;
          title = "关注成功!"
        }
      }
    }
    wx.showToast({title,mask:true,duration:1000})
    this.setData({circleData})
    util.check("circleDataAll",{circleData,circleUser});
  },
  // 用户关注
  bindUserAttention(e){
    let id = e.currentTarget.dataset.id;
    let circleData = this.data.circleData;
    let circleUser = this.data.circleUser;
    let title = '';
    for(let i = 0;i < circleUser.length;i++){
      if(id == circleUser[i].id){
        if(circleUser[i].isAttention){
          circleUser[i].isAttention = false;
          title = "取关成功!"
        }else{
          circleUser[i].isAttention = true;
          title = "关注成功!"
        }
      }
    }
    wx.showToast({title,mask:true,duration:1000})
    this.setData({circleUser})
    util.check("circleDataAll",{circleData,circleUser});
  },
  // 点赞
  bindPraise(e){
    let id = e.currentTarget.dataset.id;
    let circleData = this.data.circleData;
    let circleUser = this.data.circleUser;
    let title = '';
    for(let i = 0;i < circleUser.length;i++){
      console.log(circleUser,"----id-----",circleUser[i].id)
      if(id == circleUser[i].id){
        if(circleUser[i].isPraise){
          circleUser[i].isPraise = false;
          circleUser[i].praiseNum -=1;
          title = "取消点赞!"
        }else{
          circleUser[i].isPraise = true;
          title = "点赞成功!"
          circleUser[i].praiseNum +=1;
        }
      }
    }
    wx.showToast({title,mask:true,duration:1000})
    util.check("circleDataAll",{circleData,circleUser});
    this.setData({circleUser})
  },
  // 评论
  bindReview(e){
    console.log(e)
  },
  // 分享
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '游戏小鹿',
      path: 'pages/index/index'
    }
  },
  // 数据管理
  manageData(data){
    let url = app.globalData.urlBast;
    for(let i = 0;i < data.length;i++){
      if(data[i].gameImg){
        data[i].gameImg = url +"imgs/"+ data[i].gameId + data[i].gameImg;
      }
      if(data[i].qrCode){
        data[i].qrCode = url +"imgs/"+ data[i].gameId + data[i].qrCode;
      }
      if(data[i].icon){
        data[i].icon = url +"imgs/"+ data[i].gameId + data[i].icon;
      }
      if(data[i].gameIcon){
        data[i].gameIcon = url +"imgs/"+ data[i].gameId + data[i].gameIcon;
      }
      if(data[i].userIcon){
        data[i].userIcon = url +"imgs/"+ data[i].photoId + data[i].userIcon;
        for(let j = 0;j < data[i].publish.length;j++){
          data[i].publish[j].url = url +"imgs/"+ data[i].photoId + data[i].publish[j].url;
        }
      }
    }
    return data;
  },
  // 跳转点击收集
  bindGather(e){
    let id = e.currentTarget.dataset.gameid;
    tap.request(id,(res)=>{
      console.log('点击1',res)
    })
  }
})