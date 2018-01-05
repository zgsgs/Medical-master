// pages/Personal/activity/activityinfos.js
var WxParse = require('../../../plug-ins/wxParse/wxParse.js');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloadmore: true,
    isMore: false,
    activityinfo:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options.id)
    if (options.id != undefined){
      this.setData({
        id: options.id
      })
    }
    getActivityInfo(this, appInstance)
  },
  onMakePhone: function (res) {
    console.log(res.target.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: res.target.dataset.tel
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
function getActivityInfo(that, appInstance){
  wx.request({
    url: 'https://xcx.yzw0525.com/api/GetActivityInfos',
    data: {
      id: that.data.id,
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      var resData = res.data;
      if (resData.errCode == 200) {
        if (resData.item.length > 0) {
          var newlist = resData.item;
          that.setData({
            isloadmore: false,
            isMore: false,
            activityinfo: newlist[0]
          })
          WxParse.wxParse('article', 'html', resData.item[0].article, that, 5);
        } else {
          that.setData({
            isloadmore: false,
            isMore: true,
          })
        }
      }
    },
    fail: function () {
      that.setData({
        isMore: true,
      })
    }
  })
}