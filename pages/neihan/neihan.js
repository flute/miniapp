//index.js

Page({
	data: {
		neihan: [],
		imgUrl: 'http://p3.pstatp.com/'
	},
	onLoad: function () {
		var that = this;
		wx.request({
			url: 'http://iu.snssdk.com/neihan/stream/mix/v1/?mpic=1&webp=1&essence=1&content_type=-101&message_cursor=-1&am_longitude=110&am_latitude=120&am_city=%E5%8C%97%E4%BA%AC%E5%B8%82&am_loc_time=1463225362314&count=30&min_time=1465232121&screen_width=1450&do00le_col_mode=0&iid=3216590132&device_id=32613520945&ac=wifi&channel=360&aid=7&app_name=joke_essay&version_code=612&version_name=6.1.2&device_platform=android&ssmix=a&device_type=sansung&device_brand=xiaomi&os_api=28&os_version=6.10.1&uuid=326135942187625&openudid=3dg6s95rhg2a3dg5&manifest_version_code=612&resolution=1450*2800&dpi=620&update_version_code=6120',
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
				/*that.setData({
					neihan: res.data.data.data
				})*/
				//console.log(that.data.neihan)
				that.getNeihanArr(res.data.data.data)
			}
		})
	},
	getNeihanArr: function(datas){
		var neihanArr = [];
		for( var i=0;i<datas.length;i++ ){
			if( datas[i].ad ){
				// ad, do nothing
			}else{
				var date = new Date(datas[i].group.create_time*1000)
				var createAt = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
				datas[i].createAt = createAt
				neihanArr.push(datas[i])
			}
		}
		console.log(neihanArr)
		this.setData({
			neihan: neihanArr
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
