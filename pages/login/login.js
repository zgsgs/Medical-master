// pages/login/login.js
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    console.log(appInstance.count(appInstance.globalData.userInfo))
    if (appInstance.count(appInstance.globalData.userInfo) > 0) {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  againLogin: function () {
    var that = this
    wx.openSetting({
      success: function (data) {
        if (data.authSetting["scope.userInfo"] == true) {
          wx.showLoading({
            title: '正在登陆',
          })
          appInstance.userLogin()
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
      }
    })
  }
})