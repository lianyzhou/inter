/*
 * $.inter用于进行根据配置返回ajax对象。
 * 
 * 使用示例：
 * 
 *  ---------------------
    
    var inter = $.inter();
 	inter.register('monitorResource' , {url : '/service/assetmonitor/resources/:monitorid'});
    
    ----------------------
    
	inter.getAjax('monitorResource').resolvePath({
      	monitorid : 100
	}).request({
		resourceIds:"1329"
	}).success(function(json) {
		alert(JSON.stringify(json));
	}).error(function(xhr, code , errText) {
		alert(errText);
	});
	
	实际使用时，--------中的两行应该在一个单独的文件里，将inter进行返回。
	
	//调用$.inter()返回一个对象，使用其register函数，进行ajax资源注册。
	//注册的时候，提供一个资源名称（唯一标识），和一个ajax配置（与$.ajax配置相同，不需要提供回调函数）
	
	//$.inter()返回的对象上使用getAjax方法，获取到trans，调用
	// request方法进行发送请求，参数为Json对象，可以为空，参数为ajax发送的数据
	
	// 调用resolvePath可以进行rest url中的参数设置，参数是一个json对象，会对url中的:userid 这样的标识进行映射。
	//   resolvePath函数是可选函数，对于rest中没有:userid这样参数的可以不调用
	
	
	//request之后的success和error可以处理回调。
 * 
*/
;(function($) {
$.inter = function() {
	var that = {} ,  
		map = {}  ,
		defaultCfg = {
			type : 'GET',
			dataType : 'json'
		};

	that.register = function(ns , conf) {
		if(!ns || !conf || !conf.url) {
			throw '$.inter->register must provide name and config.url';
		}
		map[ns] = conf;
	};

	that.getAjax = function(ns) {

		var ajaxOpts = $.extend({},defaultCfg , map[ns]);
			
		var restUrl ;
		
		function request(data) {
			data = data || {};
			var opts = $.extend({},ajaxOpts);
			opts.data = data;
			if(restUrl) {
				opts.url = restUrl; 
			}
			restUrl = null;
			return $.ajax(opts);
		}
		function resolvePath(restParams) {
			if(!$.isPlainObject(restParams)) {
				restParams = {};
			}
			var originUrl = ajaxOpts.url;
			var formatUrl = originUrl.replace(/\:([\w_]+)/g , function(full,key) {
				return restParams[key] || full;
			});
			if(formatUrl !== originUrl) {
				restUrl = formatUrl;
			}
			return chain;
		}
		
		var chain = {
			request : request,
			resolvePath : resolvePath
		};

		return chain;

	};

	return that;
};	
})(jQuery);

//(function() {
//	var inter = $.inter();
// 	inter.register('monitorResource' , {url : '/service/assetmonitor/resources/:monitorid'});
//  
//    
//	inter.getAjax('monitorResource').resolvePath({
//      monitorid : 100
//	}).request({
//		resourceIds:"1329"
//	}).success(function(json) {
//		alert(JSON.stringify(json));
//	}).error(function(xhr, code , errText) {
//		alert(errText);
//	});
//})();