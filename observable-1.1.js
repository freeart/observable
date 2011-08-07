$.fn.observable = $.observable = function (scope) {
	var defType = 'delegate';

	if (this != $) {
		$root = this;
	} else {
		$root = $(document.body)
	}
	var table = {};
	$root.find('[data-fn]').each(function () {
		var el = $(this), data = el.data();
		if (data.pref) {
			var pref = data.pref.split(',');
			for (var i = 0; i < pref.length; i++) {
				pref[i] = '_' + pref[i];
			}
		} else {
			var pref = [''];
		}
		for (var i = 0; i < pref.length; i++) {
			if (!data['event' + pref[i]]) {
				el.attr('data-event' + pref[i], 'click');
				data['event' + pref[i]] = 'click';
			}
			data['type' + pref[i]] = data['type' + pref[i]] || defType;
			table[data['fn' + pref[i]] + ',' + data['event' + pref[i]]] = {
				fn: data['fn' + pref[i]],
				event: data['event' + pref[i]],
				root: data['selector' + pref[i]] ? el : data['type' + pref[i]] == 'bind' ? el.parent() : $root,
				selector: data['selector' + pref[i]] ? data['selector' + pref[i]] : '[data-fn="' + data['fn' + pref[i]] + '"][data-event="' + data['event' + pref[i]] + '"]',
				type: data['type' + pref[i]]
			};
		}
	});
	$.each(table, function () {
		var fn = scope[this.fn];
		if ($.isFunction(fn)) {
			if (this.type == 'bind') {
				this.root.find(this.selector).unbind(this.event).bind(this.event, fn);
			} else if (this.type == 'delegate') {
				this.root.undelegate(this.selector, this.event).delegate(this.selector, this.event, fn);
			}
		}
	});
}