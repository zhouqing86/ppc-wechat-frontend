//index.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util');
const date = new Date();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    date: utils.formatYYMMDD(date),
    time: utils.formatHHMM(date)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    const formData = e.detail.value;
    let url = '../srp/srp?from_address=' + formData['from_address'];
    url += '&to_address=' + formData['to_address'];
    url += '&from_date=' + formData['from_date'];
    url += '&from_time=' + formData['from_time'];

    wx.navigateTo({
      url: url
    });
  },
  formReset: function (e) {
    const date = new Date();
    this.setData({
      date: utils.formatYYMMDD(date),
      time: utils.formatHHMM(date)
    })
  }
})
