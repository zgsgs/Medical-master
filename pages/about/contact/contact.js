// pages/about/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 0,
      latitude: 31.569670,
      longitude: 120.288650,
      width: 30,
      height: 30,
      callout: {
        content: "无锡医博中医肛肠医院\r\n江苏省无锡市梁溪区五爱路85号",
        color: "#333",
        fontSize: 16,
        borderRadius: 5,
        bgColor: "#fff",
        padding: 5,
        display: 'ALWAYS'
      }
    }],
  },
  markertap(e) {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.openLocation({
          latitude: 31.569670,
          longitude: 120.288650,
          name: "无锡医博中医肛肠医院",
          scale: 28
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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