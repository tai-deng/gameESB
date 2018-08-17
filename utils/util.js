
import tap from "../utils/tap.js";

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const check = (key,value)=>{
  if(value){
    wx.setStorageSync(key,value);
  }else{
    return wx.getStorageSync(key);
  }
}
const delStorage = (key)=>{
  wx.removeStorageSync(key);
}
// 预览图片
const preview = (image,id)=>{
  wx.previewImage({
    current: image,
    urls: [image],
    complete: function(res) {
      tap.request(id,(res)=>{
        console.log('点击2',res)
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  preview,
  check,delStorage
}
