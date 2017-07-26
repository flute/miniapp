//index.js
Page({
	data: {
		video: null
	},
	onLoad: function (option) {
		var contId = option.id;
		console.log(contId);
    	this.fetchData(contId);
        
	},
	fetchData: function(contId){
		var that = this;
		wx.request({
			url: 'https://app.pearvideo.com/clt/jsp/v2/content.jsp?contId='+contId,
			header: {
				'X-Channel-Code': 'official',
				'X-Client-Agent': 'Xiaomi',
				'X-Client-Hash': '2f3d6ffkda95dlz2fhju8d3s6dfges3t',
				'X-Client-ID': '123456789123456',
				'X-Client-Version': '2.3.2',
				'X-Long-Token': '',
				'X-Platform-Type': '0',
				'X-Platform-Version': '5.0',
				'X-Serial-Num': '1492140134',
				'X-User-ID': ''
			},
			success: function(res) {
				console.log(res)
				that.setData({
					video: res.data
				})
			}
		})
	},
	showVideoDetail: function(e){
		var contId = e.currentTarget.dataset.contid;
		wx.navigateTo({
			url: '/pages/video_detail/video_detail?id='+contId
		})
	}
})
