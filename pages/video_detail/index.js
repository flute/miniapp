//index.js
Page({
	data: {
		contId: ""
	},
	onLoad: function (option) {
		console.log(option.id)
        this.setData({
            contId: option.id
        })
	}
})
