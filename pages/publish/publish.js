//index.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util');
const date = new Date();
const DAYS = [
  { value: '1', name: '星期一', checked: true },
  { value: '2', name: '星期二', checked: true },
  { value: '3', name: '星期三', checked: true },
  { value: '4', name: '星期四', checked: true },
  { value: '5', name: '星期五', checked: true },
  { value: '6', name: '星期六', checked: false },
  { value: '7', name: '星期天', checked: false }
];

const PRICES = [
  { value: 0, name: '价格面议', checked: true},
  { value: 1, name: '按月'},
  { value: 2, name: '按周'},
  { value: 3, name: '按天'},
  { value: 4, name: '按次'},
]

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    fromdate: utils.formatYYMMDD(date),
    todate: utils.formatYYMMDD(date),
    time: '08:00',
    days: DAYS,
    prices: PRICES
  },
  checkboxChange: function(e) {
    var items = this.data.days, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(items[i].value == values[j]){
          items[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      days: items
    });
  },
  radioChange: function(e) {
    var items = this.data.prices;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      prices: items
    });
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
  bindFromDateChange: function(e) {
    this.setData({
      fromdate: e.detail.value
    })
  },
  bindToDateChange: function(e) {
    this.setData({
      todate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function (e) {
    const date = new Date();
    this.setData({
      fromdate: utils.formatYYMMDD(date),
      todate: utils.formatYYMMDD(date),
      days: DAYS,
      prices: PRICES
    })
  }
})
