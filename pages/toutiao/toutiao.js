//index.js

Page({
	data: {
		toutiao: [],
		data: {
			category: 'news_hot',
			refer: '1',
			count: 20,
			min_behot_time:'1491981025',
			last_refresh_sub_entrance_interval: Math.round(new Date().getTime()/1000),
			loc_mode:'',
			loc_time: Math.round(new Date().getTime()/1000),
			latitude:'',
			longitude:'',
			city:'',
			tt_from:'pull',
			lac:'',
			cid:'',
			cp:'',
			iid:'0123456789',
			device_id:'12345678952',
			ac:'wifi',
			channel:'',
			aid:'',
			app_name:'',
			version_code:'',
			version_name:'',
			device_platform:'',
			ab_version:'',
			ab_client:'',
			ab_group:'',
			ab_feature:'',
			abflag:'3',
			ssmix:'a',
			device_type:'',
			device_brand:'',
			language:'zh',
			os_api:'',
			os_version:'',
			openudid:'1b8d5bf69dc4a561',
			manifest_version_code:'',
			resolution:'',
			dpi:'',
			update_version_code:'',
			_rticket:'',
		}
	},
	onLoad: function () {
		var that = this;
		wx.request({
			url: 'https://is.snssdk.com/api/news/feed/v51/',
			data: that.data.data,
			success: function(res) {
				//console.log(res.data.data)
				//that.getVideoArr(res.data.dataList)
				var data = res.data.data.map(function(item){
					return JSON.parse(item.content)
				})
				console.log(data)
				that.setData({
					toutiao: data
				})
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
