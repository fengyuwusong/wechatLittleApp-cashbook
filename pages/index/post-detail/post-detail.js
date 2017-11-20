const data = require("../../../data/posts-data.js");

Page({
  data: {

  },
  onLoad: function (option) {
    this.setData({
      data: data.postList[option.id],
      id: option.id
    });
    const collected = wx.getStorageSync("collected");
    if (collected) {
      this.setData({
        collected: collected[option.id]
      });
    } else {
      const c = {};
      c[option.id] = false;
      wx.setStorageSync("collected", c);
    }

  },



  onCollectionTap: function (event) {
    const collected = wx.getStorageSync('collected');
    if (collected) {
      collected[this.data.id] = !collected[this.data.id];
      wx.setStorageSync("collected", collected)
      this.setData({
        collected: collected[this.data.id]
      });
      //消息提示框
      wx.showToast({
        title: collected[this.data.id] ? '收藏成功' : '取消成功',
        duration:1000,
        icon:"success" //默认success 支持加载loading
      })
    }
  },
  onShareTap: function (event) {
    //缓存上限不能超过10MB
    wx.removeStorageSync('key');
  }
})