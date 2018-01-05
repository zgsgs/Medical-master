// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: '',
    scanCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onCopy:function(res){
    var invitationcode = res.currentTarget.dataset.invitationcode;
    wx.setClipboardData({
      data: invitationcode,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      userinfo: wx.getStorageSync('userinfo'),
      authSetting: wx.getStorageSync('userinfo') == "" ? false : true
    })
  },
  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/index',
      success: function (res) {
        console.log(res)
        // 转发成功
      }
    }
  }
})