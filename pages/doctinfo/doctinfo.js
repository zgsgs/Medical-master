// doctinfo.js
var appInstance = getApp();
var GetCommentList = require('../../utils/getuserinfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctid  :0,
    doctinfo:{},
    commentlist: null,
    offset: 0,
    is_more: true,
    is_loadnull: false,
    imgpath: appInstance.globalData.urlpath,
    satisfied: appInstance.globalData.satisfied
  },
  onMakePhone: function () {
    wx.makePhoneCall({
      phoneNumber: appInstance.globalData.yebotel
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var doctid = options.doctid
    that.setData({
      doctid: doctid
    })
    wx.request({
      url: 'https://xcx.yzw0525.com/api/getdoctinfo', 
      data: {
        doctid: doctid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Verification': appInstance.globalData.VERIFICATION,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var resData = res.data;
        if (resData.errCode == 200) {
          if (resData.item.length > 0) {
            that.setData({
              doctinfo: resData.item,
            })
          } else {
            wx.showToast({
              title: "未查询到该信息",
              icon: 'waiting',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: resData.errmsg,
            icon: 'waiting',
            duration: 2000
          })
        }

      }
    })
    GetCommentList.getcomment(that, appInstance)
  },
  onLoadMoreDoctList: function () {
    var that = this;
    GetCommentList.getcomment(that, appInstance)
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