//index.js

Page({
	data: {
		loading: true,
		videos: []
	},
	onLoad: function () {
		var that = this;
		wx.request({
			url: 'https://app.pearvideo.com/clt/jsp/v2/home.jsp?lastLikeIds=1063871%2C1063985%2C1064069%2C1064123%2C1064078%2C1064186%2C1062372%2C1064164%2C1064081%2C1064176%2C1064070%2C1064019',
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
				that.getVideoArr(res.data.dataList)
			}
		})
	},
	getVideoArr: function(datas){
		var videoArr = [];
		for(var i=0;i<datas.length;i++){
			if( datas[i].contList && datas[i].contList.length>0 ){
				videoArr = videoArr.concat(datas[i].contList)
			}
		}
		console.log(videoArr)
		this.setData({
			loading: false,
			videos: videoArr
		})
	},
	showVideoDetail: function(e){
		console.log(e.currentTarget.dataset)
		var contId = e.currentTarget.dataset.contid;
		wx.navigateTo({
			url: '/pages/video_detail/video_detail?id='+contId
		})
	}
})
