var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    requestResult: '',
    isTrue:true
  },
  tapItem: function (event){
    var songId = event.currentTarget.dataset.songid
    console.log(songId)
    wx.navigateTo({
      url: `../song/song?songId=${songId}`
    })
  },
  getQuery: function () {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/getListPlay`,
      login: false,
      data: {
        type: 2, 
        size: 50, 
        offset: 0, 
        method: 'baidu.ting.billboard.billList'
      },
      success(result) {
        wx.hideToast();
        console.log(result)
        that.setData({
          requestResult: result.data.song_list
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuery()
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