!function($) {
	function toCamel(str) {
		return str.replace(/(\-[a-z])/g, function($1) {
			return $1.toUpperCase().replace('-', '');
		});
	}

	$.fn.observable = $.observable = function observable(scope, map) {
		if (this != $) {
			var $root = this;
		} else {
			var $root = $(document.body)
		}
		var table = {};
		if (!map) {
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
					table[data['fn' + pref[i]] + ',' + data['event' + pref[i]]] = {
						fn: data['fn' + pref[i]],
						event: data['event' + pref[i]] || 'click',
						selector: data['selector' + pref[i]] ? data['selector' + pref[i]] : '[data-fn="' + data['fn' + pref[i]] + '"]' + (data['event' + pref[i]] ? '[data-event="' + data['event' + pref[i]] + '"]' : ':not([data-event])'),
						type: data['type' + pref[i]] || observable.options.type,
						scope: data['scope' + pref[i]]
					};
				}
			});
		} else {
			if (map['data-pref'] || map['data-fn']) {
				if (map['data-pref']) {
					var pref = map['data-pref'].split(',');
					for (var i = 0; i < pref.length; i++) {
						pref[i] = '-' + pref[i];
					}
				} else {
					var pref = [''];
				}
				for (var i = 0; i < pref.length; i++) {
					table[map['data-fn' + pref[i]] + ',' + map['data-event' + pref[i]]] = {
						fn: map['data-fn' + pref[i]],
						event: map['data-event' + pref[i]] || 'click',
						selector: map['data-selector' + pref[i]] ? map['data-selector' + pref[i]] : '[data-fn="' + map['data-fn' + pref[i]] + '"]' + (map['data-event' + pref[i]] ? '[data-event="' + map['data-event' + pref[i]] + '"]' : ':not([data-event])'),
						type: map['data-type' + pref[i]] || observable.options.type,
						scope: map['data-scope' + pref[i]]
					};
				}
			} else {
				if ($.isPlainObject(map)) {
					map = [map];
				}
				for (var i = 0; i < map.length; i++) {
					table[(new Date()).getTime() + i] = {
						fn: map[i].fn,
						event: map[i].event || 'click',
						selector: map[i].selector ? map[i].selector : '[data-fn="' + map[i].fn + '"]' + (map[i].event ? '[data-event="' + map[i].event + '"]' : ':not([data-event])'),
						type: map[i].type || observable.options.type,
						scope: map[i].scope
					};
				}
			}
		}
		$.each(table, function () {
			var fn = scope[this.fn];
			var bindScope;
			if (this.scope) {
				if (this.scope == 'this') {
					bindScope = scope;
				} else {
					bindScope = scope[this.scope];
					if (this.scope.indexOf('.') != -1) {
						var d = this.scope.toString().split(".");
						var bindScope = scope[d[0]];
						var v = d.slice(1);
						for (var i = 0, length = v.length; i < length; i++) {
							bindScope = bindScope[v[i]];
						}
					}
				}
			}
			if (this.fn.indexOf('.') != -1) {
				var d = this.fn.toString().split(".");
				var fn = scope[d[0]];
				var v = d.slice(1);
				for (var i = 0, length = v.length; i < length; i++) {
					fn = fn[v[i]];
				}
			}
			if ($.isFunction(fn)) {
				if (this.type == 'bind') {
					$root.find(this.selector).unbind(this.event).bind(this.event, function(e) {
						if (observable.options.notPrevent === false || $.inArray(e.type, observable.options.notPrevent) == -1) {
							e.preventDefault();
							e.stopPropagation();
						}
						if (!$(this).hasClass('disable')) {
							fn.call(bindScope || this, e, this, scope);
						}
					});
				} else if (this.type == 'delegate') {
					$root.undelegate(this.selector, this.event).delegate(this.selector, this.event, function(e) {
						if (observable.options.notPrevent === false || $.inArray(e.type, observable.options.notPrevent) == -1) {
							e.preventDefault();
							e.stopPropagation();
						}
						if (!$(this).hasClass('disable')) {
							fn.call(bindScope || this, e, this, scope);
						}
					});
				}
			}
		});
	}

	$.observable.options = {
		type: 'delegate',
		notPrevent: ['paste', 'keydown', 'keyup', 'keypress']
	};
}(jQuery);