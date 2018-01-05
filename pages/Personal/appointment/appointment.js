// pages/Personal/appointment/appointment.js
var appInstance = getApp();
var requestApi = require('../../../utils/requestApi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentlist:[],
    offset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestApi.getAppointmentList(this, appInstance)
  },
  onCancelAppointment: function (res){
    console.log(res)
    requestApi.CancelAppointment(this, res.currentTarget.dataset, appInstance)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})