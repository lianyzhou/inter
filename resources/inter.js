(function($) {
	
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
		
		that.getTrans = function(ns) {
			
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
			function restful(restParams) {
				if(!$.isPlainObject(restParams)) {
					restParams = {};
				}
				var originUrl = ajaxOpts.url;
				var formatUrl = originUrl.replace(/:([\w_]+)/g , function(full,key) {
					return restParams[key] || full;
				});
				if(formatUrl !== originUrl) {
					restUrl = formatUrl;
				}
				return chain;
			}
			
			var chain = {
				request : request,
				restful : restful
			};
	
			return chain;
			
		};
		
		return that;
	};
	
	
	
	
})(jQuery);
