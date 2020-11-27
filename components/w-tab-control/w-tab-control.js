// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(event) {
      // 获取
      // console.log(event.currentTarget.dataset.index);
      const index = event.currentTarget.dataset.index;
      // 修改currentIndex
      this.setData({
        currentIndex: index
      })
      // 通知页面内部的点击事件
      const data = {
        index: this.data.currentIndex
      }
      this.triggerEvent('tabclick', data, {})
    }
  }
})