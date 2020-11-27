//index.js
import {
  getMultiData,
  getGoodsData
} from '../../service/index'


const types = ['pop', 'new', 'sell']
const TOP_DISANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      },

    },
    currentType: 'pop',
    isShow: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图以及推荐数据的 函数
    this._getMultiData(),
      // 请求商品数据的 函数
      this._getGoodsData('pop'),
      this._getGoodsData('new'),
      this._getGoodsData('sell')
  },
  //网络请求函数-*-----------------
  //1.请求轮播图以及推荐数据
  _getMultiData() {
    getMultiData().then(res => {
      // console.log(res);
      // 取出轮播图和推荐数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 将banner和recommes放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  // 请求商品数据
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;
    getGoodsData(type, page).then(res => {
      // console.log(res);
      // 取出数据
      const list = res.data.data.list;
      // 将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;

      oldList.push(...list);
      // 将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
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
    // 上拉加载更多
    // console.log('页面滚到底部');
    this._getGoodsData(this.data.currentType);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 监听用户上拉
  onPageScroll(options) {
    // 1.取出scrollTop 
    const scrollTop = options.scrollTop
    // 修改showBacktop属性
    const flag1 = scrollTop >= TOP_DISANCE
    if (flag != this.data.isShow) {
      this.setData({
        isShow: flag1
      })
    }
    // 3.修改isTabFixed属性
    const flage2 = scrollTop >= this.data.tabScrollTop;
    if (flage2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flage2
      })
    }
  },

  // 用户的方法
  handleTabClick(e) {
    // console.log(e);
    // 取出index
    const index = e.detail.index;
    // console.log(index);
    // 设置currentType
    this.setData({
      currentType: types[index]
    })
  },
  // 判断图片加载完成 tab-control的高度
  handleImageLoad() {
    console.log('图片加载完成');
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(res => {
      this.data.tabScrollTop = res.top
    }).exec()
  }
})