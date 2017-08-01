//index.js
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
				console.log(res.data.result.result.list)
				data = data.concat(res.data.result.result.list)
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
