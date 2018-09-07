# item-plug-in
项目中使用小插件

# h5加载图片

	调用方式：
		page.config({
			url: '',  //图片绝对路径 
			staticImg: [],  //图片名称
			loadingfn:function(loadingNumber) { //加载处理函数
		        console.log(loadingNumber)
		    }
		})
