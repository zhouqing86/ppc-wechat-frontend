//index.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util');
const date = new Date();
const WEEKDAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    plans: []
  },
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    console.log(options);
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    wx.request({
      url: 'http://api.apitpl.dev/plans',
      header: {'Content-Type': 'application/json'},
      method: 'get',
      success: function(result) {
        if(result.data) {
            result.data.forEach(data => {
              data.days = data.days.split(',').map(d => WEEKDAYS[d-1]).join(', ');
              return data;
            });
        }
        that.setData({
          plans: result.data
        });
      }
    });
  }
})
