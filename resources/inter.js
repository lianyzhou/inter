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
			
			function request(data) {
				data = data || {};
				ajaxOpts.data = data;
				return $.ajax(ajaxOpts);
			}
			
			return {
				request : request
			};
			
		};
		
		return that;
	};
	
	var inter = $.inter();
	
	inter.register('books' , {url : '/books' , timeout : 3000});
	
	var trans = inter.getTrans('books');
	trans.request({
		a : 1
	}).success(function(json) {
		console.log(json);
	}).error(function(xhr, code , errText) {
		console.dir(errText);
	});
	
	
})(jQuery);
