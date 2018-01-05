//index.js
//获取应用实例
var appInstance = getApp();
var GetCommentList = require('../../utils/getuserinfo.js');
Page({
  data: {
    commentlist:null,
    offset:0,
    is_more:true,
    is_loadnull: false,
    imgpath: appInstance.globalData.urlpath
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {

    var that=this;
      GetCommentList.getcomment(that, appInstance)
  },
  onLoadMoreDoctList: function () {
    var that = this;
    GetCommentList.getcomment(that, appInstance)
  },
  onAddZanNum:function(res){
    var zannum = res.currentTarget.dataset.zannum;
    var index = res.currentTarget.dataset.index;
    var id = res.currentTarget.dataset.id;
    if (wx.getStorageSync('zannum' + id) != ""){
      wx.showToast({
        title: "不可重复点赞哦！",
        icon: 'waiting',
        duration: 2000
      })
    }else{
      var newcommentlist = this.data.commentlist;
      newcommentlist[index]["zan"] = parseInt(zannum) + 1
      this.setData({
        commentlist: newcommentlist
      })
      wx.setStorageSync('zannum' + id, (parseInt(zannum) + 1))
    }
  },
  onShareAppMessage: function (res) {//转发默认设置
   
  },
  //测试合并冲突
  WWonMakePhone: function () {
    wx.makePhoneCall({
      phoneNumber: appInstance.globalData.yebotel
    })
  }
})
