!function() {
	function toCamel(str) {
		return str.replace(/(\-[a-z])/g, function($1) {
			return $1.toUpperCase().replace('-', '');
		});
	}

	$.fn.observable = $.observable = function (scope) {
		var defType = 'delegate';

		if (this != $) {
			var $root = this;
		} else {
			var $root = $(document.body)
		}
		var table = {};
		$root.find('[data-fn],[data-pref]').each(function () {
			var el = $(this), data = el.data();
			if (data.pref) {
				var pref = data.pref.split(',');
				for (var i = 0; i < pref.length; i++) {
					pref[i] = toCamel(pref[i].charAt(0).toUpperCase() + pref[i].slice(1));
				}
			} else {
				var pref = [''];
			}
			for (var i = 0; i < pref.length; i++) {
				data['type' + pref[i]] = data['type' + pref[i]] || defType;
				table[data['fn' + pref[i]] + ',' + data['event' + pref[i]]] = {
					fn: data['fn' + pref[i]],
					event: data['event' + pref[i]],
					selector: data['selector' + pref[i]] ? data['selector' + pref[i]] : '[data-fn="' + data['fn' + pref[i]] + '"][data-event="' + data['event' + pref[i]] + '"]',
					type: data['type' + pref[i]],
					scope: data['scope' + pref[i]]
				};
			}
		});
		$.each(table, function () {
			var fn = scope[this.fn];
			var bindScope;
			if (this.scope) {
				bindScope = scope[this.scope];
				if (this.scope.indexOf('.') != -1) {
					var d = this.scope.toString().split(".");
					var o = scope[d[0]];
					var v = d.slice(1);
					for (var i = 0; i < v.length; i++) {
						bindScope = o[v[i]];
						v = v.slice(1);
					}
				}
			}
			if (this.fn.indexOf('.') != -1) {
				var d = this.fn.toString().split(".");
				var o = scope[d[0]];
				var v = d.slice(1);
				for (var i = 0; i < v.length; i++) {
					fn = o[v[i]];
					v = v.slice(1);
				}
			}
			if ($.isFunction(fn)) {
				if (this.type == 'bind') {
					$root.find(this.selector).unbind(this.event).bind(this.event, function(e) {
						e.preventDefault();
						e.stopPropagation();
						fn.call(bindScope || this, e, this, $(this).closest('[role=document]').get(0))
					});
				} else if (this.type == 'delegate') {
					$root.undelegate(this.selector, this.event).delegate(this.selector, this.event, function(e) {
						e.preventDefault();
						e.stopPropagation();
						fn.call(bindScope || this, e, this, $(this).closest('[role=document]').get(0))
					});
				}
			}
		});
	}
}();