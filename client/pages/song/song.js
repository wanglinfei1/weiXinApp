var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songinfo: '',
    bitrate: '',
    songLry: '',
    istrue: true,
    currentTime: 0.0,
    file_duration: 0.0,
    playStateType:true,
    playState: 0,
    playStateIcon: "../../images/loop-class.png"
  },
  getSongInfor: function (songid) {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/getListPlay`,
      login: false,
      data: {
        songid: songid,
        method: 'baidu.ting.song.play'
      },
      success(result) {
        wx.hideToast();
        result = result.data
        that.getSongLry(songid)
        wx.setNavigationBarTitle({
          title: `${result.songinfo.title} - ${result.songinfo.author}`
        })
        setTimeout(() => {
          that.creatAudio(result.bitrate.file_link)
        }, 300)
        that.setData({
          songinfo: result.songinfo,
          bitrate: result.bitrate,
          file_duration: Math.floor(result.bitrate.file_duration)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  getSongLry: function (songid) {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/getListPlay`,
      login: false,
      data: {
        songid: songid,
        method: 'baidu.ting.song.lry'
      },
      success(result) {
        that.setData({
          songLry: result.data.lrcContent
        })
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  },
  audioPlaying: function (event) {
    this.setData({
      currentTime: parseInt(event.detail.currentTime)
    })
  },
  playStateChange: function () {
    var playState = this.data.playState;
    playState++;
    this.setData({
      playState: playState % 3
    })
    console.log(this.data.playState)
    if (this.data.playState == 0) {
      this.setData({
        playStateIcon: "../../images/loop-class.png"
      })
    } else if (this.data.playState == 1) {
      this.setData({
        playStateIcon: "../../images/loop.png"
      })
    } else if (this.data.playState == 2) {
      this.setData({
        playStateIcon: "../../images/random.png"
      })
    }
    console.log(this.data.playStateIcon)
  },
  audioPlay: function () {
    var playType = this.data.playStateType;
    if (playType){
      this.innerAudioContext.play()
    }else{
      this.innerAudioContext.pause()
    }
    this.setData({
      playStateType: !playType
    })
  },
  sliderChange: function (event) {
    this.setData({
      currentTime: event.detail.value
    })
  },
  creatAudio: function (url) {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = url;
    this.innerAudioContext.onCanplay(() => {
      this.innerAudioContext.play()
      this.setData({
        playStateType:false
      })
    })
    this.innerAudioContext.onTimeUpdate(() => {
      // console.log(innerAudioContext.currentTime + '---' + innerAudioContext.duration)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSongInfor(options.songId)
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