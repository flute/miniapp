//toutiao.js
var util = require('../../utils/util.js')
Page({
	data: {
		loading: true,
		loadingMore: false,
		toutiao: [],
		data: {
			channel: '头条',
			num: 20,
			start: 0,
			appkey: '511132406107524a3dc6bc7601f002cb'
		},
		showDetail: false,
		detail: null
	},
	onLoad: function () {
		this.fetchData()
	},
	fetchData: function(){
		var that = this;
		var data = this.data.toutiao;
		wx.request({
			url: 'https://way.jd.com/jisuapi/get',
			data: that.data.data,
			success: function(res) {
				var result = res.data.result.result.list
				result = result.map(function(item){
					var date = new Date(item.time).getTime()
					item.time = util.getDateDiff(date);
					return item;
				})
				
				data = data.concat(result)
				that.setData({
					loading: false,
					loadingMore: false,
					toutiao: data
				})
			}
		})
	},
	showVideoDetail: function(e){
		var index = e.currentTarget.dataset.index;
		var detail = this.data.toutiao[index];
		this.setData({
			showDetail: true,
			detail: detail
		})
	},
	trunBack: function(e){
		this.setData({
			showDetail: false,
			detail: null
		})
	},
	scrollBottom: function(){
		var data = this.data.data;
		data.start = data.num+data.start;
		this.setData({
			loadingMore: true,
			data: data
		})
		this.fetchData()
	}
})
