//申请入会
function addUserMember(that,postData, appInstance){
  postData.openid = wx.getStorageSync('openid');
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: 'https://xcx.yzw0525.com/api/addUserMember',
    data: postData,
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      console.log(res.data)
      var resData = res.data;
      if (resData.errCode == 200) {
        appInstance.globalData.userInfo = resData.userinfo
        wx.setStorageSync('userinfo', resData.userinfo)
        wx.showToast({
          title: "提交成功...",
          icon: 'waiting',
          duration: 2000
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/user/user'
          })
        }, 2000)
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
        that.setData({
          loading: false
        })
      }

    }
  })
}
//获取我的预约列表
function getAppointmentList(that, appInstance){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: 'https://xcx.yzw0525.com/api/getAppointmentList',
    data: {
      openid: appInstance.globalData.openid,
      offset: that.data.offset,
      limit: appInstance.globalData.limit
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      wx.hideLoading()
      console.log(res.data)
      var resData = res.data;
      if (resData.errCode == 200) {
        if (resData.item.length > 0) {
          var newappointmentlist = resData.item;
          var appointmentlist = that.data.appointmentlist;
          if (appointmentlist.length > 0) {
            that.data.appointmentlist = newappointmentlist.concat(that.data.appointmentlist)
          } else {
            that.data.appointmentlist = newappointmentlist
          }
          that.setData({
            appointmentlist: that.data.appointmentlist,
            offset: that.data.offset + newappointmentlist.length
          })
        } else {
          that.setData({
            is_more: false,
            is_loadnull: true
          })
          wx.showToast({
            title: "暂无数据",
            image: '/icon/icon_tips.svg',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
       
      }

    }
  })
}
//取消预约
function CancelAppointment(that, dataset, appInstance) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: 'https://xcx.yzw0525.com/api/CancelRegister',
    data: {
      openid: appInstance.globalData.openid,
      registerid: dataset.registerid,
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      console.info(res)
      var resData = res.data;
      if (resData.errCode == 200) {
        that.data.appointmentlist[dataset.index].is_to_hospital=2
        that.setData({
          appointmentlist: that.data.appointmentlist
        })
        wx.showToast({
          title: "已取消",
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
      }

    }
  })
}

module.exports.addUserMember = addUserMember
exports.getAppointmentList = getAppointmentList
exports.CancelAppointment = CancelAppointment