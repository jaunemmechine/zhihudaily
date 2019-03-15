// pages/douban.js
let cityList = require('../../util/area.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    ishot:true,
    iswill:false,

    areaList: cityList,
    cityName:"北京市",
    value:"",
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0,
    count:10,
    query:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getmovie(1);
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


  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
  
    if(this.data.ishot){
      this.getmovie(1)
    }else{
      this.getmovie(2)
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    let city = this.data.cityName;
    let count = this.data.count+10;
    let query=this.data.query;
    let hotUrl ='https://douban.uieee.com/v2/movie/in_theaters?city=' + city + "&start=0&count=" + count;
    let willUrl = 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=' + count;
    let url = this.data.ishot ? hotUrl : willUrl
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    if(query==""){
      wx.request({
        url: url, // 仅为示例，并非真实的接口地址
        header: {
          'content-type': 'json' // 默认值
        },
        success(res) {
          console.log(res.data.subjects)
          _this.setData({ showLoading: false, films: res.data.subjects, count: count })
          wx.hideLoading();
        }
      })
    }else{
      this.headlesearch(query,count)
    }
  
   

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  filmType:function(event){
    this.setData({count:10,query:'',value:''})
    if(event.currentTarget.dataset.chooseType==1){
      this.setData({ishot:true,iswill:false})
      this.getmovie(1)
    }else{
      this.setData({ ishot: false, iswill:true  })
      this.getmovie(2)
    }

    
  },
  getmovie:function(type){
    let _this = this;
    let city = this.data.cityName;
    let count = this.data.count;
    let hotUrl = 'https://douban.uieee.com/v2/movie/in_theaters?city=' + city + "&start=0&count=" + count;
    let willUrl = 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count='+count;
    let url = type == 1 ? hotUrl : willUrl
    wx.request({
      url: url, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        _this.setData({ showLoading: false, films: res.data.subjects })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  getCity:function(){
    this.setData({ show: true })
  },
  onClose:function() {
    this.setData({ show: false });
  },
  onConfirm:function(obj){
    let _this = this;
    let city = obj.detail.detail.city.replace("市","");
    let count = 10;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=' + city + "&start=0&count=" + count, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        _this.setData({ showLoading: false, films: res.data.subjects, show: false, cityName: city, count: count })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  onSearch: function (e){
    let _this = this;
    let query = e.detail;
    let count = 20;
    this.headlesearch(query, count)
  },
  headlesearch:function(query,count){
    let _this=this;
    wx.request({
      url: "https://douban.uieee.com/v2/movie/search?q="+query+"&start=0&count="+count,// 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        _this.setData({ showLoading: false, films: res.data.subjects, show: false, count: count, query: query })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        wx.hideLoading();
      }
    })
  },
  onClear:function(e){

  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../doubanDetail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  }
  
  
})