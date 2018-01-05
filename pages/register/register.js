// pages/register/register.js
var appInstance = getApp();
var requestApi = require('../../utils/requestApi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      today: e.detail.value
    })
  },
  MyfromSubmit: function (evt) {
    var postData = evt.detail.value;
    var formId = evt.detail.formId;
    postData.formId = formId
    if (postData.patients == "" || postData.tel == "" || postData.birthday==""){
      
      wx.showToast({
        title: '必填项不能为空',
        image: '/icon/icon_tips.svg',
        duration: 2000
      })
      return false
    }
    this.setData({
      loading: true
    })
    requestApi.addUserMember(this,postData, appInstance)
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