//index.js

Page({
	data: {
		neihan: [],
		imgUrl: 'http://p3.pstatp.com/',
		fullScreen: false,
		type: 'duanzi',
		typeId : {
			duanzi: '-102',
			tupian: '-103'
		},
		showUrl: '',
		data: {
			mpic:'1',
			webp:'1',
			essence:'1',
			content_type:'-102',
			message_cursor:'-1',
			am_longitude:'110',
			am_latitude:'120',
			am_city:'北京市',
			am_loc_time:'1463225362314',
			count: '20',
			min_time:'1465232121',
			screen_width:'1450',
			do00le_col_mode:'0',
			iid:'3216590132',
			device_id:'32613520945',
			ac:'wifi',
			channel:'360',
			aid:'7',
			app_name:'joke_essay',
			version_code:'612',
			version_name:'6.1.2',
			device_platform:'android',
			ssmix:'a',
			device_type:'sansung',
			device_brand:'xiaomi',
			os_api:'28',
			os_version:'6.10.1',
			uuid:'326135942187625',
			openudid:'3dg6s95rhg2a3dg5',
			manifest_version_code:'612',
			resolution:'1450*2800',
			dpi:'620',
			update_version_code:'6120'
		},
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
		}
	},
	onLoad: function () {
		this.fetchData()
	},
	fetchData: function(){
		var that = this;
		wx.request({
			url: 'https://is.snssdk.com/neihan/stream/mix/v2/',
			data: that.data.data,
			header: that.data.header,
			success: function(res) {
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
			neihan: this.data.neihan.concat(neihanArr)
		})
	},
	showLargeImage: function(e){
		var imgUrl = e.currentTarget.dataset.imgurl;
		this.setData({
			fullScreen: true,
			showUrl: imgUrl
		})
	},
	hideFullScreen: function(){
		this.setData({
			fullScreen: false,
			showUrl: ''
		})
	},
	changeType: function(e){
		var type = e.currentTarget.dataset.type;
		if( type == this.data.type ){
			return;
		}

		var data = this.data.data;
		data.content_type = this.data.typeId[type]
		console.log(data.content_type)
		this.setData({
			neihan: [],
			type: type,
			data: data
		})
		this.fetchData()
	},
	scrollBottom: function(){
		console.log('scrollBottom fetch data');
		var that = this;
		wx.request({
			url: 'https://is.snssdk.com/neihan/stream/mix/v1/',
			data: that.data.data,
			header: that.data.header,
			success: function(res) {
				console.log(res)
				if( res.data.message === 'success' ){
					that.getNeihanArr(res.data.data.data)
				}
			}
		})
		
	}
})
