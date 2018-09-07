var page = {
    url:'',//静态图地址
    staticImg: [ ],//存储静态图
    loadImg:function(imgArr, callback, timeout){
        var waitTime  = timeout || 5000;
        // 加载图片数量
        var len = imgArr.length;
        if(len <= 0 ){// 无任何图片，直接返回加载完成
            return callback(1);
        }
        // 已完成加载计数
        var loaded = 0;
        var imgList = [];
        // 上报打点
        
        var loadFun = function(res) {
            //console.log(this,res);
            if (loaded < len) {
                ++loaded;
                callback(loaded/len);
            }
        };
        for(var i = 0; i<len; i++){
            imgList[i] = new Image();
            // 发送请求
            imgList[i].src = imgArr[i];
            imgList[i].onload = function() {
                loadFun.call(this, {type: 'load'});
            };
            imgList[i].onerror = function() {
                loadFun.call(this, {type: 'error'});
            };
        }
        //超时处理
        setTimeout(function() {
            if(loaded < len){
                callback(1);
                // 强制加载完成
                loaded = len;

            }
        }, waitTime*len);        
    },
    init:function(){
        var imgArr = this.imgArr();
        this.loadImg(imgArr,function(o){
            var loadingNumber = (o*100).toFixed(0);
            page.loadingfn(loadingNumber)
        });   
    },
    imgArr:function(){
        var staticImg = this.staticImg;
        var len = staticImg.length;
        var imgurlArr = [];
        var url = this.url;
        $.each(staticImg,function(index,item){
            imgurlArr.push(url + item);
        })
        return imgurlArr;       
    },
    config:function(pageInit){
        var staticImg = pageInit.staticImg;
        var loadingfn = pageInit.loadingfn;
        var url = pageInit.url;

        if (!Array.isArray(staticImg)) throw new TypeError('Expected Array, got ' + (typeof staticImg));
        if (!Object.prototype.toString.call(loadingfn)) throw new TypeError('Expected Function, got ' + (typeof staticImg));
        
        this.url = url;
        this.staticImg = staticImg;
        this.loadingfn = loadingfn;
        this.init();
    }
};
